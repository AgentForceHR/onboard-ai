import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const EmployeePortal = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-16">
        <div className="container py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Employee Portal</h1>
            <p className="text-muted-foreground mb-8">
              Track your onboarding progress and interact with your AI agent
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Onboarding Progress</CardTitle>
                  <CardDescription>Complete your setup</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} />
                    <p className="text-sm text-muted-foreground">
                      3 of 4 steps completed
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Your AI Agent</CardTitle>
                  <CardDescription>Ready to assist you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Badge variant="secondary" className="w-fit">
                      Online
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      Your personal AI agent is ready to help with onboarding questions and tasks.
                    </p>
                    <Button size="sm">Chat Now</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents</CardTitle>
                  <CardDescription>Review and sign</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      2 documents pending your review
                    </p>
                    <Button size="sm" variant="outline">
                      View Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EmployeePortal;