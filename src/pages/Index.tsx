import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { SectionDivider } from "@/components/SectionDivider";
import { UIMockDashboard } from "@/components/ui-mocks/UIMockDashboard";
import { UIMockFeed } from "@/components/ui-mocks/UIMockFeed";
import { UIMockProfile } from "@/components/ui-mocks/UIMockProfile";
import { UIMockExplore } from "@/components/ui-mocks/UIMockExplore";
import { UIMockMessaging } from "@/components/ui-mocks/UIMockMessaging";
import { UIMockWallet } from "@/components/ui-mocks/UIMockWallet";
import { 
  Users, 
  Shield, 
  Award,
  Lock,
  ShieldCheck,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Logo size="sm" />
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

      {/* SECTION 1 — HERO */}
      <section className="pt-24 pb-20 px-6 relative overflow-hidden">
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }} 
        />
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-foreground leading-[1.1] mb-6">
                Built for power.
                <br />
                <span className="text-foreground-secondary">Designed with restraint.</span>
              </h1>
              
              <p className="text-lg text-foreground-secondary leading-relaxed mb-4 max-w-xl">
                SubSpace is a modern social platform for power-exchange communities — combining community, monetization, and privacy with real UX standards.
              </p>
              
              <p className="text-sm text-foreground-muted mb-8 max-w-lg">
                What if FetLife, OnlyFans, and X had a baby — but the baby actually had taste, security, and UX standards?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Request Access
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  Explore the platform
                </Button>
              </div>
            </div>

            {/* Right - UI Mock */}
            <div className="flex justify-center lg:justify-end">
              <UIMockDashboard />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — POSITIONING STRIP */}
      <SectionDivider />
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <p className="text-xl md:text-2xl font-serif text-foreground leading-relaxed mb-8">
            Most platforms weren't built for this community.
            <br />
            <span className="text-foreground-secondary">SubSpace was.</span>
          </p>
          
          <div className="flex items-center justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <Users className="w-5 h-5 text-foreground-muted" />
              <span className="text-xs text-foreground-muted">Community</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-5 h-5 text-foreground-muted" />
              <span className="text-xs text-foreground-muted">Control</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Award className="w-5 h-5 text-foreground-muted" />
              <span className="text-xs text-foreground-muted">Credibility</span>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider />

      {/* SECTION 3 — FEATURE: COMMUNITY */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - UI Mock */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <UIMockFeed />
            </div>

            {/* Right - Copy */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                Community without chaos
              </h2>
              
              <p className="text-foreground-secondary leading-relaxed mb-6">
                SubSpace gives you the depth of real communities without outdated forums, cluttered profiles, or unreadable feeds. Everything is structured, intentional, and built to scale.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Clean, readable feeds
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Real groups and discussions
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Identity clarity without noise
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — FEATURE: PROFILES */}
      <section className="py-20 px-6 bg-background-surface">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Profiles built for clarity, not performance
          </h2>
          
          <p className="text-foreground-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            Profiles on SubSpace aren't vanity pages. They're control panels.
          </p>
          
          <div className="flex justify-center mb-10">
            <UIMockProfile />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="p-4 rounded-xl bg-card border border-border text-left">
              <div className="text-sm font-medium text-foreground mb-1">Role-aware identity</div>
              <div className="text-xs text-foreground-muted">Express who you are</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-left">
              <div className="text-sm font-medium text-foreground mb-1">Structured interests</div>
              <div className="text-xs text-foreground-muted">Preferences organized</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-left">
              <div className="text-sm font-medium text-foreground mb-1">Collapsed sections</div>
              <div className="text-xs text-foreground-muted">Sensitive info protected</div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border text-left">
              <div className="text-sm font-medium text-foreground mb-1">Access controls</div>
              <div className="text-xs text-foreground-muted">Clear visibility rules</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FEATURE: DISCOVERY */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                Discovery without the gamble
              </h2>
              
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Finding people on SubSpace is deliberate, not random. Search and filters come first — so intent is always clear.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Search-first layout
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Role-aware filters
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Interest-based discovery
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  No swipe mechanics
                </li>
              </ul>
            </div>

            {/* Right - UI Mock */}
            <div className="flex justify-center lg:justify-end">
              <UIMockExplore />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — FEATURE: MESSAGING */}
      <section className="py-20 px-6 bg-background-surface">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - UI Mock */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <UIMockMessaging />
            </div>

            {/* Right - Copy */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                Private by default
              </h2>
              
              <p className="text-foreground-secondary leading-relaxed mb-6">
                Messaging on SubSpace respects consent and control. Every interaction is intentional.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Request-based messaging
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Clear system messages
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Block, mute, and visibility controls
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 — FEATURE: MONETIZATION */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                Monetization without embarrassment
              </h2>
              
              <p className="text-foreground-secondary leading-relaxed mb-6">
                SubSpace treats monetization as infrastructure — not a workaround.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Subscriptions and paid access
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Content gating done cleanly
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Transparent wallet and transaction history
                </li>
                <li className="flex items-center gap-3 text-foreground-secondary">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  Stripe-compliant by design
                </li>
              </ul>
            </div>

            {/* Right - UI Mock */}
            <div className="flex justify-center lg:justify-end">
              <UIMockWallet />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — SECURITY & TRUST */}
      <section className="py-20 px-6 bg-background-surface">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            Built to be trusted
          </h2>
          
          <p className="text-foreground-secondary leading-relaxed mb-8">
            Privacy and security aren't add-ons. They're part of the foundation.
          </p>
          
          <ul className="space-y-3 text-left max-w-md mx-auto mb-10">
            <li className="flex items-center gap-3 text-foreground-secondary">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              Modern authentication
            </li>
            <li className="flex items-center gap-3 text-foreground-secondary">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              Optional two-factor security
            </li>
            <li className="flex items-center gap-3 text-foreground-secondary">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              Clear data boundaries
            </li>
            <li className="flex items-center gap-3 text-foreground-secondary">
              <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
              Scalable infrastructure
            </li>
          </ul>
          
          <div className="flex items-center justify-center gap-8">
            <Lock className="w-6 h-6 text-foreground-muted" />
            <Shield className="w-6 h-6 text-foreground-muted" />
            <ShieldCheck className="w-6 h-6 text-foreground-muted" />
          </div>
        </div>
      </section>

      {/* SECTION 9 — FINAL CTA */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-4">
            This isn't for everyone.
          </h2>
          
          <p className="text-foreground-secondary leading-relaxed mb-8">
            SubSpace is invite-only while we build carefully. If this resonates, you can request access.
          </p>
          
          <Button size="lg" className="group mb-6">
            Request Access
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <p className="text-sm text-foreground-muted">
            No public feeds. No scraping. No noise.
          </p>
        </div>
      </section>

      {/* SECTION 10 — FOOTER */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">About</a>
              <a href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-sm text-foreground-muted hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-foreground-muted">
              © SubSpace
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
