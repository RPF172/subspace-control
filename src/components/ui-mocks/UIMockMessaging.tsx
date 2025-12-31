import { Send, MoreHorizontal, Shield, CheckCircle, Clock } from "lucide-react";

export const UIMockMessaging = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
      <div className="flex h-80">
        {/* Conversation List */}
        <div className="w-36 border-r border-border bg-background-surface">
          <div className="p-3 border-b border-border">
            <div className="text-xs font-medium text-foreground-secondary uppercase tracking-wider">Messages</div>
          </div>
          <div className="py-2">
            {/* Active conversation */}
            <div className="px-3 py-2 bg-background-elevated border-l-2 border-accent">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-foreground-muted/30" />
                <div className="flex-1 min-w-0">
                  <div className="w-14 h-2.5 bg-foreground/60 rounded" />
                  <div className="w-10 h-2 bg-foreground-muted/30 rounded mt-1" />
                </div>
              </div>
            </div>
            {/* Other conversations */}
            <div className="px-3 py-2 hover:bg-background-elevated/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-foreground-muted/20" />
                <div className="flex-1 min-w-0">
                  <div className="w-12 h-2.5 bg-foreground-muted/40 rounded" />
                  <div className="w-8 h-2 bg-foreground-muted/20 rounded mt-1" />
                </div>
              </div>
            </div>
            <div className="px-3 py-2 hover:bg-background-elevated/50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-foreground-muted/20" />
                <div className="flex-1 min-w-0">
                  <div className="w-16 h-2.5 bg-foreground-muted/40 rounded" />
                  <div className="w-10 h-2 bg-foreground-muted/20 rounded mt-1" />
                </div>
              </div>
            </div>
            {/* Pending request */}
            <div className="px-3 py-2 opacity-60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Clock className="w-3 h-3 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="w-12 h-2.5 bg-foreground-muted/30 rounded" />
                  <div className="text-[9px] text-accent mt-0.5">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 flex flex-col">
          {/* Thread Header */}
          <div className="p-3 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-foreground-muted/30" />
              <div>
                <div className="w-20 h-3 bg-foreground/60 rounded" />
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span className="text-[9px] text-foreground-muted">Online</span>
                </div>
              </div>
            </div>
            <MoreHorizontal className="w-4 h-4 text-foreground-muted" />
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 space-y-3 overflow-hidden">
            {/* System message - Access granted */}
            <div className="flex justify-center">
              <div className="px-3 py-1.5 rounded-full bg-success/10 border border-success/20 flex items-center gap-1.5">
                <CheckCircle className="w-3 h-3 text-success" />
                <span className="text-[10px] text-success font-medium">Access granted</span>
              </div>
            </div>
            
            {/* Received message */}
            <div className="flex items-end gap-2">
              <div className="w-6 h-6 rounded-full bg-foreground-muted/30 flex-shrink-0" />
              <div className="max-w-[70%] p-2.5 rounded-xl rounded-bl-sm bg-background-elevated border border-border">
                <div className="space-y-1">
                  <div className="w-28 h-2 bg-foreground-muted/40 rounded" />
                  <div className="w-20 h-2 bg-foreground-muted/40 rounded" />
                </div>
              </div>
            </div>

            {/* Sent message */}
            <div className="flex justify-end">
              <div className="max-w-[70%] p-2.5 rounded-xl rounded-br-sm bg-foreground/10 border border-foreground/20">
                <div className="space-y-1">
                  <div className="w-24 h-2 bg-foreground/30 rounded" />
                  <div className="w-16 h-2 bg-foreground/30 rounded" />
                </div>
              </div>
            </div>

            {/* System message - Consent reminder */}
            <div className="flex justify-center">
              <div className="px-3 py-1.5 rounded-full bg-background-elevated border border-border flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-foreground-muted" />
                <span className="text-[10px] text-foreground-muted">All messages are private</span>
              </div>
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border">
            <div className="flex items-center gap-2 bg-background-elevated rounded-lg px-3 py-2 border border-border">
              <div className="flex-1 h-4 bg-foreground-muted/20 rounded" />
              <Send className="w-4 h-4 text-foreground-muted" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
