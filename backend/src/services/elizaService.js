const { GoogleGenerativeAI } = require('@google/generative-ai');

class ElizaService {
  constructor() {
    // Initialize Google Gemini
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    // Eliza OS core configuration
    this.elizaConfig = {
      personality: 'professional HR assistant',
      responseStyle: 'helpful and empathetic',
      maxTokens: 1000,
      temperature: 0.7
    };
  }

  /**
   * Process user message through Eliza OS orchestration + Gemini generation
   * @param {string} message - User's input message
   * @param {Object} agent - Agent configuration
   * @param {Object} context - Conversation context
   * @returns {Promise<Object>} - Generated response with metadata
   */
  async processMessage(message, agent, context = {}) {
    try {
      const startTime = Date.now();

      // Eliza OS orchestration layer - analyze intent and context
      const orchestratedInput = await this.orchestrateInput(message, agent, context);

      // Generate response using Gemini
      const response = await this.generateResponse(orchestratedInput, agent);

      // Post-process through Eliza OS
      const finalResponse = await this.postProcessResponse(response, agent, context);

      const responseTime = Date.now() - startTime;

      return {
        content: finalResponse.text,
        metadata: {
          responseTime,
          confidence: finalResponse.confidence,
          intent: orchestratedInput.intent,
          agentId: agent.agentId
        }
      };
    } catch (error) {
      console.error('❌ Eliza Service Error:', error);
      throw new Error('Failed to process message through AI service');
    }
  }

  /**
   * Eliza OS orchestration - analyze and prepare input
   * @param {string} message - Raw user message
   * @param {Object} agent - Agent configuration
   * @param {Object} context - Conversation context
   * @returns {Promise<Object>} - Orchestrated input with intent and context
   */
  async orchestrateInput(message, agent, context) {
    // Intent detection based on keywords and patterns
    const intent = this.detectIntent(message);
    
    // Context enrichment from agent's knowledge base
    const relevantKnowledge = this.findRelevantKnowledge(message, agent.configuration.knowledgeBase);
    
    // Workflow detection
    const triggeredWorkflows = this.detectWorkflows(message, agent.configuration.workflows);

    return {
      originalMessage: message,
      intent,
      relevantKnowledge,
      triggeredWorkflows,
      conversationHistory: context.history || [],
      agentPersonality: agent.configuration.personality,
      responseStyle: agent.configuration.responseStyle
    };
  }

