const express = require('express');
const User = require('../models/User');
const Agent = require('../models/Agent');
const Conversation = require('../models/Conversation');
const { authenticateToken, canAccessEmployeeData } = require('../middleware/auth');
const { validateMongoId, validatePagination } = require('../middleware/validation');
const { asyncHandler, AppError } = require('../middleware/errorHandler');

const router = express.Router();

/**
 * @route   GET /api/employee/dashboard
 * @desc    Get employee dashboard data
 * @access  Protected (Employee only - own data)
 */
router.get('/dashboard', authenticateToken, asyncHandler(async (req, res) => {
  const employeeId = req.user._id;

  // Get employee with assigned agents
  const employee = await User.findById(employeeId)
    .populate('assignedAgents', 'name description isActive metrics')
    .select('-password');

  if (!employee) {
    throw new AppError('Employee not found', 404);
  }

  // Get recent conversations
  const recentConversations = await Conversation.find({
    employee: employeeId,
    status: 'active'
  })
    .populate('agent', 'name description')
    .sort({ updatedAt: -1 })
    .limit(5);

  // Calculate onboarding progress
  const totalTasks = 10; // This would come from your onboarding configuration
  const completedTasks = employee.onboardingStatus === 'completed' ? totalTasks : 
                        employee.onboardingStatus === 'in-progress' ? Math.floor(totalTasks * 0.6) : 0;
  
  const onboardingProgress = {
    total: totalTasks,
    completed: completedTasks,
    percentage: Math.round((completedTasks / totalTasks) * 100),
    status: employee.onboardingStatus
  };

  // Get interaction statistics
  const totalInteractions = await Conversation.aggregate([
    { $match: { employee: employeeId } },
    { $unwind: '$messages' },
    { $match: { 'messages.sender': 'user' } },
    { $count: 'total' }
  ]);

  const stats = {
    totalInteractions: totalInteractions[0]?.total || 0,
    assignedAgents: employee.assignedAgents.length,
    activeConversations: recentConversations.length
  };

  res.json({
    success: true,
    data: {
      employee,
      onboardingProgress,
      recentConversations,
      stats
    }
  });
}));

/**
 * @route   GET /api/employee/agents
 * @desc    Get agents assigned to employee
 * @access  Protected (Employee only - own data)
 */
router.get('/agents', authenticateToken, asyncHandler(async (req, res) => {
  const employeeId = req.user._id;

  const agents = await Agent.find({
    assignedEmployees: employeeId,
    isActive: true
  })
    .populate('createdBy', 'firstName lastName')
    .select('name description configuration metrics createdAt');

  res.json({
    success: true,
    data: { agents }
  });
}));

/**
 * @route   GET /api/employee/conversations
 * @desc    Get employee's conversation history
 * @access  Protected (Employee only - own data)
 */
