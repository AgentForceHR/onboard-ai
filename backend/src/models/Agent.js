const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  onboardingScript: {
    type: String,
    required: true
  },
  configuration: {
    personality: {
      type: String,
      default: 'professional'
    },
    responseStyle: {
      type: String,
      default: 'helpful'
    },
    knowledgeBase: [{
      topic: String,
      content: String
    }],
    workflows: [{
      name: String,
      steps: [String],
      triggers: [String]
    }]
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  blockchainTxHash: {
    type: String,
    index: true
  },
  agentId: {
    type: String,
    unique: true,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  metrics: {
    totalInteractions: {
      type: Number,
      default: 0
    },
    averageResponseTime: {
      type: Number,
      default: 0
    },
    satisfactionScore: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true
});

// Index for efficient queries
agentSchema.index({ createdBy: 1, isActive: 1 });
agentSchema.index({ assignedEmployees: 1 });

module.exports = mongoose.model('Agent', agentSchema);