  /**
   * Generate response using Google Gemini
   * @param {Object} orchestratedInput - Processed input from Eliza OS
   * @param {Object} agent - Agent configuration
   * @returns {Promise<Object>} - Generated response
   */
  async generateResponse(orchestratedInput, agent) {
    const prompt = this.buildPrompt(orchestratedInput, agent);
    
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return {
        text,
        confidence: this.calculateConfidence(text, orchestratedInput.intent)
      };
    } catch (error) {
      console.error('❌ Gemini API Error:', error);
      
      // Fallback response
      return {
        text: "I apologize, but I'm experiencing technical difficulties. Please try again or contact your HR representative for immediate assistance.",
        confidence: 0.5
      };
    }
  }

  /**
   * Post-process response through Eliza OS
   * @param {Object} response - Raw Gemini response
   * @param {Object} agent - Agent configuration
   * @param {Object} context - Conversation context
   * @returns {Promise<Object>} - Final processed response
   */
  async postProcessResponse(response, agent, context) {
    // Apply agent's response style
    let processedText = this.applyResponseStyle(response.text, agent.configuration.responseStyle);
    
    // Add personalization based on employee context
    if (context.employee) {
      processedText = this.personalizeResponse(processedText, context.employee);
    }
    
    // Ensure compliance and appropriateness
    processedText = this.ensureCompliance(processedText);

    return {
      text: processedText,
      confidence: response.confidence
    };
  }

  /**
   * Detect user intent from message
   * @param {string} message - User message
   * @returns {string} - Detected intent
   */
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Intent patterns
    const intentPatterns = {
      'benefits_inquiry': ['benefit', 'insurance', 'health', 'dental', '401k', 'retirement'],
      'policy_question': ['policy', 'rule', 'procedure', 'handbook', 'guideline'],
      'schedule_request': ['schedule', 'meeting', 'appointment', 'calendar', 'time'],
      'document_request': ['document', 'form', 'paperwork', 'file', 'download'],
      'technical_support': ['laptop', 'computer', 'password', 'login', 'access', 'it'],
      'general_greeting': ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      'help_request': ['help', 'assist', 'support', 'question', 'confused']
    };

    for (const [intent, keywords] of Object.entries(intentPatterns)) {
      if (keywords.some(keyword => lowerMessage.includes(keyword))) {
        return intent;
      }
    }

    return 'general_inquiry';
  }

  /**
   * Find relevant knowledge from agent's knowledge base
   * @param {string} message - User message
   * @param {Array} knowledgeBase - Agent's knowledge base
   * @returns {Array} - Relevant knowledge items
   */
  findRelevantKnowledge(message, knowledgeBase = []) {
    const lowerMessage = message.toLowerCase();
    
    return knowledgeBase.filter(item => {
      const topicMatch = item.topic && lowerMessage.includes(item.topic.toLowerCase());
      const contentMatch = item.content && 
        item.content.toLowerCase().split(' ').some(word => lowerMessage.includes(word));
      
      return topicMatch || contentMatch;
    }).slice(0, 3); // Limit to top 3 relevant items
  }

  /**
   * Detect triggered workflows
   * @param {string} message - User message
   * @param {Array} workflows - Agent workflows
   * @returns {Array} - Triggered workflows
   */
  detectWorkflows(message, workflows = []) {
    const lowerMessage = message.toLowerCase();
    
    return workflows.filter(workflow => {
      return workflow.triggers && workflow.triggers.some(trigger => 
        lowerMessage.includes(trigger.toLowerCase())
      );
    });
  }

  /**
   * Build prompt for Gemini
   * @param {Object} input - Orchestrated input
   * @param {Object} agent - Agent configuration
   * @returns {string} - Formatted prompt
   */
  buildPrompt(input, agent) {
    let prompt = `You are ${agent.name}, a professional HR onboarding assistant. `;
    prompt += `Your personality is ${input.agentPersonality} and your response style is ${input.responseStyle}.\n\n`;
    
    if (input.relevantKnowledge.length > 0) {
      prompt += "Relevant company information:\n";
      input.relevantKnowledge.forEach(item => {
        prompt += `- ${item.topic}: ${item.content}\n`;
      });
      prompt += "\n";
    }

    if (input.triggeredWorkflows.length > 0) {
      prompt += "Relevant workflows:\n";
      input.triggeredWorkflows.forEach(workflow => {
        prompt += `- ${workflow.name}: ${workflow.steps.join(', ')}\n`;
      });
      prompt += "\n";
    }

    prompt += `User's message: "${input.originalMessage}"\n\n`;
    prompt += "Please provide a helpful, professional response that addresses the user's needs. ";
    prompt += "Keep responses concise but informative. If you need more information, ask clarifying questions.";

    return prompt;
  }

  /**
   * Calculate confidence score for response
   * @param {string} text - Generated text
   * @param {string} intent - Detected intent
   * @returns {number} - Confidence score (0-1)
   */
  calculateConfidence(text, intent) {
    // Simple confidence calculation based on response length and intent match
    let confidence = 0.7; // Base confidence
    
    if (text.length > 50) confidence += 0.1;
    if (text.length > 100) confidence += 0.1;
    if (intent !== 'general_inquiry') confidence += 0.1;
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Apply response style formatting
   * @param {string} text - Raw response text
   * @param {string} style - Response style
   * @returns {string} - Styled response
   */
  applyResponseStyle(text, style) {
    switch (style) {
      case 'formal':
        return text.replace(/\b(hi|hey)\b/gi, 'Hello');
      case 'casual':
        return text.replace(/\bHello\b/g, 'Hi');
      case 'empathetic':
        if (!text.includes('understand') && !text.includes('help')) {
          return `I understand this might be confusing. ${text}`;
        }
        return text;
      default:
        return text;
    }
  }

  /**
   * Personalize response for specific employee
   * @param {string} text - Response text
   * @param {Object} employee - Employee data
   * @returns {string} - Personalized response
   */
  personalizeResponse(text, employee) {
    if (employee.firstName) {
      text = text.replace(/\bHello\b/, `Hello ${employee.firstName}`);
    }
    
    if (employee.department) {
      text = text.replace(/your department/gi, `the ${employee.department} department`);
    }
    
    return text;
  }

  /**
   * Ensure response compliance and appropriateness
   * @param {string} text - Response text
   * @returns {string} - Compliant response
   */
  ensureCompliance(text) {
    // Remove any potentially inappropriate content
    const inappropriatePatterns = [
      /\b(password|ssn|social security)\b/gi
    ];
    
    inappropriatePatterns.forEach(pattern => {
      text = text.replace(pattern, '[REDACTED]');
    });
    
    return text;
  }
}

module.exports = new ElizaService();