router.get('/conversations', 
  authenticateToken, 
  validatePagination, 
  asyncHandler(async (req, res) => {
    const { page, limit, sort } = req.query;
    const employeeId = req.user._id;

    const skip = (page - 1) * limit;

    const [conversations, total] = await Promise.all([
      Conversation.find({ employee: employeeId })
        .populate('agent', 'name description')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Conversation.countDocuments({ employee: employeeId })
    ]);

    res.json({
      success: true,
      data: {
        conversations,
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
 * @route   GET /api/employee/conversations/:id
 * @desc    Get specific conversation details
 * @access  Protected (Employee only - own data)
 */
router.get('/conversations/:id', 
  authenticateToken, 
  validateMongoId, 
  asyncHandler(async (req, res) => {
    const conversation = await Conversation.findOne({
      _id: req.params.id,
      employee: req.user._id
    }).populate('agent', 'name description');

    if (!conversation) {
      throw new AppError('Conversation not found', 404);
    }

    res.json({
      success: true,
      data: { conversation }
    });
  })
);

/**
 * @route   PUT /api/employee/onboarding-status
 * @desc    Update employee's onboarding status
 * @access  Protected (Employee only - own data)
 */
router.put('/onboarding-status', authenticateToken, asyncHandler(async (req, res) => {
  const { status, completedTasks } = req.body;

  // Validate status
  const validStatuses = ['pending', 'in-progress', 'completed'];
  if (status && !validStatuses.includes(status)) {
    throw new AppError('Invalid onboarding status', 400);
  }

  const employee = await User.findByIdAndUpdate(
    req.user._id,
    {
      ...(status && { onboardingStatus: status }),
      ...(completedTasks && { completedTasks })
    },
    { new: true, runValidators: true }
  ).select('-password');

  res.json({
    success: true,
    message: 'Onboarding status updated successfully',
    data: { employee }
  });
}));

/**
 * @route   GET /api/employee/tasks
 * @desc    Get employee's onboarding tasks
 * @access  Protected (Employee only - own data)
 */
router.get('/tasks', authenticateToken, asyncHandler(async (req, res) => {
  // This would typically come from a tasks/onboarding configuration
  // For now, we'll return a static list that would be dynamic in production
  
  const employee = await User.findById(req.user._id);
  
  const tasks = [
    {
      id: 1,
      title: 'Complete Personal Information',
      description: 'Fill out your personal details and emergency contacts',
      status: employee.onboardingStatus !== 'pending' ? 'completed' : 'pending',
      category: 'personal',
      priority: 'high',
      estimatedTime: '15 minutes'
    },
    {
      id: 2,
      title: 'Review Employee Handbook',
      description: 'Read through the company policies and procedures',
      status: employee.onboardingStatus === 'completed' ? 'completed' : 
              employee.onboardingStatus === 'in-progress' ? 'in-progress' : 'pending',
      category: 'documentation',
      priority: 'high',
      estimatedTime: '45 minutes'
    },
    {
      id: 3,
      title: 'Set Up Benefits',
      description: 'Choose your health insurance and retirement plans',
      status: employee.onboardingStatus === 'completed' ? 'completed' : 'pending',
      category: 'benefits',
      priority: 'medium',
      estimatedTime: '30 minutes'
    },
    {
      id: 4,
      title: 'IT Equipment Setup',
      description: 'Configure your laptop and access company systems',
      status: 'pending',
      category: 'technical',
      priority: 'high',
      estimatedTime: '60 minutes'
    },
    {
      id: 5,
      title: 'Department Introduction',
      description: 'Meet your team and understand your role',
      status: 'pending',
      category: 'social',
      priority: 'medium',
      estimatedTime: '90 minutes'
    }
  ];

  // Calculate progress
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const progress = {
    total: tasks.length,
    completed: completedTasks,
    percentage: Math.round((completedTasks / tasks.length) * 100)
  };

  res.json({
    success: true,
    data: {
      tasks,
      progress
    }
  });
}));

/**
 * @route   POST /api/employee/feedback
 * @desc    Submit feedback about onboarding experience
 * @access  Protected (Employee only)
 */
router.post('/feedback', authenticateToken, asyncHandler(async (req, res) => {
  const { rating, comment, category, agentId } = req.body;

  // Validate rating
  if (rating && (rating < 1 || rating > 5)) {
    throw new AppError('Rating must be between 1 and 5', 400);
  }

  // In a production system, you'd save this to a Feedback model
  // For now, we'll just acknowledge receipt
  
  const feedback = {
    employee: req.user._id,
    rating,
    comment,
    category,
    agentId,
    submittedAt: new Date()
  };

  // Here you would save to database:
  // const savedFeedback = await Feedback.create(feedback);

  console.log('📝 Employee feedback received:', feedback);

  res.json({
    success: true,
    message: 'Feedback submitted successfully',
    data: { feedback }
  });
}));

/**
 * @route   GET /api/employee/help
 * @desc    Get help resources and FAQ
 * @access  Protected (Employee only)
 */
router.get('/help', authenticateToken, asyncHandler(async (req, res) => {
  const helpResources = {
    faq: [
      {
        question: 'How do I access my benefits information?',
        answer: 'You can ask your assigned HR agent about benefits, or check the employee portal under the Benefits section.',
        category: 'benefits'
      },
      {
        question: 'Who do I contact for IT support?',
        answer: 'For technical issues, you can chat with your onboarding agent or contact IT directly at it-support@company.com.',
        category: 'technical'
      },
      {
        question: 'How do I update my personal information?',
        answer: 'You can update your profile information in the employee portal or ask your HR agent for assistance.',
        category: 'personal'
      }
    ],
    contacts: [
      {
        department: 'Human Resources',
        email: 'hr@company.com',
        phone: '(555) 123-4567',
        hours: 'Monday-Friday, 9:00 AM - 5:00 PM'
      },
      {
        department: 'IT Support',
        email: 'it-support@company.com',
        phone: '(555) 123-4568',
        hours: '24/7 for urgent issues'
      }
    ],
    documents: [
      {
        title: 'Employee Handbook',
        description: 'Complete guide to company policies and procedures',
        url: '/documents/employee-handbook.pdf'
      },
      {
        title: 'Benefits Guide',
        description: 'Detailed information about health insurance and retirement plans',
        url: '/documents/benefits-guide.pdf'
      }
    ]
  };

  res.json({
    success: true,
    data: helpResources
  });
}));

module.exports = router;