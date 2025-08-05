# HR Agent Onboarding System - Backend

A comprehensive backend system for creating and managing AI-powered HR onboarding agents using Eliza OS, Google Gemini, and blockchain technology.

## 🏗️ Architecture Overview

```
├── src/
│   ├── config/          # Database and configuration
│   ├── models/          # MongoDB data models
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic services
│   ├── middleware/      # Authentication, validation, error handling
│   └── server.js        # Main application entry point
```

## 🚀 Features

- **AI Agent Creation**: Create custom HR agents using Eliza OS + Google Gemini
- **Blockchain Integration**: Register agents on Sonic blockchain with smart contracts
- **Authentication**: JWT-based auth with role-based access control
- **Real-time Chat**: Employee-agent conversations with AI responses
- **Admin Dashboard**: Comprehensive management and analytics
- **Employee Portal**: Personalized onboarding experience

## 🛠️ Technology Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini Pro via Eliza OS orchestration
- **Blockchain**: Sonic (BSC-compatible) with ethers.js
- **Authentication**: JWT tokens
- **Validation**: Joi schema validation

## 📋 Prerequisites

- Node.js 18.0.0 or higher
- MongoDB 5.0 or higher
- Google Gemini API key
- Sonic blockchain wallet with testnet/mainnet access

## ⚙️ Environment Setup

1. **Clone and install dependencies**:
```bash
cd backend
npm install
```

2. **Create environment file**:
```bash
cp .env.example .env
```

3. **Configure environment variables**:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/hr-agent-system

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Google Gemini API
GEMINI_API_KEY=your-gemini-api-key-here

# Blockchain Configuration (Sonic)
BLOCKCHAIN_NETWORK=testnet
SONIC_TESTNET_RPC_URL=https://rpc.testnet.soniclabs.com
SONIC_MAINNET_RPC_URL=https://rpc.soniclabs.com
CONTRACT_ADDRESS_TESTNET=0x1234567890123456789012345678901234567890
CONTRACT_ADDRESS_MAINNET=0x0987654321098765432109876543210987654321
PRIVATE_KEY=your-wallet-private-key-here

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /me` - Get current user profile
- `PUT /profile` - Update user profile
- `POST /change-password` - Change password
- `POST /refresh` - Refresh JWT token

### Agent Routes (`/api/agents`)
- `POST /` - Create new AI agent (Admin/HR)
- `GET /` - Get agents (filtered by role)
- `GET /:id` - Get single agent
- `PUT /:id` - Update agent (Admin/HR)
- `DELETE /:id` - Delete agent (Admin/HR)
- `POST /:id/assign` - Assign employees to agent
- `POST /:id/chat` - Chat with agent (AI responses)
- `GET /:id/conversations` - Get conversation history

### Employee Routes (`/api/employee`)
- `GET /dashboard` - Employee dashboard data
- `GET /agents` - Get assigned agents
- `GET /conversations` - Get conversation history
- `GET /conversations/:id` - Get specific conversation
- `PUT /onboarding-status` - Update onboarding status
- `GET /tasks` - Get onboarding tasks
- `POST /feedback` - Submit feedback
- `GET /help` - Get help resources

### Admin Routes (`/api/admin`)
- `GET /dashboard` - Admin dashboard statistics
- `GET /users` - Get all users with filtering
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user (Admin only)
- `GET /agents/analytics` - Agent performance analytics
- `GET /blockchain/status` - Blockchain connection status
- `GET /system/health` - System health check
- `POST /agents/:id/retry-blockchain` - Retry blockchain registration

## 🤖 AI Agent Creation Flow

1. **Admin/HR creates agent** via `POST /api/agents`
2. **Eliza OS orchestration** processes agent configuration
3. **Blockchain registration** records agent on Sonic network
4. **Database storage** saves agent with blockchain transaction hash
5. **Employee assignment** links agents to specific employees
6. **AI conversations** use Eliza OS + Gemini for responses

### Example Agent Creation Request:
```javascript
POST /api/agents
{
  "name": "HR Onboarding Assistant",
  "description": "Helps new employees with onboarding process",
  "onboardingScript": "Welcome to the company! I'm here to help...",
  "configuration": {
    "personality": "professional",
    "responseStyle": "helpful",
    "knowledgeBase": [
      {
        "topic": "benefits",
        "content": "Our company offers comprehensive health insurance..."
      }
    ],
    "workflows": [
      {
        "name": "benefits_enrollment",
        "steps": ["Explain options", "Collect preferences", "Submit forms"],
        "triggers": ["benefits", "insurance", "health"]
      }
    ]
  }
}
```

## 🔗 Blockchain Integration

### Smart Contract Functions
- `registerAgent(agentId, name, creator, metadataHash)` - Register new agent
- `getAgent(agentId)` - Get agent details
- `updateAgentStatus(agentId, isActive)` - Update agent status
- `getAgentsByCreator(creator)` - Get agents by creator address

### Network Configuration
- **Testnet**: Use for development and testing
- **Mainnet**: Use for production deployment

Switch networks by updating `BLOCKCHAIN_NETWORK` environment variable.

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full system access, user management
- **HR**: Create/manage agents, view employee data
- **Employee**: Access assigned agents, personal dashboard

### JWT Token Structure
```javascript
{
  "userId": "user_mongodb_id",
  "email": "user@example.com",
  "role": "employee|hr|admin"
}
```

### Protected Route Example
```javascript
router.get('/protected', authenticateToken, requireAdminOrHR, (req, res) => {
  // Only admin/hr can access
  res.json({ user: req.user });
});
```

## 🔌 Frontend Integration

### API Client Setup (React)
```javascript
// api/client.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = {
  // Authentication
  login: (credentials) => 
    fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    }),

  // Agent creation
  createAgent: (agentData, token) =>
    fetch(`${API_BASE_URL}/agents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(agentData)
    }),

  // Chat with agent
  chatWithAgent: (agentId, message, token) =>
    fetch(`${API_BASE_URL}/agents/${agentId}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ message })
    })
};
```

### React Hook Example
```javascript
// hooks/useAgent.js
import { useState, useEffect } from 'react';

