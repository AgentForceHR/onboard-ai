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

        {/* ROI Section */}
        <section className="w-full py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Measurable Return on Investment
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                AgentForceHR delivers quantifiable business impact with demonstrable ROI for organizations of all sizes
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-8 border shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary mb-2">60%</div>
                <h3 className="text-xl font-medium mb-3">Reduced Onboarding Time</h3>
                <p className="text-muted-foreground">
                  Streamline the entire onboarding workflow with intelligent automation, reducing total time from weeks to days.
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 border shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary mb-2">85%</div>
                <h3 className="text-xl font-medium mb-3">HR Staff Efficiency</h3>
                <p className="text-muted-foreground">
                  Free your HR professionals from repetitive tasks, allowing them to focus on strategic initiatives and employee engagement.
                </p>
              </div>
              <div className="bg-card rounded-lg p-8 border shadow-md hover:shadow-lg transition-all">
                <div className="text-3xl font-bold text-primary mb-2">42%</div>
                <h3 className="text-xl font-medium mb-3">Lower Training Costs</h3>
                <p className="text-muted-foreground">
                  Reduce training expenses through consistent, personalized and accessible AI-driven knowledge transfer solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Enterprise Solutions Section */}
        <section className="w-full py-20 px-4 bg-background">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Enterprise-Grade Solutions for Modern HR Teams
                </h2>
                <p className="text-lg text-muted-foreground">
                  Customize and scale your onboarding processes with advanced blockchain-secured AI agents that integrate seamlessly with your existing HR systems.
                </p>
                <div className="space-y-4 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <FileCheck size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Enterprise-Level Security</p>
                      <p className="text-sm text-muted-foreground">Advanced encryption with blockchain verification ensures your employee data remains protected.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <FileCheck size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Seamless Integration</p>
                      <p className="text-sm text-muted-foreground">Connect with HRIS, ATS, LMS, and other HR systems through our robust API architecture.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <FileCheck size={14} />
                    </div>
                    <div>
                      <p className="font-medium">Dedicated Success Manager</p>
                      <p className="text-sm text-muted-foreground">Enterprise clients receive personalized implementation and ongoing optimization support.</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline-primary" size="lg" className="mt-4">
                  Learn About Enterprise Solutions
                </Button>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-lg border">
                <div className="bg-card rounded-lg p-6 border shadow-lg">
                  <h3 className="text-xl font-bold mb-4">Case Study: Global Financial Firm</h3>
                  <p className="text-muted-foreground mb-4">
                    "AgentForceHR transformed our multinational onboarding process, reducing costs by 38% while improving new hire satisfaction scores by 47%. The blockchain security features were essential for our compliance requirements."
                  </p>
                  <div className="flex items-center gap-3 mt-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Users size={24} />
                    </div>
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">VP of Global Human Resources</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Compliance Section */}
        <section className="w-full py-20 px-4 bg-muted/30">
          <div className="container mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Compliance & Security by Design
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our blockchain-powered platform ensures regulatory compliance while providing unmatched data security
            </p>
          </div>
          <div className="container mx-auto max-w-4xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card rounded-lg p-8 border shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FileCheck size={16} />
                  </span>
                  Regulatory Compliance
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">GDPR Compliant:</span> Full data protection and privacy controls.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">SOC 2 Type II:</span> Certified security practices and controls.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Industry Specific:</span> Configurable to meet financial, healthcare, and other regulatory requirements.
                    </p>
                  </li>
                </ul>
              </div>
              <div className="bg-card rounded-lg p-8 border shadow-md">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <FileCheck size={16} />
                  </span>
                  Advanced Security
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Blockchain Verification:</span> Immutable record-keeping and transparent auditing.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">End-to-End Encryption:</span> All data encrypted in transit and at rest.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-1 text-primary">
                      <CheckCircle2 size={12} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Role-Based Access:</span> Granular permissions to ensure data access only to authorized personnel.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-20 px-4 bg-background">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get answers to common questions about AgentForceHR
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="text-xl font-bold mb-2">How do HR tokens work with the platform?</h3>
                <p className="text-muted-foreground">
                  HR tokens are blockchain-based utility tokens that power our platform. Each token represents a unit of AI agent creation capability. HR professionals purchase tokens and use them to create custom onboarding agents. The tokens are stored in your secure wallet, and the balance is displayed in your admin dashboard. When you create a new agent, tokens are deducted from your balance automatically.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="text-xl font-bold mb-2">How much training does my team need to create effective AI agents?</h3>
                <p className="text-muted-foreground">
                  Our platform is designed with an intuitive interface that requires minimal training. Most HR teams are able to create their first AI agent within hours of implementation. We provide comprehensive documentation, video tutorials, and a dedicated onboarding specialist who will guide your team through the process. For enterprise clients, we offer customized training sessions tailored to your specific needs.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="text-xl font-bold mb-2">Can we customize the onboarding experience for different departments?</h3>
                <p className="text-muted-foreground">
                  Absolutely. AgentForceHR excels at creating personalized experiences. You can build department-specific agents with customized knowledge bases, workflows, and documentation requirements. Our platform supports role-based templates that can be further customized for each department's unique onboarding needs, ensuring new hires receive relevant information regardless of their position within your organization.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="text-xl font-bold mb-2">How does AgentForceHR integrate with our existing HR systems?</h3>
                <p className="text-muted-foreground">
                  Our platform offers robust API integration capabilities that connect seamlessly with most popular HRIS systems, applicant tracking systems, learning management systems, and document management platforms. We provide pre-built integrations for systems like Workday, SAP SuccessFactors, BambooHR, and many others. For custom or legacy systems, our integration team will work with you to develop secure data exchange pathways.
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 border shadow-sm">
                <h3 className="text-xl font-bold mb-2">What security measures are in place to protect sensitive employee data?</h3>
                <p className="text-muted-foreground">
                  Security is a core component of our platform. We implement multiple layers of protection including blockchain verification for immutable record-keeping, end-to-end encryption for all data, role-based access controls, regular security audits, and compliance with major security frameworks (SOC 2 Type II, GDPR, HIPAA where applicable). All sensitive employee information is encrypted at rest and in transit, with access strictly limited to authorized personnel within your organization.
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
