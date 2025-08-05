const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Agent = require('../models/Agent');
const User = require('../models/User');
const Conversation = require('../models/Conversation');
const elizaService = require('../services/elizaService');
const blockchainService = require('../services/blockchainService');
const { authenticateToken, requireAdminOrHR } = require('../middleware/auth');
const { 
  validateCreateAgent, 
  validateUpdateAgent, 
  validateAssignEmployees,
  validateMongoId,
  validateAgentFilter,
  validateSendMessage
} = require('../middleware/validation');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const router = express.Router();

/**
 * @route   POST /api/agents
 * @desc    Create new AI agent using Eliza OS + Gemini
 * @access  Protected (Admin/HR only)
 */
router.post('/', 
  authenticateToken, 
  requireAdminOrHR, 
  validateCreateAgent, 
  asyncHandler(async (req, res) => {
    const { name, description, onboardingScript, configuration } = req.body;

    // Generate unique agent ID
    const agentId = uuidv4();

    // Create agent in database first
    const agent = new Agent({
      name,
      description,
      onboardingScript,
      configuration,
      createdBy: req.user._id,
      agentId
    });

    await agent.save();

    try {
      // Register agent on blockchain
      console.log('🔗 Registering agent on blockchain...');
      const blockchainResult = await blockchainService.registerAgent({
        agentId,
        name,
        description,
        configuration
      });

      // Update agent with blockchain transaction hash
      agent.blockchainTxHash = blockchainResult.txHash;
      await agent.save();

      console.log('✅ Agent created and registered on blockchain successfully');

      // Populate creator info for response
      await agent.populate('createdBy', 'firstName lastName email');

      res.status(201).json({
        success: true,
        message: 'Agent created successfully',
        data: {
          agent,
          blockchain: {
            txHash: blockchainResult.txHash,
            blockNumber: blockchainResult.blockNumber,
            network: blockchainService.getNetworkInfo().network
          }
        }
      });

    } catch (blockchainError) {
      console.error('❌ Blockchain registration failed:', blockchainError);
      
      // Agent was created in DB but blockchain registration failed
      // Mark agent as pending blockchain registration
      agent.blockchainTxHash = 'PENDING_REGISTRATION';
      await agent.save();

      res.status(201).json({
        success: true,
        message: 'Agent created successfully, blockchain registration pending',
        data: {
          agent,
          blockchain: {
            status: 'pending',
            error: blockchainError.message
          }
        }
      });
    }
  })
);

/**
 * @route   GET /api/agents
 * @desc    Get all agents (filtered by role)
 * @access  Protected
 */
