const Joi = require('joi');

/**
 * Validation middleware factory
 * @param {Object} schema - Joi validation schema
 * @param {string} property - Request property to validate (body, params, query)
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorDetails = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errorDetails
      });
    }

    // Replace request property with validated value
    req[property] = value;
    next();
  };
};

// User validation schemas
const userSchemas = {
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().trim().min(1).required(),
    lastName: Joi.string().trim().min(1).required(),
    role: Joi.string().valid('admin', 'hr', 'employee').default('employee'),
    department: Joi.string().trim().optional(),
    position: Joi.string().trim().optional()
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  updateProfile: Joi.object({
    firstName: Joi.string().trim().min(1).optional(),
    lastName: Joi.string().trim().min(1).optional(),
    department: Joi.string().trim().optional(),
    position: Joi.string().trim().optional()
  })
};

// Agent validation schemas
const agentSchemas = {
  create: Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    description: Joi.string().trim().min(10).max(500).required(),
    onboardingScript: Joi.string().trim().min(50).required(),
    configuration: Joi.object({
      personality: Joi.string().valid('professional', 'friendly', 'formal', 'casual').default('professional'),
      responseStyle: Joi.string().valid('helpful', 'detailed', 'concise', 'empathetic').default('helpful'),
      knowledgeBase: Joi.array().items(
        Joi.object({
          topic: Joi.string().trim().required(),
          content: Joi.string().trim().required()
        })
      ).optional(),
      workflows: Joi.array().items(
        Joi.object({
          name: Joi.string().trim().required(),
          steps: Joi.array().items(Joi.string().trim()).required(),
          triggers: Joi.array().items(Joi.string().trim()).required()
        })
      ).optional()
    }).default({})
  }),

  update: Joi.object({
    name: Joi.string().trim().min(1).max(100).optional(),
    description: Joi.string().trim().min(10).max(500).optional(),
    onboardingScript: Joi.string().trim().min(50).optional(),
    configuration: Joi.object({
      personality: Joi.string().valid('professional', 'friendly', 'formal', 'casual').optional(),
      responseStyle: Joi.string().valid('helpful', 'detailed', 'concise', 'empathetic').optional(),
      knowledgeBase: Joi.array().items(
        Joi.object({
          topic: Joi.string().trim().required(),
          content: Joi.string().trim().required()
        })
      ).optional(),
      workflows: Joi.array().items(
        Joi.object({
          name: Joi.string().trim().required(),
          steps: Joi.array().items(Joi.string().trim()).required(),
          triggers: Joi.array().items(Joi.string().trim()).required()
        })
      ).optional()
    }).optional(),
    isActive: Joi.boolean().optional()
  }),

  assignEmployees: Joi.object({
    employeeIds: Joi.array().items(
      Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
    ).min(1).required()
  })
};

// Conversation validation schemas
const conversationSchemas = {
  sendMessage: Joi.object({
    message: Joi.string().trim().min(1).max(1000).required(),
    agentId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  }),

  createSession: Joi.object({
    agentId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  })
};

// Parameter validation schemas
const paramSchemas = {
  mongoId: Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  }),

  agentId: Joi.object({
    agentId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  }),

  employeeId: Joi.object({
    employeeId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required()
  })
};

// Query validation schemas
const querySchemas = {
  pagination: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('createdAt', '-createdAt', 'name', '-name').default('-createdAt')
  }),

  agentFilter: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('createdAt', '-createdAt', 'name', '-name').default('-createdAt'),
    isActive: Joi.boolean().optional(),
    search: Joi.string().trim().optional()
  })
};

// Export validation middleware functions
module.exports = {
  validate,
  
  // User validations
  validateRegister: validate(userSchemas.register),
  validateLogin: validate(userSchemas.login),
  validateUpdateProfile: validate(userSchemas.updateProfile),
  
  // Agent validations
  validateCreateAgent: validate(agentSchemas.create),
  validateUpdateAgent: validate(agentSchemas.update),
  validateAssignEmployees: validate(agentSchemas.assignEmployees),
  
  // Conversation validations
  validateSendMessage: validate(conversationSchemas.sendMessage),
  validateCreateSession: validate(conversationSchemas.createSession),
  
  // Parameter validations
  validateMongoId: validate(paramSchemas.mongoId, 'params'),
  validateAgentId: validate(paramSchemas.agentId, 'params'),
  validateEmployeeId: validate(paramSchemas.employeeId, 'params'),
  
  // Query validations
  validatePagination: validate(querySchemas.pagination, 'query'),
  validateAgentFilter: validate(querySchemas.agentFilter, 'query')
};