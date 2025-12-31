import { Heart, MessageCircle, Share2 } from "lucide-react";

export const UIMockFeed = () => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
      <div className="p-4 space-y-4">
        {/* Post 1 */}
        <div className="rounded-xl bg-background-elevated border border-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-foreground-muted/30" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <div className="w-24 h-3 bg-foreground/60 rounded" />
                <div className="w-2 h-2 rounded-full bg-success" />
              </div>
              <div className="w-16 h-2 bg-foreground-muted/30 rounded mt-1" />
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="w-full h-2.5 bg-foreground-muted/30 rounded" />
            <div className="w-full h-2.5 bg-foreground-muted/30 rounded" />
            <div className="w-2/3 h-2.5 bg-foreground-muted/30 rounded" />
          </div>
          <div className="flex items-center gap-6 text-foreground-muted">
            <Heart className="w-4 h-4" />
            <MessageCircle className="w-4 h-4" />
            <Share2 className="w-4 h-4" />
          </div>
        </div>

        {/* Post 2 */}
        <div className="rounded-xl bg-background-elevated border border-border p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-foreground-muted/30" />
            <div className="flex-1">
              <div className="w-20 h-3 bg-foreground/60 rounded" />
              <div className="w-12 h-2 bg-foreground-muted/30 rounded mt-1" />
            </div>
          </div>
          <div className="aspect-video rounded-lg bg-foreground-muted/20 mb-4" />
          <div className="flex items-center gap-6 text-foreground-muted">
            <Heart className="w-4 h-4" />
            <MessageCircle className="w-4 h-4" />
            <Share2 className="w-4 h-4" />
          </div>
        </div>

        {/* Post 3 preview */}
        <div className="rounded-xl bg-background-elevated border border-border p-4 opacity-60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-foreground-muted/30" />
            <div className="flex-1">
              <div className="w-28 h-3 bg-foreground/40 rounded" />
              <div className="w-14 h-2 bg-foreground-muted/20 rounded mt-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
