import { ChevronDown, Eye, Lock, Shield } from "lucide-react";

export const UIMockProfile = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-background-elevated to-background-surface relative">
        <div className="absolute -bottom-8 left-6">
          <div className="w-20 h-20 rounded-full bg-foreground-muted/40 border-4 border-card" />
        </div>
      </div>
      
      <div className="pt-12 px-6 pb-6">
        {/* Name & Role */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-5 bg-foreground/70 rounded" />
              <div className="w-2 h-2 rounded-full bg-success" />
            </div>
            <div className="w-20 h-3 bg-accent/60 rounded mt-2" />
          </div>
          <div className="flex items-center gap-2 text-xs text-foreground-muted">
            <Eye className="w-3 h-3" />
            <span>Private</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-border mb-4">
          <div className="pb-2 border-b-2 border-foreground text-sm text-foreground">About</div>
          <div className="pb-2 text-sm text-foreground-muted">Posts</div>
          <div className="pb-2 text-sm text-foreground-muted">Media</div>
          <div className="pb-2 text-sm text-foreground-muted flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Vault
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2 mb-4">
          <div className="w-full h-2.5 bg-foreground-muted/30 rounded" />
          <div className="w-4/5 h-2.5 bg-foreground-muted/30 rounded" />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="px-2 py-1 rounded-md bg-background-elevated text-xs text-foreground-secondary">Dominant</div>
          <div className="px-2 py-1 rounded-md bg-background-elevated text-xs text-foreground-secondary">Mentor</div>
          <div className="px-2 py-1 rounded-md bg-background-elevated text-xs text-foreground-secondary">Protocol</div>
        </div>

        {/* Collapsed Section */}
        <div className="rounded-lg border border-border bg-background-elevated p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-foreground-muted text-sm">
            <Shield className="w-4 h-4" />
            <span>Sensitive Information</span>
          </div>
          <ChevronDown className="w-4 h-4 text-foreground-muted" />
        </div>

        {/* Callouts */}
        <div className="mt-4 flex gap-2">
          <div className="flex-1 h-1 bg-success/30 rounded" />
          <div className="flex-1 h-1 bg-foreground-muted/20 rounded" />
          <div className="flex-1 h-1 bg-foreground-muted/20 rounded" />
        </div>
        <div className="mt-2 text-xs text-foreground-muted text-center">
          Profile completion: 35%
        </div>
      </div>
    </div>
  );
};
