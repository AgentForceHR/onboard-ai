import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  FileText, 
  Calendar, 
  User, 
  Award,
  Bot,
  Plus
} from "lucide-react";

const EmployeePortal = () => {
  const tasks = [
    {
      title: "Complete I-9 Verification",
      status: "completed",
      dueDate: "2024-01-15",
      agent: "HR Assistant"
    },
    {
      title: "Benefits Enrollment",
      status: "in-progress",
      dueDate: "2024-01-20",
      agent: "Benefits Guide"
    },
    {
      title: "IT Equipment Setup",
      status: "pending",
      dueDate: "2024-01-22",
      agent: "IT Helper"
    },
    {
      title: "Safety Training",
      status: "pending", 
      dueDate: "2024-01-25",
      agent: "Training Assistant"
    }
  ];

  const conversations = [
    {
      agent: "Onboarding Assistant",
      lastMessage: "Great! Your workspace setup is now complete.",
      timestamp: "2 min ago",
      unread: 0
    },
    {
      agent: "Benefits Guide", 
      lastMessage: "Would you like to review your health insurance options?",
      timestamp: "1 hour ago",
      unread: 2
    },
    {
      agent: "IT Helper",
      lastMessage: "Your laptop will be delivered tomorrow morning.",
      timestamp: "3 hours ago",
      unread: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const progressPercentage = (completedTasks / tasks.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome, Sarah!</h1>
              <p className="text-muted-foreground">Your personal HR assistant portal</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button>
                <MessageSquare className="w-4 h-4 mr-2" />
                Start New Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Onboarding Progress
            </CardTitle>
            <CardDescription>
              {completedTasks} of {tasks.length} tasks completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{Math.round(progressPercentage)}% Complete</span>
                <span className="font-medium text-foreground">
                  {tasks.length - completedTasks} tasks remaining
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                My Tasks
              </CardTitle>
              <CardDescription>
                Complete these onboarding tasks with your AI assistants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(task.status)}
                      <div>
                        <h3 className="font-medium text-foreground">{task.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                          <span>•</span>
                          <Bot className="w-3 h-3" />
                          {task.agent}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(task.status)}
                      {task.status !== 'completed' && (
                        <Button variant="outline" size="sm">
                          Continue
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Active Conversations
              </CardTitle>
              <CardDescription>
                Continue chatting with your AI assistants
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conversations.map((conv, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-foreground">{conv.agent}</h3>
                          {conv.unread > 0 && (
                            <Badge variant="default" className="text-xs px-2 py-0">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {conv.lastMessage}
                        </p>
                        <p className="text-xs text-muted-foreground">{conv.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and resources</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <User className="w-6 h-6 mb-2" />
                <span className="text-sm">Update Profile</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="w-6 h-6 mb-2" />
                <span className="text-sm">View Documents</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="w-6 h-6 mb-2" />
                <span className="text-sm">Schedule Meeting</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <MessageSquare className="w-6 h-6 mb-2" />
                <span className="text-sm">Get Help</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeePortal;
