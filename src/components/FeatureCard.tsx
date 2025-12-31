import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group p-6 rounded-xl bg-card border border-border hover:border-border/80 transition-all duration-200">
      <div className="mb-4 w-10 h-10 rounded-lg bg-background-elevated flex items-center justify-center">
        <Icon className="w-5 h-5 text-foreground-secondary group-hover:text-foreground transition-colors" />
      </div>
      <h3 className="text-base font-medium text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground-secondary leading-relaxed">{description}</p>
    </div>
  );
}
