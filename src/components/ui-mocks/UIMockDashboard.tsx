import { Home, Search, MessageSquare, Bell, User, Settings, Lock } from "lucide-react";

export const UIMockDashboard = () => {
  return (
    <div className="w-full max-w-2xl rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
      {/* Top Nav */}
      <div className="h-12 bg-background-elevated border-b border-border flex items-center px-4 gap-4">
        <div className="w-6 h-6 rounded bg-foreground-muted/20" />
        <div className="flex-1" />
        <div className="flex items-center gap-3">
          <Bell className="w-4 h-4 text-foreground-muted" />
          <div className="w-7 h-7 rounded-full bg-foreground-muted/30" />
        </div>
      </div>

      <div className="flex h-80">
        {/* Left Rail */}
        <div className="w-14 bg-background-surface border-r border-border flex flex-col items-center py-4 gap-4">
          <Home className="w-5 h-5 text-foreground" />
          <Search className="w-5 h-5 text-foreground-muted" />
          <MessageSquare className="w-5 h-5 text-foreground-muted" />
          <User className="w-5 h-5 text-foreground-muted" />
          <div className="flex-1" />
          <Settings className="w-5 h-5 text-foreground-muted" />
        </div>

        {/* Feed Content */}
        <div className="flex-1 p-4 space-y-3 overflow-hidden">
          {/* Post Card 1 */}
          <div className="rounded-xl bg-background-elevated border border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-foreground-muted/30" />
              <div>
                <div className="w-24 h-3 bg-foreground-muted/40 rounded" />
                <div className="w-16 h-2 bg-foreground-muted/20 rounded mt-1" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2.5 bg-foreground-muted/20 rounded" />
              <div className="w-3/4 h-2.5 bg-foreground-muted/20 rounded" />
            </div>
          </div>

          {/* Post Card 2 - Locked */}
          <div className="rounded-xl bg-background-elevated border border-border p-4 relative overflow-hidden">
            <div className="absolute inset-0 backdrop-blur-sm bg-background-elevated/60 flex items-center justify-center z-10">
              <div className="flex items-center gap-2 text-accent">
                <Lock className="w-4 h-4" />
                <span className="text-xs font-medium">Access required</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-foreground-muted/30" />
              <div>
                <div className="w-20 h-3 bg-foreground-muted/40 rounded" />
                <div className="w-12 h-2 bg-foreground-muted/20 rounded mt-1" />
              </div>
            </div>
            <div className="space-y-2 opacity-50">
              <div className="w-full h-2.5 bg-foreground-muted/20 rounded" />
              <div className="w-2/3 h-2.5 bg-foreground-muted/20 rounded" />
            </div>
          </div>

          {/* Post Card 3 */}
          <div className="rounded-xl bg-background-elevated border border-border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-foreground-muted/30" />
              <div>
                <div className="w-28 h-3 bg-foreground-muted/40 rounded" />
                <div className="w-14 h-2 bg-foreground-muted/20 rounded mt-1" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-2.5 bg-foreground-muted/20 rounded" />
              <div className="w-1/2 h-2.5 bg-foreground-muted/20 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
