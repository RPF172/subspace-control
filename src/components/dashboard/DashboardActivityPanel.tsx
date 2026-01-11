import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const LockedContentCard = ({ index }: { index: number }) => (
  <div className="relative rounded-lg border border-border bg-background-elevated/50 overflow-hidden">
    {/* Blurred placeholder content */}
    <div className="p-4 blur-sm select-none pointer-events-none">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-foreground-muted/20" />
        <div className="space-y-1.5">
          <div className="w-24 h-3 bg-foreground-muted/20 rounded" />
          <div className="w-16 h-2 bg-foreground-muted/10 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="w-full h-2.5 bg-foreground-muted/15 rounded" />
        <div className="w-4/5 h-2.5 bg-foreground-muted/15 rounded" />
        <div className="w-3/5 h-2.5 bg-foreground-muted/15 rounded" />
      </div>
    </div>
    
    {/* Lock overlay */}
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-[2px]">
      <div className="w-10 h-10 rounded-full bg-background-elevated border border-border flex items-center justify-center mb-2">
        <Lock className="w-4 h-4 text-foreground-muted" />
      </div>
      <p className="text-xs text-foreground-muted mb-2">Access required</p>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-xs h-7 text-foreground-secondary hover:text-foreground hover:bg-background-elevated"
      >
        Request access
      </Button>
    </div>
  </div>
);

export const DashboardActivityPanel = () => {
  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground">Activity</h2>
        <span className="text-xs text-foreground-muted">Restricted</span>
      </div>

      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <LockedContentCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
};
