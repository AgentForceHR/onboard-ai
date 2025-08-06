import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAgents } from "@/hooks/useAgents";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, ExternalLink, Coins, Bot, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { agents, loading, createAgent } = useAgents();
  const [tokenBalance, setTokenBalance] = useState(150); // This would come from blockchain
  const [isCreating, setIsCreating] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    description: "",
    onboardingScript: "",
    personality: "professional",
    responseStyle: "helpful"
  });
  const { toast } = useToast();

  const handleCreateAgent = async () => {
    if (!newAgent.name || !newAgent.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (tokenBalance < 50) {
      toast({
        title: "Insufficient Tokens",
        description: "You need at least 50 HR tokens to create an agent",
        variant: "destructive",
      });
      return;
    }

    try {
      await createAgent({
        name: newAgent.name,
        description: newAgent.description,
        onboardingScript: newAgent.onboardingScript || `Hello! I'm ${newAgent.name}. I'm here to help you with your onboarding process.`,
        configuration: {
          personality: newAgent.personality,
          responseStyle: newAgent.responseStyle,
          knowledgeBase: [],
          workflows: []
        }
      });

      setTokenBalance(tokenBalance - 50); // Simulate token deduction
      setNewAgent({ 
      name: newAgent.name,
      status: "Active",
      tokensUsed: 50,
    };

    setAgents([...agents, agent]);
    setTokenBalance(tokenBalance - 50);
    setNewAgent({ name: "", description: "", tasks: "" });
    setIsCreating(false);

    toast({
      title: "Agent Created",
      description: `${newAgent.name} has been created successfully`,
    });
        description: "", 
        onboardingScript: "",
        personality: "professional",
        responseStyle: "helpful"
      });
    setTimeout(() => {
    } catch (error) {
      // Error handling is done in the hook
    }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              {user?.role === 'admin' ? 'Admin' : 'HR'} Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.firstName}! Create and manage your HR AI agents powered by Eliza OS
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">HR Token Balance</CardTitle>
              <Coins className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{tokenBalance}</div>
              <p className="text-xs text-muted-foreground">
                HR tokens available
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
              <Bot className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{agents.length}</div>
              <p className="text-xs text-muted-foreground">
                AI agents deployed
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tokens Used</CardTitle>
              <Zap className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {agents.reduce((sum, agent) => sum + (agent.metrics?.totalInteractions || 0), 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total interactions
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Your AI Agents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-4">Loading agents...</div>
                ) : agents.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    No agents created yet. Create your first agent below!
                  </div>
                ) : (
                  agents.map((agent) => (
                    <div key={agent._id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-muted/50 to-background">
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {agent.metrics?.totalInteractions || 0} interactions • {agent.assignedEmployees?.length || 0} employees
                      </p>
                    </div>
                    <Badge variant={agent.isActive ? "default" : "secondary"}>
                      {agent.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  ))
                )}
              </div>
              <Separator className="my-4" />
              <Button
                onClick={() => setIsCreating(true)}
                className="w-full"
                disabled={tokenBalance < 50}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create New Agent (50 tokens)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="h-5 w-5" />
                Token Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <h3 className="font-semibold mb-2">Current Balance</h3>
                  <div className="text-2xl font-bold text-primary">{tokenBalance} HR Tokens</div>
                </div>
                <Button
                  onClick={handleBuyTokens}
                  className="w-full"
                  size="lg"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Buy HR Tokens on DEX
                </Button>
                <p className="text-sm text-muted-foreground">
                  Purchase HR tokens on Binance Smart Chain to create and manage AI agents
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {isCreating && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Create New AI Agent</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Agent Name *</Label>
                <Input
                  id="name"
                  value={newAgent.name}
                  onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                  placeholder="e.g., Benefits Assistant"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newAgent.description}
                  onChange={(e) => setNewAgent({ ...newAgent, description: e.target.value })}
                  placeholder="Describe what this agent will help with..."
                />
              </div>
              <div>
                <Label htmlFor="onboardingScript">Welcome Message</Label>
                <Textarea
                  id="onboardingScript"
                  value={newAgent.onboardingScript}
                  onChange={(e) => setNewAgent({ ...newAgent, onboardingScript: e.target.value })}
                  placeholder="Enter the welcome message for new employees..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="personality">Personality</Label>
                  <select
                    id="personality"
                    value={newAgent.personality}
                    onChange={(e) => setNewAgent({ ...newAgent, personality: e.target.value })}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="responseStyle">Response Style</Label>
                  <select
                    id="responseStyle"
                    value={newAgent.responseStyle}
                    onChange={(e) => setNewAgent({ ...newAgent, responseStyle: e.target.value })}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="helpful">Helpful</option>
                    <option value="detailed">Detailed</option>
                    <option value="concise">Concise</option>
                    <option value="empathetic">Empathetic</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleCreateAgent} className="flex-1">
                  Create Agent (50 tokens)
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsCreating(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}