export const useAgent = (agentId, token) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/agents/${agentId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      setAgent(data.data.agent);
      setLoading(false);
    });
  }, [agentId, token]);

  return { agent, loading };
};
```

## 🚀 Deployment

### Testnet Deployment
1. Set `BLOCKCHAIN_NETWORK=testnet`
2. Use testnet RPC URL and contract address
3. Fund wallet with testnet tokens
4. Deploy to staging environment

### Mainnet Deployment
1. Set `BLOCKCHAIN_NETWORK=mainnet`
2. Use mainnet RPC URL and contract address
3. Fund wallet with real tokens
4. Deploy to production environment

### Environment-Specific Configs
```javascript
// config/blockchain.js
const getBlockchainConfig = () => {
  const network = process.env.BLOCKCHAIN_NETWORK || 'testnet';
  
  return {
    rpcUrl: network === 'mainnet' 
      ? process.env.SONIC_MAINNET_RPC_URL 
      : process.env.SONIC_TESTNET_RPC_URL,
    contractAddress: network === 'mainnet'
      ? process.env.CONTRACT_ADDRESS_MAINNET
      : process.env.CONTRACT_ADDRESS_TESTNET
  };
};
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Test Categories
- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **Blockchain Tests**: Smart contract interaction testing

## 📊 Monitoring & Logging

### Health Check Endpoint
```bash
GET /health
```

### System Status
```bash
GET /api/admin/system/health
```

### Blockchain Status
```bash
GET /api/admin/blockchain/status
```

## 🔧 Troubleshooting

### Common Issues

1. **Blockchain Connection Failed**
   - Check RPC URL and network configuration
   - Verify wallet has sufficient balance
   - Ensure contract address is correct

2. **AI Service Unavailable**
   - Verify Gemini API key is valid
   - Check API quota and rate limits
   - Review error logs for specific issues

3. **Database Connection Error**
   - Ensure MongoDB is running
   - Check connection string format
   - Verify database permissions

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and stack traces.

## 📝 API Documentation

For detailed API documentation with request/response examples, run the server and visit:
- Swagger UI: `http://localhost:5000/api-docs` (if implemented)
- Health Check: `http://localhost:5000/health`

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.