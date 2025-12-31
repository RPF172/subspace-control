import { Check, CheckCheck, Info } from "lucide-react";

export const UIMockMessaging = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
      <div className="flex h-80">
        {/* Conversation List */}
        <div className="w-1/3 border-r border-border">
          <div className="p-3 border-b border-border">
            <div className="text-sm font-medium text-foreground">Messages</div>
          </div>
          <div className="divide-y divide-border">
            {/* Active conversation */}
            <div className="p-3 bg-background-elevated">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-foreground-muted/40 relative">
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="w-16 h-2.5 bg-foreground/60 rounded" />
                  <div className="w-20 h-2 bg-foreground-muted/30 rounded mt-1" />
                </div>
              </div>
            </div>
            {/* Other conversations */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-foreground-muted/30" />
                  <div className="flex-1 min-w-0">
                    <div className="w-14 h-2.5 bg-foreground/40 rounded" />
                    <div className="w-18 h-2 bg-foreground-muted/20 rounded mt-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-foreground-muted/40" />
              <div>
                <div className="w-20 h-2.5 bg-foreground/60 rounded" />
                <div className="w-12 h-2 bg-success/60 rounded mt-1" />
              </div>
            </div>
            <Info className="w-4 h-4 text-foreground-muted" />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-3 overflow-hidden">
            {/* System message */}
            <div className="flex justify-center">
              <div className="px-3 py-1.5 rounded-full bg-background-elevated border border-border text-xs text-foreground-muted">
                Request accepted • 2 days ago
              </div>
            </div>

            {/* Received */}
            <div className="flex gap-2">
              <div className="w-6 h-6 rounded-full bg-foreground-muted/30 flex-shrink-0" />
              <div className="max-w-[70%]">
                <div className="rounded-lg rounded-tl-none bg-background-elevated border border-border p-2.5">
                  <div className="w-full h-2 bg-foreground-muted/40 rounded mb-1" />
                  <div className="w-3/4 h-2 bg-foreground-muted/40 rounded" />
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-foreground-muted">
                  <span>10:32 AM</span>
                </div>
              </div>
            </div>

            {/* Sent */}
            <div className="flex gap-2 justify-end">
              <div className="max-w-[70%]">
                <div className="rounded-lg rounded-tr-none bg-accent/20 border border-accent/30 p-2.5">
                  <div className="w-full h-2 bg-foreground-muted/40 rounded mb-1" />
                  <div className="w-2/3 h-2 bg-foreground-muted/40 rounded" />
                </div>
                <div className="flex items-center gap-1 mt-1 text-xs text-foreground-muted justify-end">
                  <span>10:35 AM</span>
                  <CheckCheck className="w-3 h-3 text-success" />
                </div>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 bg-background-elevated rounded-lg px-3 py-2 border border-border">
              <div className="flex-1 h-4 bg-foreground-muted/20 rounded" />
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
