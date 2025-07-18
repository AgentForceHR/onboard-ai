import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, ExternalLink, Coins, Bot, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [tokenBalance, setTokenBalance] = useState(150);
  const [agents, setAgents] = useState([
    { id: 1, name: "Onboarding Assistant", status: "Active", tokensUsed: 50 },
    { id: 2, name: "Policy Guide", status: "Active", tokensUsed: 30 },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: "",
    description: "",
    tasks: "",
  });
  const { toast } = useToast();

  const handleCreateAgent = () => {
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

    const agent = {
      id: agents.length + 1,
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
  };

  const handleBuyTokens = () => {
    // Simulate buying tokens (in real app, this would redirect to DEX)
    window.open("https://pancakeswap.finance/swap", "_blank");
    
    // Simulate token purchase (in real app, this would be handled by blockchain integration)
    setTimeout(() => {
      setTokenBalance(tokenBalance + 100);
      toast({
        title: "Tokens Purchased",
        description: "100 HR tokens have been added to your balance",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Create and manage your HR AI agents powered by Eliza OS
          </p>
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
                {agents.reduce((sum, agent) => sum + agent.tokensUsed, 0)}
              </div>
              <p className="text-xs text-muted-foreground">
                Total tokens consumed
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
                {agents.map((agent) => (
                  <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-muted/50 to-background">
                    <div>
                      <h3 className="font-semibold">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {agent.tokensUsed} tokens used
                      </p>
                    </div>
                    <Badge variant="secondary">{agent.status}</Badge>
                  </div>
                ))}
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
                <Label htmlFor="tasks">Key Tasks</Label>
                <Textarea
                  id="tasks"
                  value={newAgent.tasks}
                  onChange={(e) => setNewAgent({ ...newAgent, tasks: e.target.value })}
                  placeholder="List the main tasks this agent will perform..."
                />
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