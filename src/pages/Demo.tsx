import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Bot, 
  Users, 
  Settings, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  FileText, 
  Briefcase,
  Calendar,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Brain,
  Zap,
  ArrowRight,
  Send
} from "lucide-react";

const Demo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "ai", content: "Hello! I'm your HR AI assistant. I'm here to help you with your onboarding process. What would you like to know?" }
  ]);
  const [agentProgress, setAgentProgress] = useState(0);
  const [employeeProgress, setEmployeeProgress] = useState(0);

  const agentCreationSteps = [
    {
      title: "Define Agent Purpose",
      description: "Configure your AI agent's role and responsibilities",
      content: "Setting up HR Onboarding Assistant...",
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: "Train with Company Data",
      description: "Upload policies, procedures, and company information",
      content: "Processing employee handbook, benefits guide, and policies...",
      icon: <FileText className="w-6 h-6" />
    },
    {
      title: "Configure Workflows",
      description: "Set up automated onboarding sequences",
      content: "Creating personalized onboarding paths...",
      icon: <Settings className="w-6 h-6" />
    },
    {
      title: "Deploy & Monitor",
      description: "Launch your agent and track performance",
      content: "Agent is now live and ready to assist employees!",
      icon: <Zap className="w-6 h-6" />
    }
  ];

  const employeeTasks = [
    { title: "Complete Personal Information", status: "completed", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { title: "Review Employee Handbook", status: "completed", icon: <CheckCircle className="w-5 h-5 text-green-500" /> },
    { title: "Set Up Benefits", status: "in-progress", icon: <Clock className="w-5 h-5 text-orange-500" /> },
    { title: "IT Equipment Setup", status: "pending", icon: <Clock className="w-5 h-5 text-muted-foreground" /> },
    { title: "Department Introduction", status: "pending", icon: <Clock className="w-5 h-5 text-muted-foreground" /> }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % agentCreationSteps.length);
        setAgentProgress((prev) => (prev >= 100 ? 0 : prev + 25));
        setEmployeeProgress((prev) => (prev >= 100 ? 20 : prev + 20));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      sender: "user" as const,
      content: chatMessage
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatMessage("");
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you with that! Let me guide you through the benefits enrollment process step by step.",
        "That's a great question! I've updated your task list with the next steps you need to complete.",
        "Perfect! I've scheduled your IT setup appointment for tomorrow at 2 PM. You'll receive a calendar invite shortly.",
        "I've found the information you need. Here are the key points from our company policy..."
      ];
      
      const aiResponse = {
        id: chatMessages.length + 2,
        sender: "ai" as const,
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setAgentProgress(0);
    setEmployeeProgress(20);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              AI HR Agent Demo
            </h1>
            <p className="text-muted-foreground text-lg">
              Experience how AI transforms HR onboarding from creation to employee interaction
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Demo Controls */}
        <Card className="mb-8 border-2 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-primary" />
                <CardTitle>Interactive Demo Controls</CardTitle>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  variant={isPlaying ? "secondary" : "default"}
                  size="sm"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pause" : "Start"} Demo
                </Button>
                <Button onClick={resetDemo} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
            <CardDescription>
              Watch how easy it is to create and deploy AI agents for HR onboarding
            </CardDescription>
          </CardHeader>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Full Process Overview</TabsTrigger>
            <TabsTrigger value="admin">Admin: Agent Creation</TabsTrigger>
            <TabsTrigger value="employee">Employee Experience</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Admin Side */}
              <Card className="border-2 border-blue-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Bot className="w-6 h-6 text-blue-500" />
                    <CardTitle className="text-blue-600 dark:text-blue-400">Admin Dashboard</CardTitle>
                  </div>
                  <CardDescription>Create and configure AI agents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {agentCreationSteps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-500 ${
                          currentStep === index && isPlaying
                            ? "bg-blue-500/10 border border-blue-500/30 animate-pulse"
                            : currentStep > index || (!isPlaying && index === 0)
                            ? "bg-green-500/10 border border-green-500/30"
                            : "bg-muted/50"
                        }`}
                      >
                        <div className={`${currentStep >= index || (!isPlaying && index === 0) ? "text-green-500" : "text-muted-foreground"}`}>
                          {step.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{step.title}</p>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                        {(currentStep > index || (!isPlaying && index === 0)) && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Agent Creation Progress</span>
                      <span>{agentProgress}%</span>
                    </div>
                    <Progress value={agentProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Employee Side */}
              <Card className="border-2 border-green-500/20">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-green-500" />
                    <CardTitle className="text-green-600 dark:text-green-400">Employee Portal</CardTitle>
                  </div>
                  <CardDescription>Seamless onboarding experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {employeeTasks.map((task, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                          task.status === "completed"
                            ? "bg-green-500/10 border border-green-500/30"
                            : task.status === "in-progress"
                            ? "bg-orange-500/10 border border-orange-500/30 animate-pulse"
                            : "bg-muted/50"
                        }`}
                      >
                        {task.icon}
                        <span className="flex-1 text-sm font-medium">{task.title}</span>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "in-progress"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Onboarding Progress</span>
                      <span>{employeeProgress}%</span>
                    </div>
                    <Progress value={employeeProgress} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Process Flow */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="w-6 h-6 text-primary" />
                  <span>Process Flow</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between space-x-4 overflow-x-auto pb-4">
                  <div className="flex items-center space-x-2 min-w-max">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">1</div>
                    <span className="text-sm font-medium">Admin Creates Agent</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <div className="flex items-center space-x-2 min-w-max">
                    <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">2</div>
                    <span className="text-sm font-medium">AI Training</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <div className="flex items-center space-x-2 min-w-max">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">3</div>
                    <span className="text-sm font-medium">Agent Deployment</span>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  <div className="flex items-center space-x-2 min-w-max">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">4</div>
                    <span className="text-sm font-medium">Employee Interaction</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-6 h-6" />
                  <span>AI Agent Creation Wizard</span>
                </CardTitle>
                <CardDescription>
                  Step-by-step process to create your HR AI agent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Agent Name</label>
                      <Input placeholder="HR Onboarding Assistant" defaultValue="HR Onboarding Assistant" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Agent Purpose</label>
                      <Textarea 
                        placeholder="Describe what this agent will help with..."
                        defaultValue="Assist new employees with onboarding process, answer policy questions, and guide through required tasks."
                        className="min-h-20"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Knowledge Base</label>
                      <div className="space-y-2">
                        <Badge variant="secondary" className="mr-2">Employee Handbook</Badge>
                        <Badge variant="secondary" className="mr-2">Benefits Guide</Badge>
                        <Badge variant="secondary" className="mr-2">Company Policies</Badge>
                        <Badge variant="secondary">IT Procedures</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground mb-4">
                            Upload company documents to train your AI agent
                          </p>
                          <Button variant="outline" size="sm">
                            Upload Documents
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Training Progress</span>
                        <span>{agentProgress}%</span>
                      </div>
                      <Progress value={agentProgress} />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Advanced Settings
                  </Button>
                  <Button>
                    <Zap className="w-4 h-4 mr-2" />
                    Deploy Agent
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employee" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Employee Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Briefcase className="w-6 h-6" />
                    <span>My Onboarding Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {employeeTasks.map((task, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        {task.icon}
                        <span className="flex-1 text-sm font-medium">{task.title}</span>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "in-progress"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{employeeProgress}%</span>
                    </div>
                    <Progress value={employeeProgress} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <Button variant="outline" size="sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Meeting
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Chat Interface */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-6 h-6" />
                    <span>AI Assistant Chat</span>
                  </CardTitle>
                  <CardDescription>Get instant help with your onboarding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-64 border rounded-lg p-4 overflow-y-auto space-y-3 bg-muted/30">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg text-sm ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-background border"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about your onboarding..."
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setChatMessage("How do I set up my benefits?")}
                    >
                      Benefits Help
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setChatMessage("When is my first team meeting?")}
                    >
                      Schedule Info
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Demo;