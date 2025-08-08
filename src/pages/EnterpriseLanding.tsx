import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeatureCard } from "@/components/feature-card";
import { PricingCard } from "@/components/pricing-card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  MessageSquare, 
  BarChart3, 
  Shield,
  Clock,
  Zap,
  Building2,
  ArrowRight,
  CheckCircle,
  Star,
  DollarSign,
  TrendingUp,
  Award,
  Heart,
  Timer,
  Target,
  Briefcase,
  Globe,
  Lock,
  Phone,
  Mail,
  Calendar
} from "lucide-react";
import { Link } from "react-router-dom";

// Import professional images
import hrEmployeeSatisfaction from "@/assets/hr-employee-satisfaction.jpg";
import costSavingsDashboard from "@/assets/cost-savings-dashboard.jpg";
import timeSavings from "@/assets/time-savings.jpg";
import aiHrAutomation from "@/assets/ai-hr-automation.jpg";

const EnterpriseLanding = () => {
  const features = [
    {
      icon: "/placeholder.svg",
      title: "Save 75% of HR Administrative Time",
      description: "Automate repetitive tasks like answering policy questions, scheduling interviews, and processing leave requests. Your HR team can focus on strategic initiatives that drive business growth."
    },
    {
      icon: "/placeholder.svg", 
      title: "Boost Employee Satisfaction by 40%",
      description: "Provide instant 24/7 support for employee questions. No more waiting for business hours or searching through policy documents. Happy employees are productive employees."
    },
    {
      icon: "/placeholder.svg",
      title: "Reduce HR Costs by up to 60%", 
      description: "Cut operational expenses with intelligent automation. Reduce the need for additional HR staff while handling increased employee volumes efficiently."
    },
    {
      icon: "/placeholder.svg",
      title: "Onboard New Hires 10x Faster",
      description: "Streamline the entire onboarding process with AI agents that guide new employees through paperwork, training, and company orientation automatically."
    },
    {
      icon: "/placeholder.svg",
      title: "Enterprise-Grade Security & Compliance",
      description: "Bank-level security with SOC 2, GDPR, and HIPAA compliance. Role-based access controls and data encryption ensure your sensitive HR data stays protected."
    },
    {
      icon: "/placeholder.svg",
      title: "Seamless Integration with Your Stack",
      description: "Connect with existing HRIS systems, Slack, Microsoft Teams, and 50+ enterprise tools. No disruption to current workflows - just enhanced efficiency."
    }
  ];

  const benefits = [
    {
      title: "Immediate Time Savings",
      description: "HR teams report saving 30+ hours per week on routine inquiries",
      metric: "30+ hours/week",
      icon: Clock
    },
    {
      title: "Cost Reduction",
      description: "Average enterprise saves $240K annually in operational costs",
      metric: "$240K saved",
      icon: DollarSign
    },
    {
      title: "Employee Satisfaction",
      description: "95% of employees prefer AI support over waiting for HR responses",
      metric: "95% satisfaction",
      icon: Heart
    },
    {
      title: "Response Time",
      description: "Instant responses vs. 24-48 hour typical HR response times",
      metric: "Instant vs 24hrs",
      icon: Zap
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small HR teams getting started with AI automation",
      price: "$299",
      period: "/month",
      features: [
        { text: "5 AI Agents included", included: true },
        { text: "100 Credits per month", included: true },
        { text: "Handles up to 1,000 employee queries", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Email support (24hr response)", included: true },
        { text: "Standard integrations (Slack, Teams)", included: true },
        { text: "Advanced reporting", included: false },
        { text: "Dedicated account manager", included: false },
        { text: "Custom integrations", included: false }
      ],
      buttonText: "Start Free Trial",
      savings: "Save $15K annually vs hiring additional HR staff"
    },
    {
      name: "Professional",
      description: "For growing companies with expanding HR automation needs",
      price: "$799",
      period: "/month",
      popular: true,
      features: [
        { text: "15 AI Agents included", included: true },
        { text: "500 Credits per month", included: true },
        { text: "Handles up to 5,000 employee queries", included: true },
        { text: "Advanced analytics & ROI insights", included: true },
        { text: "Priority support (4hr response)", included: true },
        { text: "All integrations included (50+ systems)", included: true },
        { text: "Custom workflow builder", included: true },
        { text: "Advanced reporting & compliance", included: true },
        { text: "Dedicated account manager", included: false }
      ],
      buttonText: "Start Free Trial",
      savings: "Save $75K annually in operational costs"
    },
    {
      name: "Enterprise",
      description: "Customized solutions for large organizations with complex needs",
      price: "Custom",
      period: "",
      features: [
        { text: "Unlimited AI Agents", included: true },
        { text: "Custom credit allocation", included: true },
        { text: "Handles unlimited employee queries", included: true },
        { text: "White-label solution available", included: true },
        { text: "24/7 phone & chat support", included: true },
        { text: "Custom integrations & APIs", included: true },
        { text: "Advanced security & SSO", included: true },
        { text: "Dedicated Customer Success Manager", included: true },
        { text: "SLA guarantees & uptime commitments", included: true }
      ],
      buttonText: "Contact Sales",
      savings: "Typical savings: $240K+ annually"
    }
  ];

  const testimonials = [
    {
      quote: "AgentForceHR has been a game-changer for our organization. We've reduced our HR workload by 70% and our employees get instant answers 24/7. The ROI was apparent within the first month - we saved more in operational costs than the entire annual subscription fee.",
      author: "Sarah Johnson",
      role: "VP of Human Resources",
      company: "TechCorp Inc.",
      size: "2,500 employees",
      savings: "Saved $180K annually"
    },
    {
      quote: "The credit-based system is brilliant for budget planning. No surprise costs, and we can scale up during busy periods like open enrollment. Our employee satisfaction scores increased by 35% since implementation.",
      author: "Michael Chen",
      role: "Chief Human Resources Officer",
      company: "Global Dynamics",
      size: "8,000 employees",
      savings: "Reduced HR costs by 45%"
    },
    {
      quote: "Implementation took just 2 weeks, and we were seeing results immediately. Our new hire onboarding time dropped from 3 days to 4 hours. The AI handles 80% of routine inquiries, freeing our team for strategic work.",
      author: "Emily Rodriguez",
      role: "HR Director",
      company: "Innovation Labs",
      size: "1,200 employees",
      savings: "40% reduction in onboarding time"
    }
  ];

  const roiCalculator = [
    {
      metric: "HR Staff Time Saved",
      before: "40 hours/week on routine tasks",
      after: "10 hours/week (75% reduction)",
      annualSaving: "$78,000"
    },
    {
      metric: "Employee Response Time",
      before: "24-48 hours average response",
      after: "Instant responses 24/7",
      annualSaving: "$45,000 in productivity gains"
    },
    {
      metric: "Onboarding Efficiency", 
      before: "3 days per new hire",
      after: "4 hours per new hire",
      annualSaving: "$32,000 (for 100 hires/year)"
    },
    {
      metric: "Employee Satisfaction",
      before: "65% satisfaction with HR support",
      after: "95% satisfaction rate",
      annualSaving: "$85,000 in reduced turnover"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
        <div className="container max-w-6xl mx-auto relative">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 500+ Enterprise HR Teams • Average ROI: 340%
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Cut HR Costs by 60% While
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Boosting Employee Satisfaction
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transform your HR operations with intelligent AI agents that handle 80% of routine tasks automatically. 
              Save time, reduce costs, and create happier employees with our enterprise-grade platform that requires 
              zero technical knowledge—just purchase credits and deploy instantly.
            </p>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8">
              <div className="bg-card/50 backdrop-blur border rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">75%</div>
                <div className="text-sm text-muted-foreground">Time Savings</div>
              </div>
              <div className="bg-card/50 backdrop-blur border rounded-lg p-4">
                <div className="text-2xl font-bold text-secondary">$240K</div>
                <div className="text-sm text-muted-foreground">Average Annual Savings</div>
              </div>
              <div className="bg-card/50 backdrop-blur border rounded-lg p-4">
                <div className="text-2xl font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">Employee Satisfaction</div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="xl" className="px-8" asChild>
                <Link to="/demo">
                  Calculate Your ROI - Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="px-8" asChild>
                <Link to="#roi-calculator">
                  See Cost Savings Calculator
                </Link>
              </Button>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">No setup fees • No technical knowledge required • 30-day money-back guarantee</p>
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>GDPR Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Enterprise Grade</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>HIPAA Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Benefits Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Proven Results That Impact Your Bottom Line
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our enterprise clients see immediate returns on investment. Here's what you can expect in your first 90 days.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center h-full">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  <div className="text-2xl font-bold text-primary">{benefit.metric}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Visual ROI Section */}
      <section id="roi-calculator" className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              See Your Potential Savings (Typical 1,000 Employee Company)
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real data from our enterprise clients shows consistent cost savings and efficiency gains across all departments.
            </p>
          </div>
          
          <div className="grid gap-8">
            {roiCalculator.map((item, index) => (
              <Card key={index} className="p-6">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{item.metric}</h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Before AgentForceHR</p>
                    <p className="font-medium text-destructive">{item.before}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">After AgentForceHR</p>
                    <p className="font-medium text-primary">{item.after}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm text-muted-foreground">Annual Savings</p>
                    <p className="text-xl font-bold text-secondary">{item.annualSaving}</p>
                  </div>
                </div>
              </Card>
            ))}
            
            <Card className="p-8 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Total Annual Savings</h3>
                <div className="text-4xl font-bold text-primary">$240,000+</div>
                <p className="text-lg text-muted-foreground">
                  Average first-year savings for enterprises with 1,000+ employees
                </p>
                <div className="pt-4">
                  <Button size="lg" asChild>
                    <Link to="/demo">
                      Calculate Your Custom ROI
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Section - Employee Satisfaction */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Transform Employee Experience from Day One
              </h2>
              <p className="text-lg text-muted-foreground">
                Happy employees are productive employees. Our AI agents provide instant, accurate responses to HR questions, 
                eliminating frustration and wait times. New hires get personalized onboarding guidance, while existing 
                employees receive 24/7 support for benefits, policies, and procedures.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>95% employee satisfaction rate with AI support</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>40% increase in onboarding completion rates</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>60% reduction in HR support tickets</span>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={hrEmployeeSatisfaction} 
                alt="Happy HR employees collaborating in modern office" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Fortune 500 HR Teams Choose AgentForceHR
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for enterprise needs with the scalability, security, and measurable ROI your CFO demands.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                gradient={index === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Image Section - Time Savings */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={timeSavings} 
                alt="Professional time management and efficiency concept" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Reclaim 30+ Hours per Week for Strategic Initiatives
              </h2>
              <p className="text-lg text-muted-foreground">
                Stop spending valuable time on repetitive tasks. Our AI agents handle routine inquiries about benefits, 
                policies, time-off requests, and onboarding processes automatically. Your HR team can focus on talent 
                strategy, culture building, and initiatives that drive business growth.
              </p>
              <div className="bg-card border rounded-lg p-6">
                <h3 className="font-semibold mb-4">Tasks Automated by AI Agents:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Benefits inquiries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Policy questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Time-off requests</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Onboarding guidance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Training schedules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Document retrieval</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple Credit-Based System - No Blockchain Knowledge Required
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We handle all the complex technology behind the scenes. You simply purchase credits with your corporate card 
              and deploy AI agents instantly. It's as easy as buying software licenses, but with revolutionary results.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle className="text-xl">Purchase Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Buy credits with your corporate credit card or purchase order. Transparent pricing with no hidden fees or complex token mechanics.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <CardTitle className="text-xl">Deploy AI Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use credits to create specialized HR agents for onboarding, benefits, policies, and more. No technical setup required.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <CardTitle className="text-xl">Launch & Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Go live in hours, not months. Track ROI with detailed analytics showing time saved, costs reduced, and satisfaction improved.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <CardTitle className="text-xl">Scale & Optimize</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Add more agents or adjust credit allocation based on usage patterns. Scale efficiently as your organization grows.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Section - Cost Savings */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Measurable Cost Reduction from Day One
              </h2>
              <p className="text-lg text-muted-foreground">
                Every interaction is tracked and measured. See exactly how much time and money you're saving with detailed 
                analytics and ROI reporting. Most enterprises see their investment pay for itself within 60 days.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">60%</div>
                  <div className="text-sm text-muted-foreground">Average Cost Reduction</div>
                </div>
                <div className="bg-card border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-secondary">2 months</div>
                  <div className="text-sm text-muted-foreground">Typical Payback Period</div>
                </div>
                <div className="bg-card border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-accent">340%</div>
                  <div className="text-sm text-muted-foreground">Average ROI Year 1</div>
                </div>
                <div className="bg-card border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Employee Support</div>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={costSavingsDashboard} 
                alt="Professional dashboard showing cost savings and analytics" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by Leading Organizations Worldwide
            </h2>
            <p className="text-lg text-muted-foreground">
              See how enterprise HR teams are achieving measurable results and transforming their operations
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <blockquote className="text-lg mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="space-y-2">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company} • {testimonial.size}</p>
                    <div className="pt-2">
                      <Badge variant="secondary" className="text-xs">
                        {testimonial.savings}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Image Section - AI Automation */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-video rounded-lg overflow-hidden">
              <img 
                src={aiHrAutomation} 
                alt="Professional AI chatbot interface for HR automation" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Enterprise-Ready AI That Your Employees Actually Love
              </h2>
              <p className="text-lg text-muted-foreground">
                Unlike generic chatbots, our AI agents are specifically trained for HR workflows and integrate seamlessly 
                with your existing systems. Employees get accurate, helpful responses that solve their problems immediately, 
                leading to higher satisfaction and productivity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Enterprise Security & Compliance</h4>
                    <p className="text-sm text-muted-foreground">SOC 2, GDPR, HIPAA compliant with advanced encryption</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Seamless System Integration</h4>
                    <p className="text-sm text-muted-foreground">Connects with your HRIS, Slack, Teams, and 50+ tools</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Scales with Your Organization</h4>
                    <p className="text-sm text-muted-foreground">From 100 to 100,000 employees - consistent performance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Transparent Pricing That Delivers Immediate ROI
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your organization. All plans pay for themselves through operational savings. 
              No surprise fees, no complex blockchain mechanics - just simple, effective AI automation.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`h-full ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                    Most Popular - Best ROI
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                  <div className="pt-4">
                    <div className="text-4xl font-bold">
                      {plan.price}
                      {plan.period && <span className="text-lg font-normal text-muted-foreground">{plan.period}</span>}
                    </div>
                    <p className="text-sm text-primary font-medium mt-2">{plan.savings}</p>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        {feature.included ? (
                          <CheckCircle className="w-4 h-4 text-primary" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-muted" />
                        )}
                        <span className={`text-sm ${!feature.included ? 'text-muted-foreground' : ''}`}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full" size="lg" variant={plan.popular ? "default" : "outline"}>
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              Need a custom solution for 10,000+ employees? We work with the world's largest enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" size="lg">
                <Phone className="w-4 h-4 mr-2" />
                Contact Enterprise Sales
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule ROI Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Compliance Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Enterprise-Grade Security & Compliance
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your data security is our top priority. We meet the highest standards for enterprise compliance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">SOC 2 Type II</h3>
              <p className="text-sm text-muted-foreground">Independently audited security controls</p>
            </Card>
            <Card className="text-center p-6">
              <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">GDPR Compliant</h3>
              <p className="text-sm text-muted-foreground">Full data protection compliance</p>
            </Card>
            <Card className="text-center p-6">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">HIPAA Ready</h3>
              <p className="text-sm text-muted-foreground">Healthcare data protection standards</p>
            </Card>
            <Card className="text-center p-6">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Global Infrastructure</h3>
              <p className="text-sm text-muted-foreground">99.9% uptime SLA guarantee</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your HR Operations and Cut Costs by 60%?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Join hundreds of enterprise HR teams who have streamlined their processes, reduced costs, and improved 
            employee satisfaction with AI agents. Start your free trial today - see results in your first week.
          </p>
          
          <div className="bg-card/80 backdrop-blur border rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="font-semibold text-lg mb-4">What You Get in Your Free Trial:</h3>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Full access to all features</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Dedicated onboarding specialist</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>Custom ROI assessment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" className="px-10 py-4 text-lg">
              Start 30-Day Free Trial - Calculate Your ROI
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
            <Button variant="outline" size="xl" className="px-8 py-4 text-lg">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Enterprise Demo
            </Button>
          </div>
          
          <div className="mt-8 space-y-2">
            <p className="text-sm text-muted-foreground">
              No credit card required • Setup in under 2 hours • Cancel anytime
            </p>
            <p className="text-xs text-muted-foreground">
              Questions? Contact our enterprise team: <span className="text-primary">enterprise@agentforcehr.com</span> | 1-800-AGENT-HR
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default EnterpriseLanding;