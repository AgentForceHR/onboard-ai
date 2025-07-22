import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ChatDemo } from "@/components/chat-demo";
import { FeatureCard } from "@/components/feature-card";

import heroImage from "@/assets/hero-image.jpg";
import featureDocuments from "@/assets/feature-documents.jpg";
import featureScheduling from "@/assets/feature-scheduling.jpg";
import featureTraining from "@/assets/feature-training.jpg";
import { ArrowRight, Bot, CheckCircle2, FileCheck, LucideIcon, Users, Zap } from "lucide-react";

// Benefits icons
const benefitsIcons: Record<string, LucideIcon> = {
  speed: Zap,
  accuracy: CheckCircle2,
  personalization: Users,
  automation: Bot,
};

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 px-4 mt-16 bg-gradient-subtle relative overflow-hidden">
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Employee Onboarding with{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Blockchain AI Agents
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Create secure blockchain-powered AI assistants that streamline onboarding and provide 24/7 support for new employees. Pay with HR tokens to build and deploy your custom agents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button variant="hero" size="xl" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline-primary" size="xl">
                  Request Demo
                </Button>
              </div>
            </div>
            <div className="relative z-10 rounded-lg overflow-hidden shadow-lg">
              <img
                src={heroImage}
                alt="AI-powered employee onboarding"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/10 rounded-full filter blur-3xl"></div>
        </section>

        {/* Benefits Section */}
        <section className="w-full py-20 px-4 bg-background">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why HR Teams Choose agentforcehr.com
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our blockchain-powered platform uses HR tokens to help HR professionals create intelligent and secure onboarding experiences.
            </p>
          </div>
          <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(benefitsIcons).map(([key, Icon], index) => (
              <div
                key={key}
                className="p-6 rounded-lg border bg-card hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-medium mb-2 capitalize">{key}</h3>
                <p className="text-muted-foreground">
                  {key === "speed" && "Reduce onboarding time by up to 60% with automated processes and instant responses."}
                  {key === "accuracy" && "Ensure consistent and accurate information delivery to every new employee."}
                  {key === "personalization" && "Tailor the onboarding experience based on role, department, and experience level."}
                  {key === "automation" && "Automate repetitive tasks so your HR team can focus on high-value activities."}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="w-full py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See How It Works
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Try our interactive demo to experience how our AI assistants engage with new employees
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">
                  Instant Answers to Employee Questions
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">24/7 Support:</span> Provide answers about benefits, paperwork, and company policies any time of day.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Multilingual Support:</span> Connect with employees in their preferred language.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <p className="text-muted-foreground">
                      <span className="font-medium text-foreground">Smart Escalation:</span> Automatically route complex issues to human HR staff when needed.
                    </p>
                  </li>
                </ul>
                <div className="mt-8">
                  <p className="text-sm text-muted-foreground mb-4">
                    Try asking about benefits, laptop setup, or orientation schedule in the demo →
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <ChatDemo />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-20 px-4 bg-background">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform offers everything you need to create effective onboarding experiences.
            </p>
          </div>
          <div className="container mx-auto grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={featureDocuments}
              title="Document Processing"
              description="Automate paperwork collection and verification with intelligent document processing and digital signatures."
              gradient
            />
            <FeatureCard
              icon={featureScheduling}
              title="Smart Scheduling"
              description="Automatically schedule orientation sessions, training, and one-on-ones with team members and managers."
              gradient
            />
            <FeatureCard
              icon={featureTraining}
              title="Knowledge Transfer"
              description="Create custom training paths that adapt to each employee's role, experience, and learning pace."
              gradient
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-20 px-4 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Onboarding Process?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join hundreds of companies that have improved employee satisfaction and reduced onboarding time by up to 60%.
            </p>
            <Button variant="hero" size="xl" className="group">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </section>

        {/* HR Token Section */}
        <section className="w-full py-20 px-4 bg-background" id="hr-token">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              HR Token - Your Gateway to AI Agents
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Purchase HR tokens on the blockchain to create and deploy your custom AI agents
            </p>
          </div>
          <div className="container mx-auto max-w-4xl">
            <div className="bg-card rounded-lg p-8 border shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                  <Bot size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">HR Token Benefits</h3>
                <p className="text-muted-foreground">
                  Deployed on secure blockchain infrastructure for fast, low-cost transactions
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Pay-Per-Agent Creation</p>
                      <p className="text-sm text-muted-foreground">Use tokens to create custom AI agents</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Blockchain Security</p>
                      <p className="text-sm text-muted-foreground">Secure transactions on blockchain network</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Low Transaction Fees</p>
                      <p className="text-sm text-muted-foreground">Affordable blockchain transaction costs</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Advanced AI Integration</p>
                      <p className="text-sm text-muted-foreground">Powered by cutting-edge AI framework</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Token Balance Management</p>
                      <p className="text-sm text-muted-foreground">Track usage in admin dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Scalable Solution</p>
                      <p className="text-sm text-muted-foreground">Create unlimited agents with tokens</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Button variant="hero" size="xl" className="group">
                  Buy HR Tokens on DEX
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  Connect your wallet and purchase HR tokens to start creating AI agents
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