router.get('/', 
  authenticateToken, 
  validateAgentFilter, 
  asyncHandler(async (req, res) => {
    const { page, limit, sort, isActive, search } = req.query;
    
    // Build query based on user role
    let query = {};
    
    if (req.user.role === 'employee') {
      // Employees can only see agents assigned to them
      query.assignedEmployees = req.user._id;
    } else {
      // Admin/HR can see all agents, optionally filtered by creator
      if (req.user.role === 'hr') {
        query.createdBy = req.user._id;
      }
    }

    // Apply filters
    if (isActive !== undefined) {
      query.isActive = isActive;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination
    const skip = (page - 1) * limit;
    
    const [agents, total] = await Promise.all([
      Agent.find(query)
        .populate('createdBy', 'firstName lastName email')
        .populate('assignedEmployees', 'firstName lastName email department')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Agent.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        agents,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  })
);

/**
 * @route   GET /api/agents/:id
 * @desc    Get single agent by ID
 * @access  Protected
 */
router.get('/:id', 
  authenticateToken, 
  validateMongoId, 
  asyncHandler(async (req, res) => {
    const agent = await Agent.findById(req.params.id)
      .populate('createdBy', 'firstName lastName email')
      .populate('assignedEmployees', 'firstName lastName email department position');

    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Check access permissions
    if (req.user.role === 'employee') {
      const isAssigned = agent.assignedEmployees.some(
        emp => emp._id.toString() === req.user._id.toString()
      );
      if (!isAssigned) {
        throw new AppError('Access denied', 403);
      }
    } else if (req.user.role === 'hr') {
      if (agent.createdBy._id.toString() !== req.user._id.toString()) {
        throw new AppError('Access denied', 403);
      }
    }

    res.json({
      success: true,
      data: { agent }
    });
  })
);

/**
 * @route   PUT /api/agents/:id
 * @desc    Update agent
 * @access  Protected (Admin/HR only)
 */
router.put('/:id', 
  authenticateToken, 
  requireAdminOrHR, 
  validateMongoId, 
  validateUpdateAgent, 
  asyncHandler(async (req, res) => {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Check if user can update this agent
    if (req.user.role === 'hr' && agent.createdBy.toString() !== req.user._id.toString()) {
      throw new AppError('Access denied', 403);
    }

    // Update agent
    Object.assign(agent, req.body);
    await agent.save();

    // If status changed, update on blockchain
    if (req.body.isActive !== undefined) {
      try {
        await blockchainService.updateAgentStatus(agent.agentId, req.body.isActive);
      } catch (error) {
        console.error('❌ Failed to update agent status on blockchain:', error);
        // Continue with database update even if blockchain update fails
      }
    }

    await agent.populate('createdBy', 'firstName lastName email');

    res.json({
      success: true,
      message: 'Agent updated successfully',
      data: { agent }
    });
  })
);

/**
 * @route   DELETE /api/agents/:id
 * @desc    Delete agent (soft delete)
 * @access  Protected (Admin only)
 */
router.delete('/:id', 
  authenticateToken, 
  requireAdminOrHR, 
  validateMongoId, 
  asyncHandler(async (req, res) => {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Check if user can delete this agent
    if (req.user.role === 'hr' && agent.createdBy.toString() !== req.user._id.toString()) {
      throw new AppError('Access denied', 403);
    }

    // Soft delete - mark as inactive
    agent.isActive = false;
    await agent.save();

    // Update status on blockchain
    try {
      await blockchainService.updateAgentStatus(agent.agentId, false);
    } catch (error) {
      console.error('❌ Failed to update agent status on blockchain:', error);
    }

    res.json({
      success: true,
      message: 'Agent deleted successfully'
    });
  })
);

/**
 * @route   POST /api/agents/:id/assign
 * @desc    Assign employees to agent
 * @access  Protected (Admin/HR only)
 */
router.post('/:id/assign', 
  authenticateToken, 
  requireAdminOrHR, 
  validateMongoId, 
  validateAssignEmployees, 
  asyncHandler(async (req, res) => {
    const { employeeIds } = req.body;

    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      throw new AppError('Agent not found', 404);
    }

    // Check if user can assign to this agent
    if (req.user.role === 'hr' && agent.createdBy.toString() !== req.user._id.toString()) {
      throw new AppError('Access denied', 403);
    }

    // Verify all employee IDs exist and are active
    const employees = await User.find({
      _id: { $in: employeeIds },
      role: 'employee',
      isActive: true
    });

    if (employees.length !== employeeIds.length) {
      throw new AppError('One or more employee IDs are invalid', 400);
    }

    // Add employees to agent's assigned list (avoid duplicates)
    const currentAssigned = agent.assignedEmployees.map(id => id.toString());
    const newAssignments = employeeIds.filter(id => !currentAssigned.includes(id));
    
    agent.assignedEmployees.push(...newAssignments);
    await agent.save();

    // Add agent to employees' assigned agents list
    await User.updateMany(
      { _id: { $in: newAssignments } },
      { $addToSet: { assignedAgents: agent._id } }
    );

    await agent.populate('assignedEmployees', 'firstName lastName email department');

    res.json({
      success: true,
      message: `${newAssignments.length} employees assigned to agent`,
      data: { agent }
    });
  })
);

/**
 * @route   POST /api/agents/:id/chat
 * @desc    Send message to agent and get AI response
 * @access  Protected (Assigned employees only)
 */
router.post('/:id/chat', 
  authenticateToken, 
  validateMongoId, 
  validateSendMessage, 
  asyncHandler(async (req, res) => {
    const { message } = req.body;
    const agentId = req.params.id;

    // Find agent and verify access
    const agent = await Agent.findById(agentId);
    if (!agent || !agent.isActive) {
      throw new AppError('Agent not found or inactive', 404);
    }

    // Check if employee is assigned to this agent
    if (req.user.role === 'employee') {
      const isAssigned = agent.assignedEmployees.some(
        empId => empId.toString() === req.user._id.toString()
      );
      if (!isAssigned) {
        throw new AppError('Access denied: Agent not assigned to you', 403);
      }
    }

    // Find or create conversation
    let conversation = await Conversation.findOne({
      employee: req.user._id,
      agent: agentId,
      status: 'active'
    });

    if (!conversation) {
      conversation = new Conversation({
        employee: req.user._id,
        agent: agentId,
        sessionId: uuidv4(),
        messages: []
      });
    }

    // Add user message to conversation
    conversation.messages.push({
      sender: 'user',
      content: message,
      timestamp: new Date()
    });

    // Process message through Eliza OS + Gemini
    const context = {
      employee: req.user,
      history: conversation.messages.slice(-10) // Last 10 messages for context
    };

    const aiResponse = await elizaService.processMessage(message, agent, context);

    // Add AI response to conversation
    conversation.messages.push({
      sender: 'agent',
      content: aiResponse.content,
      timestamp: new Date(),
      metadata: aiResponse.metadata
    });

    await conversation.save();

    // Update agent metrics
    agent.metrics.totalInteractions += 1;
    agent.metrics.averageResponseTime = 
      (agent.metrics.averageResponseTime + aiResponse.metadata.responseTime) / 2;
    await agent.save();

    res.json({
      success: true,
      data: {
        response: aiResponse.content,
        metadata: aiResponse.metadata,
        conversationId: conversation._id
      }
    });
  })
);

/**
 * @route   GET /api/agents/:id/conversations
 * @desc    Get conversation history for agent
 * @access  Protected
 */
router.get('/:id/conversations', 
  authenticateToken, 
  validateMongoId, 
  asyncHandler(async (req, res) => {
    const agentId = req.params.id;

    // Build query based on user role
    let query = { agent: agentId };
    
    if (req.user.role === 'employee') {
      query.employee = req.user._id;
    }

    const conversations = await Conversation.find(query)
      .populate('employee', 'firstName lastName email')
      .sort({ updatedAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: { conversations }
    });
  })
);

module.exports = router;