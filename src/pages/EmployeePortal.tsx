import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";
import { CheckCircle, Clock, FileText, MessageSquare, Briefcase, Calendar, Users, Newspaper } from "lucide-react";

const EmployeePortal = () => {
  const completedTasks = [
    "Personal Information Form",
    "Emergency Contacts",
    "Direct Deposit Setup"
  ];

  const pendingTasks = [
    "Complete Benefits Enrollment",
    "Review Employee Handbook",
    "Schedule IT Setup Meeting",
    "Submit Profile Photo"
  ];

  const newsItems = [
    {
      id: 1,
      title: "New Health Benefits Package Available",
      date: "2 days ago",
      summary: "We've upgraded our health insurance options with better coverage and lower deductibles.",
      type: "Benefits"
    },
    {
      id: 2,
      title: "Q4 Company All-Hands Meeting",
      date: "1 week ago",
      summary: "Join us for our quarterly review and upcoming project announcements this Friday.",
      type: "Event"
    },
    {
      id: 3,
      title: "Welcome to Our New Team Members",
      date: "2 weeks ago",
      summary: "Please join us in welcoming 8 new hires across Engineering, Sales, and Marketing.",
      type: "Team"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Employee Portal
            </h1>
            <p className="text-muted-foreground">
              Welcome back! Here's your onboarding progress and important updates.
            </p>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">75%</div>
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
              <div className="text-2xl font-bold text-secondary">{pendingTasks.length}</div>
              <p className="text-xs text-muted-foreground">
                Tasks remaining
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-accent/5 to-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Documents</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">2</div>
              <p className="text-xs text-muted-foreground">
                Awaiting signature
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
                <div className="space-y-3">
                  {completedTasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg bg-gradient-to-r from-green-50 to-background dark:from-green-950/20">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{task}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Your AI Assistant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Online & Ready
                    </Badge>
                    <span className="text-xs text-muted-foreground">Last active: now</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I'm here to help with any questions about your onboarding, benefits, or company policies.
                  </p>
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Start Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-500" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-orange-50 to-background dark:from-orange-950/20">
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">{task}</span>
                      </div>
                      <Button size="sm" variant="outline">
                        Start
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