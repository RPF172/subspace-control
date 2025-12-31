import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { FeatureCard } from "@/components/FeatureCard";
import { ValuePill } from "@/components/ValuePill";
import { 
  Shield, 
  Lock, 
  Users, 
  Wallet, 
  Eye, 
  MessageSquare,
  ArrowRight 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#values" className="text-sm text-foreground-secondary hover:text-foreground transition-colors">
              Values
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
            <Button size="sm">
              Request Access
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div 
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "0ms" }}
          >
            <ValuePill>Privacy-first social platform</ValuePill>
          </div>
          
          <h1 
            className="mt-8 text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-tight opacity-0 animate-fade-in"
            style={{ animationDelay: "100ms" }}
          >
            Built for communities
            <br />
            <span className="text-accent">that demand discretion</span>
          </h1>
          
          <p 
            className="mt-6 text-lg text-foreground-secondary max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            A modern social platform for power-exchange communities. Real privacy. 
            Real monetization. Software that treats you like an adult.
          </p>
          
          <div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <Button size="lg" className="group">
              Request Access
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="secondary" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-background-surface border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
              Infrastructure, not gimmicks
            </h2>
            <p className="mt-4 text-foreground-secondary max-w-xl mx-auto">
              Every feature exists because it solves a real problem for real communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Shield}
              title="Privacy by Default"
              description="Control over visibility, access, and interaction is central — not buried in settings."
            />
            <FeatureCard
              icon={Lock}
              title="Consent Infrastructure"
              description="Consent encoded into flows, defaults, and affordances. Not just copy."
            />
            <FeatureCard
              icon={Users}
              title="Community Depth"
              description="Groups, roles, and identity tools built for the nuances of power-exchange dynamics."
            />
            <FeatureCard
              icon={Wallet}
              title="Clean Monetization"
              description="Creator tools without dark patterns. Money exists in the open, clearly."
            />
            <FeatureCard
              icon={Eye}
              title="Content Control"
              description="Granular access controls for content. Lock, restrict, or open — your choice."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Real Communication"
              description="Messaging that respects boundaries. Request-based access, not open inboxes."
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section id="values" className="py-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
              What we believe
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "Taste Over Titillation",
                description: "Adult-aware, never juvenile. Restraint is a feature."
              },
              {
                title: "Privacy Is Power",
                description: "Control over your visibility, access, and interactions is fundamental."
              },
              {
                title: "Consent Is Structural",
                description: "Not copy. It's how the platform works at every level."
              },
              {
                title: "Monetization Without Shame",
                description: "Clear, honest, without deception or manipulation."
              },
              {
                title: "Credibility at Scale",
                description: "Every screen should feel believable at 10 users or 10 million."
              }
            ].map((value, index) => (
              <div 
                key={value.title}
                className="flex gap-6 p-6 rounded-xl bg-card border border-border"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-background-elevated flex items-center justify-center text-sm font-medium text-foreground-secondary">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-base font-medium text-foreground">{value.title}</h3>
                  <p className="mt-1 text-sm text-foreground-secondary">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-border">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">
            Ready for something different?
          </h2>
          <p className="mt-4 text-foreground-secondary">
            SubSpace is currently in private beta. Request access to join a platform 
            that finally gets it right.
          </p>
          <div className="mt-8">
            <Button size="lg" className="group">
              Request Access
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-foreground-muted">
            © 2025 SubSpace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
