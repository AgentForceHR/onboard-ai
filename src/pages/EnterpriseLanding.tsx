
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
  Star
} from "lucide-react";
import { Link } from "react-router-dom";

const EnterpriseLanding = () => {
  const features = [
    {
      icon: "/placeholder.svg",
      title: "AI-Powered HR Agents",
      description: "Deploy intelligent virtual assistants that handle employee onboarding, answer HR questions, and guide new hires through company processes 24/7."
    },
    {
      icon: "/placeholder.svg", 
      title: "Enterprise Security",
      description: "Bank-grade security with role-based access controls, data encryption, and compliance with industry standards like SOC 2 and GDPR."
    },
    {
      icon: "/placeholder.svg",
      title: "Seamless Integration", 
      description: "Connect with your existing HR systems, HRIS platforms, and enterprise tools through our robust API and pre-built integrations."
    },
    {
      icon: "/placeholder.svg",
      title: "Advanced Analytics",
      description: "Get detailed insights into employee engagement, onboarding completion rates, and HR process efficiency with comprehensive reporting."
    },
    {
      icon: "/placeholder.svg",
      title: "Scalable Solution",
      description: "Start with a few agents and scale to hundreds. Our credit-based system grows with your organization's needs."
    },
    {
      icon: "/placeholder.svg",
      title: "24/7 Support",
      description: "Dedicated enterprise support team with guaranteed response times and dedicated account management."
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      description: "Perfect for small HR teams getting started with AI agents",
      price: "$299",
      features: [
        { text: "5 AI Agents included", included: true },
        { text: "100 Credits per month", included: true },
        { text: "Basic analytics dashboard", included: true },
        { text: "Email support", included: true },
        { text: "Standard integrations", included: true },
        { text: "Advanced reporting", included: false },
        { text: "Dedicated account manager", included: false },
        { text: "Custom integrations", included: false }
      ],
      buttonText: "Start Free Trial"
    },
    {
      name: "Professional",
      description: "For growing companies with expanding HR needs",
      price: "$799",
      popular: true,
      features: [
        { text: "15 AI Agents included", included: true },
        { text: "500 Credits per month", included: true },
        { text: "Advanced analytics & insights", included: true },
        { text: "Priority support", included: true },
        { text: "All integrations included", included: true },
        { text: "Custom workflow builder", included: true },
        { text: "Advanced reporting", included: true },
        { text: "Dedicated account manager", included: false }
      ],
      buttonText: "Start Free Trial"
    },
    {
      name: "Enterprise",
      description: "Customized solutions for large organizations",
      price: "Custom",
      features: [
        { text: "Unlimited AI Agents", included: true },
        { text: "Custom credit allocation", included: true },
        { text: "White-label solution", included: true },
        { text: "24/7 phone & chat support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Advanced security features", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "SLA guarantees", included: true }
      ],
      buttonText: "Contact Sales"
    }
  ];

  const testimonials = [
    {
      quote: "AgentForceHR transformed our onboarding process. New employees get instant answers and our HR team can focus on strategic initiatives.",
      author: "Sarah Johnson",
      role: "VP of Human Resources",
      company: "TechCorp Inc."
    },
    {
      quote: "The credit system makes budgeting simple. We know exactly what we're paying for and can scale up or down as needed.",
      author: "Michael Chen",
      role: "CHRO",
      company: "Global Dynamics"
    },
    {
      quote: "Implementation was seamless. Our employees love having 24/7 HR support, and we've seen a 40% reduction in routine HR inquiries.",
      author: "Emily Rodriguez",
      role: "HR Director",
      company: "Innovation Labs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              Trusted by 500+ Enterprise HR Teams
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Empower Your HR Team with
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Intelligent AI Agents
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Streamline employee onboarding, automate routine HR tasks, and provide 24/7 support 
              with our enterprise-grade AI agent platform. Pay with credits, scale with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button size="xl" className="px-8" asChild>
                <Link to="/demo">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" className="px-8" asChild>
                <Link to="#pricing">
                  View Pricing
                </Link>
              </Button>
            </div>
            
            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">No setup fees • Cancel anytime • 30-day money-back guarantee</p>
              <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Why Enterprise HR Teams Choose AgentForceHR
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for enterprise needs with the scalability, security, and support your organization requires.
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

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Simple Credit-Based System
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              No complex token management. Just buy credits with your corporate card and deploy AI agents instantly.
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
                  Buy credits with your corporate credit card or purchase order. Simple, transparent pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-secondary">2</span>
                </div>
                <CardTitle className="text-xl">Create AI Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use credits to create specialized HR agents for onboarding, benefits, policies, and more.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">3</span>
                </div>
                <CardTitle className="text-xl">Deploy & Monitor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Launch agents to your employees and track performance with detailed analytics and insights.
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
                  Add more agents or adjust credit allocation based on usage patterns and business needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Trusted by Leading Organizations
            </h2>
            <p className="text-lg text-muted-foreground">
              See how enterprise HR teams are transforming their operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="pt-6">
                  <blockquote className="text-lg mb-6">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="space-y-1">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">
              Transparent Credit-Based Pricing
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your organization. All plans include core features with different credit allocations.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                name={plan.name}
                description={plan.description}
                price={plan.price}
                features={plan.features}
                popular={plan.popular}
                buttonText={plan.buttonText}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need a custom solution? We work with enterprises of all sizes.
            </p>
            <Button variant="outline" size="lg">
              Contact Enterprise Sales
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="container max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your HR Operations?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of enterprise HR teams who have streamlined their processes with AI agents.
            Start your free trial today - no technical setup required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" className="px-8">
              Start 30-Day Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="xl" className="px-8">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Full feature access • Cancel anytime
          </p>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default EnterpriseLanding;
