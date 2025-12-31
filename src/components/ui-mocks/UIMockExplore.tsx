import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

export const UIMockExplore = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-border bg-card overflow-hidden shadow-xl">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 bg-background-elevated rounded-lg px-3 py-2 border border-border">
          <Search className="w-4 h-4 text-foreground-muted" />
          <div className="flex-1 h-4 bg-foreground-muted/20 rounded w-32" />
        </div>
      </div>

      <div className="flex">
        {/* Filters Panel */}
        <div className="w-40 border-r border-border p-4 space-y-4">
          <div className="text-xs font-medium text-foreground-secondary uppercase tracking-wider">Filters</div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-foreground">
              <span>Role</span>
              <ChevronDown className="w-3 h-3" />
            </div>
            <div className="pl-2 space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border border-accent bg-accent" />
                <span className="text-xs text-foreground-secondary">Dominant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border border-border" />
                <span className="text-xs text-foreground-secondary">Submissive</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded border border-border" />
                <span className="text-xs text-foreground-secondary">Switch</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-foreground">
              <span>Location</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-foreground">
              <span>Interests</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-foreground-muted">24 results</div>
            <div className="flex items-center gap-1 text-xs text-foreground-muted">
              <SlidersHorizontal className="w-3 h-3" />
              <span>Sort</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-lg bg-background-elevated border border-border p-3">
                <div className="w-10 h-10 rounded-full bg-foreground-muted/30 mx-auto mb-2" />
                <div className="w-16 h-2.5 bg-foreground/50 rounded mx-auto mb-1" />
                <div className="w-12 h-2 bg-accent/40 rounded mx-auto mb-2" />
                <div className="flex gap-1 justify-center">
                  <div className="w-8 h-3 bg-foreground-muted/20 rounded" />
                  <div className="w-8 h-3 bg-foreground-muted/20 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
