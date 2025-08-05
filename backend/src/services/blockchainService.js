const { ethers } = require('ethers');

class BlockchainService {
  constructor() {
    this.network = process.env.BLOCKCHAIN_NETWORK || 'testnet';
    this.rpcUrl = this.network === 'mainnet' 
      ? process.env.SONIC_MAINNET_RPC_URL 
      : process.env.SONIC_TESTNET_RPC_URL;
    
    this.contractAddress = this.network === 'mainnet'
      ? process.env.CONTRACT_ADDRESS_MAINNET
      : process.env.CONTRACT_ADDRESS_TESTNET;

    // Initialize provider and wallet
    this.provider = new ethers.JsonRpcProvider(this.rpcUrl);
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);

    // Smart contract ABI - HR Agent Registry Contract
    this.contractABI = [
      {
        "inputs": [
          {"name": "agentId", "type": "string"},
          {"name": "name", "type": "string"},
          {"name": "creator", "type": "address"},
          {"name": "metadataHash", "type": "string"}
        ],
        "name": "registerAgent",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{"name": "agentId", "type": "string"}],
        "name": "getAgent",
        "outputs": [
          {"name": "name", "type": "string"},
          {"name": "creator", "type": "address"},
          {"name": "metadataHash", "type": "string"},
          {"name": "isActive", "type": "bool"},
          {"name": "createdAt", "type": "uint256"}
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {"name": "agentId", "type": "string"},
          {"name": "isActive", "type": "bool"}
        ],
        "name": "updateAgentStatus",
        "outputs": [{"name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [{"name": "creator", "type": "address"}],
        "name": "getAgentsByCreator",
        "outputs": [{"name": "", "type": "string[]"}],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {"indexed": true, "name": "agentId", "type": "string"},
          {"indexed": true, "name": "creator", "type": "address"},
          {"indexed": false, "name": "name", "type": "string"}
        ],
        "name": "AgentRegistered",
        "type": "event"
      }
    ];

    // Initialize contract instance
    this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.wallet);
  }

  /**
   * Register a new agent on the blockchain
   * @param {Object} agentData - Agent data to register
   * @returns {Promise<Object>} - Transaction result
   */
  async registerAgent(agentData) {
    try {
      console.log(`🔗 Registering agent ${agentData.agentId} on ${this.network}...`);

      // Create metadata hash (simplified - in production, use IPFS)
      const metadataHash = ethers.keccak256(
        ethers.toUtf8Bytes(JSON.stringify({
          name: agentData.name,
          description: agentData.description,
          configuration: agentData.configuration,
          createdAt: new Date().toISOString()
        }))
      );

      // Estimate gas
      const gasEstimate = await this.contract.registerAgent.estimateGas(
        agentData.agentId,
        agentData.name,
        this.wallet.address,
        metadataHash
      );

      // Execute transaction with 20% gas buffer
      const tx = await this.contract.registerAgent(
        agentData.agentId,
        agentData.name,
        this.wallet.address,
        metadataHash,
        {
          gasLimit: gasEstimate * 120n / 100n // 20% buffer
        }
      );

      console.log(`📝 Transaction submitted: ${tx.hash}`);

      // Wait for confirmation
      const receipt = await tx.wait();
      
      console.log(`✅ Agent registered successfully! Block: ${receipt.blockNumber}`);

      return {
        success: true,
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        metadataHash
      };

    } catch (error) {
      console.error('❌ Blockchain registration error:', error);
      
      // Handle specific error types
      if (error.code === 'INSUFFICIENT_FUNDS') {
        throw new Error('Insufficient funds for blockchain transaction');
      } else if (error.code === 'NETWORK_ERROR') {
        throw new Error('Blockchain network connection error');
      } else if (error.reason) {
        throw new Error(`Smart contract error: ${error.reason}`);
      }
      
      throw new Error('Failed to register agent on blockchain');
    }
  }

  /**
   * Get agent data from blockchain
   * @param {string} agentId - Agent ID to lookup
   * @returns {Promise<Object>} - Agent data from blockchain
   */
  async getAgent(agentId) {
    try {
      console.log(`🔍 Fetching agent ${agentId} from blockchain...`);

      const result = await this.contract.getAgent(agentId);
      
      return {
        name: result[0],
        creator: result[1],
        metadataHash: result[2],
        isActive: result[3],
        createdAt: new Date(Number(result[4]) * 1000).toISOString()
      };

    } catch (error) {
      console.error('❌ Error fetching agent from blockchain:', error);
      throw new Error('Failed to fetch agent from blockchain');
    }
  }

  /**
   * Update agent status on blockchain
   * @param {string} agentId - Agent ID
   * @param {boolean} isActive - New active status
   * @returns {Promise<Object>} - Transaction result
   */
  async updateAgentStatus(agentId, isActive) {
    try {
      console.log(`🔄 Updating agent ${agentId} status to ${isActive}...`);

      const gasEstimate = await this.contract.updateAgentStatus.estimateGas(agentId, isActive);
      
      const tx = await this.contract.updateAgentStatus(agentId, isActive, {
        gasLimit: gasEstimate * 120n / 100n
      });

      const receipt = await tx.wait();
      
      console.log(`✅ Agent status updated! Block: ${receipt.blockNumber}`);

      return {
        success: true,
        txHash: tx.hash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString()
      };

    } catch (error) {
      console.error('❌ Error updating agent status:', error);
      throw new Error('Failed to update agent status on blockchain');
    }
  }

  /**
   * Get all agents created by a specific address
   * @param {string} creatorAddress - Creator's wallet address
   * @returns {Promise<Array>} - Array of agent IDs
   */
  async getAgentsByCreator(creatorAddress) {
    try {
      console.log(`🔍 Fetching agents for creator ${creatorAddress}...`);

      const agentIds = await this.contract.getAgentsByCreator(creatorAddress);
      
      return agentIds;

    } catch (error) {
      console.error('❌ Error fetching agents by creator:', error);
      throw new Error('Failed to fetch agents by creator');
    }
  }

  /**
   * Get current network info
   * @returns {Object} - Network information
   */
  getNetworkInfo() {
    return {
      network: this.network,
      rpcUrl: this.rpcUrl,
      contractAddress: this.contractAddress,
      walletAddress: this.wallet.address
    };
  }

  /**
   * Check wallet balance
   * @returns {Promise<string>} - Balance in ETH
   */
  async getWalletBalance() {
    try {
      const balance = await this.provider.getBalance(this.wallet.address);
      return ethers.formatEther(balance);
    } catch (error) {
      console.error('❌ Error fetching wallet balance:', error);
      throw new Error('Failed to fetch wallet balance');
    }
  }

  /**
   * Verify contract connection
   * @returns {Promise<boolean>} - Connection status
   */
  async verifyConnection() {
    try {
      // Try to call a view function to verify connection
      await this.contract.getAgentsByCreator(this.wallet.address);
      return true;
    } catch (error) {
      console.error('❌ Contract connection verification failed:', error);
      return false;
    }
  }
}

module.exports = new BlockchainService();