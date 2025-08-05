# Deployment Guide - HR Agent Backend

This guide covers deploying the HR Agent backend system from testnet to mainnet and various deployment scenarios.

## 🌐 Network Configuration

### Testnet vs Mainnet

The system supports both Sonic testnet and mainnet deployments through environment variables.

#### Testnet Configuration (Development/Staging)
```env
BLOCKCHAIN_NETWORK=testnet
SONIC_TESTNET_RPC_URL=https://rpc.testnet.soniclabs.com
CONTRACT_ADDRESS_TESTNET=0x1234567890123456789012345678901234567890
```

#### Mainnet Configuration (Production)
```env
BLOCKCHAIN_NETWORK=mainnet
SONIC_MAINNET_RPC_URL=https://rpc.soniclabs.com
CONTRACT_ADDRESS_MAINNET=0x0987654321098765432109876543210987654321
```

## 🚀 Deployment Environments

### 1. Local Development
```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Edit .env with your local configuration

# Start MongoDB locally
mongod

# Run in development mode
npm run dev
```

### 2. Staging/Testnet Deployment

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/
COPY .env.staging ./.env

EXPOSE 5000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t hr-agent-backend:staging .
docker run -p 5000:5000 --env-file .env.staging hr-agent-backend:staging
```

#### Environment Variables for Staging
```env
NODE_ENV=staging
PORT=5000
MONGODB_URI=mongodb://staging-db:27017/hr-agent-system
BLOCKCHAIN_NETWORK=testnet
GEMINI_API_KEY=your-staging-gemini-key
FRONTEND_URL=https://staging.agentforcehr.com
```

### 3. Production/Mainnet Deployment

#### AWS ECS Deployment
```json
{
  "family": "hr-agent-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::account:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "hr-agent-backend",
      "image": "your-registry/hr-agent-backend:latest",
      "portMappings": [
        {
          "containerPort": 5000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "BLOCKCHAIN_NETWORK",
          "value": "mainnet"
        }
      ],
      "secrets": [
        {
          "name": "MONGODB_URI",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:mongodb-uri"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:jwt-secret"
        },
        {
          "name": "GEMINI_API_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:gemini-api-key"
        },
        {
          "name": "PRIVATE_KEY",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:blockchain-private-key"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/hr-agent-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

#### Kubernetes Deployment
```yaml
# k8s-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hr-agent-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hr-agent-backend
  template:
    metadata:
      labels:
        app: hr-agent-backend
    spec:
      containers:
      - name: hr-agent-backend
        image: your-registry/hr-agent-backend:latest
        ports:
        - containerPort: 5000
        env:
        - name: NODE_ENV
          value: "production"
        - name: BLOCKCHAIN_NETWORK
          value: "mainnet"
        - name: PORT
          value: "5000"
        envFrom:
        - secretRef:
            name: hr-agent-secrets
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 5000
          initialDelaySeconds: 5
          periodSeconds: 5

---
apiVersion: v1
kind: Service
metadata:
  name: hr-agent-backend-service
spec:
  selector:
    app: hr-agent-backend
  ports:
  - protocol: TCP
    port: 80
    targetPort: 5000
  type: LoadBalancer
```

## 🔐 Security Configuration

### Production Security Checklist

1. **Environment Variables**
   - Use secrets management (AWS Secrets Manager, K8s Secrets)
   - Never commit sensitive data to version control
   - Rotate keys regularly

2. **Database Security**
   ```env
   # Use connection string with authentication
   MONGODB_URI=mongodb://username:password@cluster.mongodb.net/hr-agent-system?retryWrites=true&w=majority
   ```

3. **API Security**
   ```javascript
   // Additional security middleware for production
   const rateLimit = require('express-rate-limit');
   const helmet = require('helmet');
   
   // Stricter rate limiting for production
   const productionLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: 'Too many requests from this IP'
   });
   
   app.use(helmet({
     contentSecurityPolicy: {
       directives: {
         defaultSrc: ["'self'"],
         styleSrc: ["'self'", "'unsafe-inline'"],
         scriptSrc: ["'self'"],
         imgSrc: ["'self'", "data:", "https:"],
       },
     },
   }));
   ```

4. **Blockchain Security**
   ```javascript
   // Use hardware wallet or secure key management
   const wallet = process.env.NODE_ENV === 'production' 
     ? new ethers.Wallet(process.env.PRIVATE_KEY, provider)
     : new ethers.Wallet(process.env.DEV_PRIVATE_KEY, provider);
   ```

## 📊 Monitoring & Logging

### Production Monitoring Setup

#### Health Checks
```javascript
// Enhanced health check for production
app.get('/health', async (req, res) => {
  const health = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version,
    checks: {}
  };

  // Database check
  try {
    await mongoose.connection.db.admin().ping();
    health.checks.database = 'OK';
  } catch (error) {
    health.checks.database = 'FAIL';
    health.status = 'DEGRADED';
  }

  // Blockchain check
  try {
    await blockchainService.verifyConnection();
    health.checks.blockchain = 'OK';
  } catch (error) {
    health.checks.blockchain = 'FAIL';
    health.status = 'DEGRADED';
  }

  // AI service check
  health.checks.ai = process.env.GEMINI_API_KEY ? 'OK' : 'NOT_CONFIGURED';

  const statusCode = health.status === 'OK' ? 200 : 503;
  res.status(statusCode).json(health);
});
```

#### Logging Configuration
```javascript
// Production logging with Winston
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    ...(process.env.NODE_ENV !== 'production' ? [
      new winston.transports.Console({
        format: winston.format.simple()
      })
    ] : [])
  ]
});
```

### Metrics Collection
```javascript
// Prometheus metrics
const promClient = require('prom-client');

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const agentInteractions = new promClient.Counter({
  name: 'agent_interactions_total',
  help: 'Total number of agent interactions',
  labelNames: ['agent_id', 'status']
});

// Middleware to collect metrics
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration
      .labels(req.method, req.route?.path || req.path, res.statusCode)
      .observe(duration);
  });
  
  next();
});
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy HR Agent Backend

on:
  push:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm test

  deploy-staging:
    if: github.ref == 'refs/heads/staging'
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to staging
      run: |
        # Build and deploy to staging environment
        docker build -t hr-agent-backend:staging .
        # Deploy to staging infrastructure

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Deploy to production
      run: |
        # Build and deploy to production environment
        docker build -t hr-agent-backend:latest .
        # Deploy to production infrastructure
      env:
        BLOCKCHAIN_NETWORK: mainnet
```

## 🔧 Configuration Management

### Environment-Specific Configurations

#### Development
```javascript
// config/development.js
module.exports = {
  database: {
    uri: 'mongodb://localhost:27017/hr-agent-dev',
    options: { useNewUrlParser: true }
  },
  blockchain: {
    network: 'testnet',
    gasLimit: 500000
  },
  ai: {
    timeout: 30000,
    retries: 3
  }
};
```

#### Production
```javascript
// config/production.js
module.exports = {
  database: {
    uri: process.env.MONGODB_URI,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },
  blockchain: {
    network: 'mainnet',
    gasLimit: 1000000,
    gasPrice: 'auto'
  },
  ai: {
    timeout: 60000,
    retries: 5
  }
};
```

## 🚨 Disaster Recovery

### Backup Strategy
```bash
#!/bin/bash
# backup.sh - Database backup script

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
DB_NAME="hr-agent-system"

# Create backup
mongodump --uri="$MONGODB_URI" --db="$DB_NAME" --out="$BACKUP_DIR/$DATE"

# Compress backup
tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" -C "$BACKUP_DIR" "$DATE"

# Clean up old backups (keep last 7 days)
find "$BACKUP_DIR" -name "backup_*.tar.gz" -mtime +7 -delete

# Upload to S3 (optional)
aws s3 cp "$BACKUP_DIR/backup_$DATE.tar.gz" "s3://your-backup-bucket/mongodb/"
```

### Recovery Procedures
```bash
#!/bin/bash
# restore.sh - Database restore script

BACKUP_FILE=$1
TEMP_DIR="/tmp/restore_$(date +%s)"

if [ -z "$BACKUP_FILE" ]; then
  echo "Usage: $0 <backup_file.tar.gz>"
  exit 1
fi

# Extract backup
mkdir -p "$TEMP_DIR"
tar -xzf "$BACKUP_FILE" -C "$TEMP_DIR"

# Restore database
mongorestore --uri="$MONGODB_URI" --drop "$TEMP_DIR"/*

# Clean up
rm -rf "$TEMP_DIR"

echo "Database restored successfully from $BACKUP_FILE"
```

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Smart contracts deployed and verified
- [ ] SSL certificates installed
- [ ] Load balancer configured
- [ ] Monitoring and alerting set up
- [ ] Backup procedures tested

### Post-Deployment
- [ ] Health checks passing
- [ ] API endpoints responding
- [ ] Blockchain connectivity verified
- [ ] AI service functioning
- [ ] Logs being collected
- [ ] Metrics being reported
- [ ] Performance benchmarks met

### Rollback Plan
1. **Immediate Rollback**
   ```bash
   # Revert to previous container version
   kubectl set image deployment/hr-agent-backend hr-agent-backend=previous-version
   ```

2. **Database Rollback**
   ```bash
   # Restore from backup if needed
   ./restore.sh /backups/mongodb/backup_YYYYMMDD_HHMMSS.tar.gz
   ```

3. **Blockchain State**
   - Smart contract state is immutable
   - Only configuration changes can be reverted
   - Agent status updates may need manual correction

## 🔍 Troubleshooting

### Common Deployment Issues

1. **Container Won't Start**
   ```bash
   # Check logs
   kubectl logs deployment/hr-agent-backend
   docker logs container-id
   
   # Common fixes
   - Verify environment variables
   - Check resource limits
   - Validate configuration files
   ```

2. **Database Connection Failed**
   ```bash
   # Test connection
   mongosh "$MONGODB_URI"
   
   # Common fixes
   - Check network connectivity
   - Verify credentials
   - Confirm database exists
   ```

3. **Blockchain Connection Issues**
   ```bash
   # Test RPC endpoint
   curl -X POST -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
     $SONIC_RPC_URL
   
   # Common fixes
   - Verify RPC URL
   - Check wallet balance
   - Confirm contract address
   ```

This deployment guide provides comprehensive instructions for moving from development through staging to production, with proper security, monitoring, and disaster recovery procedures.