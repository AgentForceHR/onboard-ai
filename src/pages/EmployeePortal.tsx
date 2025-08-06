import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { apiClient, Agent } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, FileText, MessageSquare, Briefcase, Calendar, Users, Newspaper } from "lucide-react";

const EmployeePortal = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard data, tasks, and agents in parallel
        const [dashboardResponse, tasksResponse, agentsResponse] = await Promise.all([
          apiClient.getEmployeeDashboard(),
          apiClient.getEmployeeTasks(),
          apiClient.getEmployeeAgents()
        ]);

        if (dashboardResponse.success && dashboardResponse.data) {
          setDashboardData(dashboardResponse.data);
        }

        if (tasksResponse.success && tasksResponse.data) {
          setTasks(tasksResponse.data.tasks);
        }

        if (agentsResponse.success && agentsResponse.data) {
          setAgents(agentsResponse.data.agents);
          // Auto-select first agent if available
          if (agentsResponse.data.agents.length > 0) {
            setSelectedAgent(agentsResponse.data.agents[0]);
          }
        }
      } catch (error: any) {
        console.error('Failed to fetch employee data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load dashboard data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const completedTasks = tasks.filter(task => task.status === 'completed');
  const pendingTasks = tasks.filter(task => task.status !== 'completed');
  const overallProgress = dashboardData?.onboardingProgress?.percentage || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Welcome, {user?.firstName}!
            </h1>
            <p className="text-muted-foreground">
              Here's your onboarding progress and important updates.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
          </div>
        ) : (
          <>
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
              <p className="text-xs text-muted-foreground">
                Onboarding completion
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 bg-gradient-to-br from-secondary/5 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <Clock className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{pendingTasks?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                Tasks remaining
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Assistants</CardTitle>
              <MessageSquare className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{agents.length}</div>
              <p className="text-xs text-muted-foreground">
                Available to help
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  Completed Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {completedTasks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No tasks completed yet. Keep going!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {completedTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 border rounded-lg bg-gradient-to-r from-green-50 to-background dark:from-green-950/20">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                        <div className="flex-1">
                          <span className="text-sm font-medium">{task.title}</span>
                          <p className="text-xs text-muted-foreground">{task.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {task.category}
                        </Badge>
                    </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingTasks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    🎉 All tasks completed! Great job!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {pendingTasks.slice(0, 5).map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-orange-50 to-background dark:from-orange-950/20">
                        <div className="flex items-center gap-3">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <div>
                            <span className="text-sm font-medium">{task.title}</span>
                            <p className="text-xs text-muted-foreground">{task.estimatedTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {task.priority}
                          </Badge>
                          <Button size="sm" variant="outline">
                            Start
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* AI Assistant Selection */}
            {agents.length > 0 && (
              <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Your AI Assistants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  {agents.map((agent) => (
                    <div
                      key={agent._id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedAgent?._id === agent._id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedAgent(agent)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">{agent.name}</h4>
                          <p className="text-xs text-muted-foreground">{agent.description}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          Online
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            )}

            {/* Chat Interface */}
            {selectedAgent ? (
              <ChatInterface agent={selectedAgent} />
            ) : agents.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    AI Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      No AI assistants assigned yet.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Contact your HR team to get started!
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : null}

            {/* Company News */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Company Updates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">Welcome to the Team!</h4>
                      <Badge variant="outline" className="text-xs">
                        Welcome
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      We're excited to have you join our team. Your onboarding journey starts here!
                    </p>
                    <span className="text-xs text-muted-foreground">
                      Today
                    </span>
                  </div>
                  
                  <div className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">Benefits Enrollment Deadline</h4>
                      <Badge variant="outline" className="text-xs">
                        Benefits
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      Don't forget to complete your benefits enrollment by the end of the week.
                    </p>
                    <span className="text-xs text-muted-foreground">
                      2 days ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployeePortal;
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Company News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm">{item.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {item.type}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {item.summary}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {item.date}
                      </span>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    View All News
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePortal;