// API client for HR Agent Backend Integration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Types for API responses
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{ field: string; message: string }>;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'hr' | 'employee';
  department?: string;
  position?: string;
  onboardingStatus?: 'pending' | 'in-progress' | 'completed';
}

export interface Agent {
  _id: string;
  name: string;
  description: string;
  onboardingScript: string;
  configuration: {
    personality: string;
    responseStyle: string;
    knowledgeBase: Array<{ topic: string; content: string }>;
    workflows: Array<{ name: string; steps: string[]; triggers: string[] }>;
  };
  createdBy: User;
  assignedEmployees: User[];
  isActive: boolean;
  metrics: {
    totalInteractions: number;
    averageResponseTime: number;
    satisfactionScore: number;
  };
  blockchainTxHash?: string;
  agentId: string;
  createdAt: string;
}

export interface Conversation {
  _id: string;
  employee: User;
  agent: Agent;
  messages: Array<{
    sender: 'user' | 'agent';
    content: string;
    timestamp: string;
    metadata?: {
      responseTime: number;
      confidence: number;
      intent: string;
    };
  }>;
  status: 'active' | 'completed' | 'archived';
  sessionId: string;
}

// API Client Class
class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }
    
    return data;
  }

  // Authentication Methods
  async login(email: string, password: string): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const result = await this.handleResponse<{ token: string; user: User }>(response);
    
    // Store token in localStorage
    if (result.data?.token) {
      localStorage.setItem('authToken', result.data.token);
    }
    
    return result;
  }

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: string;
    department?: string;
    position?: string;
  }): Promise<ApiResponse<{ token: string; user: User }>> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    const result = await this.handleResponse<{ token: string; user: User }>(response);
    
    if (result.data?.token) {
      localStorage.setItem('authToken', result.data.token);
    }
    
    return result;
  }

  async getCurrentUser(): Promise<ApiResponse<{ user: User }>> {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{ user: User }>(response);
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } finally {
      localStorage.removeItem('authToken');
    }
  }

  // Agent Methods
  async createAgent(agentData: {
    name: string;
    description: string;
    onboardingScript: string;
    configuration?: {
      personality?: string;
      responseStyle?: string;
      knowledgeBase?: Array<{ topic: string; content: string }>;
      workflows?: Array<{ name: string; steps: string[]; triggers: string[] }>;
    };
  }): Promise<ApiResponse<{ agent: Agent; blockchain: any }>> {
    const response = await fetch(`${API_BASE_URL}/agents`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(agentData)
    });
    
    return this.handleResponse<{ agent: Agent; blockchain: any }>(response);
  }

  async getAgents(params?: {
    page?: number;
    limit?: number;
    search?: string;
    isActive?: boolean;
  }): Promise<ApiResponse<{ agents: Agent[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive.toString());

    const response = await fetch(`${API_BASE_URL}/agents?${queryParams}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{ agents: Agent[]; pagination: any }>(response);
  }

  async getAgent(id: string): Promise<ApiResponse<{ agent: Agent }>> {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{ agent: Agent }>(response);
  }

  async updateAgent(id: string, updates: Partial<Agent>): Promise<ApiResponse<{ agent: Agent }>> {
    const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    
    return this.handleResponse<{ agent: Agent }>(response);
  }

  async assignEmployeesToAgent(agentId: string, employeeIds: string[]): Promise<ApiResponse<{ agent: Agent }>> {
    const response = await fetch(`${API_BASE_URL}/agents/${agentId}/assign`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ employeeIds })
    });
    
    return this.handleResponse<{ agent: Agent }>(response);
  }

  async chatWithAgent(agentId: string, message: string): Promise<ApiResponse<{
    response: string;
    metadata: any;
    conversationId: string;
  }>> {
    const response = await fetch(`${API_BASE_URL}/agents/${agentId}/chat`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ message })
    });
    
    return this.handleResponse<{
      response: string;
      metadata: any;
      conversationId: string;
    }>(response);
  }

  // Employee Methods
  async getEmployeeDashboard(): Promise<ApiResponse<{
    employee: User;
    onboardingProgress: any;
    recentConversations: Conversation[];
    stats: any;
  }>> {
    const response = await fetch(`${API_BASE_URL}/employee/dashboard`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{
      employee: User;
      onboardingProgress: any;
      recentConversations: Conversation[];
      stats: any;
    }>(response);
  }

  async getEmployeeAgents(): Promise<ApiResponse<{ agents: Agent[] }>> {
    const response = await fetch(`${API_BASE_URL}/employee/agents`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{ agents: Agent[] }>(response);
  }

  async getEmployeeTasks(): Promise<ApiResponse<{
    tasks: Array<{
      id: number;
      title: string;
      description: string;
      status: string;
      category: string;
      priority: string;
      estimatedTime: string;
    }>;
    progress: {
      total: number;
      completed: number;
      percentage: number;
    };
  }>> {
    const response = await fetch(`${API_BASE_URL}/employee/tasks`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{
      tasks: any[];
      progress: any;
    }>(response);
  }

  async updateOnboardingStatus(status: string): Promise<ApiResponse<{ employee: User }>> {
    const response = await fetch(`${API_BASE_URL}/employee/onboarding-status`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status })
    });
    
    return this.handleResponse<{ employee: User }>(response);
  }

  // Admin Methods
  async getAdminDashboard(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<any>(response);
  }

  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    role?: string;
    department?: string;
    search?: string;
  }): Promise<ApiResponse<{ users: User[]; pagination: any }>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.role) queryParams.append('role', params.role);
    if (params?.department) queryParams.append('department', params.department);
    if (params?.search) queryParams.append('search', params.search);

    const response = await fetch(`${API_BASE_URL}/admin/users?${queryParams}`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<{ users: User[]; pagination: any }>(response);
  }

  async getSystemHealth(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/system/health`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<any>(response);
  }

  async getBlockchainStatus(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_BASE_URL}/admin/blockchain/status`, {
      headers: this.getAuthHeaders()
    });
    
    return this.handleResponse<any>(response);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('authToken');
};

export const getCurrentUserRole = async (): Promise<string | null> => {
  try {
    const response = await apiClient.getCurrentUser();
    return response.data?.user.role || null;
  } catch {
    return null;
  }
};

export const clearAuth = (): void => {
  localStorage.removeItem('authToken');
};