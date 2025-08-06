
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Users, Bot, MessageSquare, TrendingUp, Settings, Plus } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Employees",
      value: "247",
      change: "+12%",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Active Agents",
      value: "8",
      change: "+2",
      icon: Bot,
      color: "text-green-600"
    },
    {
      title: "Conversations Today",
      value: "156",
      change: "+23%",
      icon: MessageSquare,
      color: "text-purple-600"
    },
    {
      title: "Efficiency Score",
      value: "94%",
      change: "+5%",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const agents = [
    {
      name: "Onboarding Assistant",
      status: "Active",
      conversations: 45,
      satisfaction: 4.8
    },
    {
      name: "Benefits Guide",
      status: "Active", 
      conversations: 32,
      satisfaction: 4.6
    },
    {
      name: "Policy Helper",
      status: "Training",
      conversations: 0,
      satisfaction: 0
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your AI agents and monitor HR operations</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Agent
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-green-600">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Agents Management */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              AI Agents
            </CardTitle>
            <CardDescription>
              Manage and monitor your AI assistant agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{agent.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {agent.conversations} conversations • {agent.satisfaction > 0 ? `${agent.satisfaction}/5.0 rating` : 'No ratings yet'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={agent.status === 'Active' ? 'default' : 'secondary'}>
                      {agent.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest interactions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 border-l-4 border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">New employee onboarding completed</p>
                  <p className="text-xs text-muted-foreground">Sarah Johnson completed onboarding with Onboarding Assistant</p>
                </div>
                <span className="text-xs text-muted-foreground">2 min ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 border-l-4 border-l-green-500 bg-green-50/50 dark:bg-green-950/20">
                <Bot className="w-4 h-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Agent training completed</p>
                  <p className="text-xs text-muted-foreground">Policy Helper finished training on updated company policies</p>
                </div>
                <span className="text-xs text-muted-foreground">15 min ago</span>
              </div>
              <div className="flex items-center gap-3 p-3 border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/20">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Performance milestone reached</p>
                  <p className="text-xs text-muted-foreground">Benefits Guide achieved 95% satisfaction rating</p>
                </div>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
