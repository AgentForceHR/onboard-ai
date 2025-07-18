import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, FileText, Video, Users, BookOpen, AlertCircle } from "lucide-react";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete Personal Information Form",
      description: "Fill out your personal details and emergency contacts",
      type: "document",
      status: "completed",
      priority: "high",
      dueDate: "2024-01-15",
      agent: "HR Onboarding Assistant"
    },
    {
      id: 2,
      title: "Watch Company Culture Training",
      description: "Learn about our company values and culture",
      type: "training",
      status: "in-progress",
      priority: "medium",
      dueDate: "2024-01-20",
      agent: "Culture Training Bot"
    },
    {
      id: 3,
      title: "IT Setup and System Access",
      description: "Set up your laptop and access company systems",
      type: "setup",
      status: "pending",
      priority: "high",
      dueDate: "2024-01-18",
      agent: "IT Setup Agent"
    },
    {
      id: 4,
      title: "Meet Your Team",
      description: "Schedule meetings with your direct team members",
      type: "meeting",
      status: "pending",
      priority: "medium",
      dueDate: "2024-01-25",
      agent: "Team Introduction Bot"
    },
    {
      id: 5,
      title: "Review Employee Handbook",
      description: "Read through policies and procedures",
      type: "document",
      status: "pending",
      priority: "low",
      dueDate: "2024-01-30",
      agent: "Policy Guide Assistant"
    },
    {
      id: 6,
      title: "Complete Compliance Training",
      description: "Mandatory compliance and safety training",
      type: "training",
      status: "pending",
      priority: "high",
      dueDate: "2024-01-22",
      agent: "Compliance Training Bot"
    }
  ]);

  const completedTasks = tasks.filter(task => task.status === "completed").length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className="h-4 w-4" />;
      case "training":
        return <BookOpen className="h-4 w-4" />;
      case "meeting":
        return <Users className="h-4 w-4" />;
      case "setup":
        return <Video className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const markAsComplete = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: "completed" } : task
    ));
  };

  const filterTasks = (status: string) => {
    if (status === "all") return tasks;
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Employee Onboarding Dashboard</h1>
          <p className="text-muted-foreground">Welcome! Complete your onboarding tasks to get started.</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{completedTasks} of {totalTasks} completed</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Tasks Due Soon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-500">
                {tasks.filter(task => task.status !== "completed" && task.priority === "high").length}
              </div>
              <p className="text-sm text-muted-foreground">High priority tasks pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {Array.from(new Set(tasks.map(task => task.agent))).length}
              </div>
              <p className="text-sm text-muted-foreground">AI agents guiding you</p>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Onboarding Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4 mt-6">
                {filterTasks("all").map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getTypeIcon(task.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{task.title}</h3>
                              {getStatusIcon(task.status)}
                              <Badge 
                                variant="outline" 
                                className={`${getPriorityColor(task.priority)} text-white text-xs`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Due: {task.dueDate}</span>
                              <span>Agent: {task.agent}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {task.status !== "completed" && (
                            <Button
                              size="sm"
                              variant={task.status === "in-progress" ? "default" : "outline"}
                              onClick={() => markAsComplete(task.id)}
                            >
                              {task.status === "in-progress" ? "Complete" : "Start"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-6">
                {filterTasks("pending").map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getTypeIcon(task.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{task.title}</h3>
                              {getStatusIcon(task.status)}
                              <Badge 
                                variant="outline" 
                                className={`${getPriorityColor(task.priority)} text-white text-xs`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Due: {task.dueDate}</span>
                              <span>Agent: {task.agent}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" onClick={() => markAsComplete(task.id)}>
                          Start
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="in-progress" className="space-y-4 mt-6">
                {filterTasks("in-progress").map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getTypeIcon(task.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold">{task.title}</h3>
                              {getStatusIcon(task.status)}
                              <Badge 
                                variant="outline" 
                                className={`${getPriorityColor(task.priority)} text-white text-xs`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Due: {task.dueDate}</span>
                              <span>Agent: {task.agent}</span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" onClick={() => markAsComplete(task.id)}>
                          Complete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4 mt-6">
                {filterTasks("completed").map((task) => (
                  <Card key={task.id} className="hover:shadow-md transition-shadow opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          {getTypeIcon(task.type)}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold line-through">{task.title}</h3>
                              {getStatusIcon(task.status)}
                              <Badge 
                                variant="outline" 
                                className={`${getPriorityColor(task.priority)} text-white text-xs`}
                              >
                                {task.priority}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>Due: {task.dueDate}</span>
                              <span>Agent: {task.agent}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="text-green-600">
                          Completed
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;