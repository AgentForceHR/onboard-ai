import { useState, useCallback } from 'react';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
  metadata?: {
    responseTime: number;
    confidence: number;
    intent: string;
  };
}

export const useChat = (agentId: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const { toast } = useToast();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || loading) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await apiClient.chatWithAgent(agentId, content);
      
      if (response.success && response.data) {
        // Add agent response
        const agentMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          content: response.data.response,
          timestamp: new Date(),
          metadata: response.data.metadata
        };

        setMessages(prev => [...prev, agentMessage]);
        
        if (response.data.conversationId) {
          setConversationId(response.data.conversationId);
        }
      }
    } catch (error: any) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: 'Error',
        description: error.message || 'Failed to send message',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [agentId, loading, toast]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setConversationId(null);
  }, []);

  return {
    messages,
    loading,
    conversationId,
    sendMessage,
    clearMessages
  };
};