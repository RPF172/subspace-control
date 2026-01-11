import { UserPlus, MapPin, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface DiscoverySuggestion {
  id: string;
  type: "profile" | "creator" | "nearby";
  displayName: string;
  initials: string;
  tagline: string;
  role: string;
}

const mockSuggestions: DiscoverySuggestion[] = [
  {
    id: "1",
    type: "profile",
    displayName: "Suggested Profile",
    initials: "SP",
    tagline: "Shared interests",
    role: "Dominant",
  },
  {
    id: "2",
    type: "creator",
    displayName: "Featured Creator",
    initials: "FC",
    tagline: "Accepting requests",
    role: "Switch",
  },
  {
    id: "3",
    type: "nearby",
    displayName: "Nearby User",
    initials: "NU",
    tagline: "Within 25mi",
    role: "Submissive",
  },
];

const getTypeIcon = (type: DiscoverySuggestion["type"]) => {
  switch (type) {
    case "profile":
      return <Sparkles className="w-3 h-3" />;
    case "creator":
      return <UserPlus className="w-3 h-3" />;
    case "nearby":
      return <MapPin className="w-3 h-3" />;
  }
};

const SuggestionCard = ({ suggestion }: { suggestion: DiscoverySuggestion }) => (
  <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-background-elevated/30 hover:bg-background-elevated/50 transition-colors">
    <div className="flex items-center gap-3">
      <Avatar className="w-12 h-12 border border-border">
        <AvatarFallback className="bg-background-surface text-foreground-muted text-sm">
          {suggestion.initials}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-sm font-medium text-foreground">
            {suggestion.displayName}
          </span>
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-background-surface text-foreground-muted text-[10px]">
            {getTypeIcon(suggestion.type)}
            {suggestion.tagline}
          </span>
        </div>
        <span className="text-xs text-foreground-muted">{suggestion.role}</span>
      </div>
    </div>

    <Button
      variant="outline"
      size="sm"
      className="border-border bg-transparent hover:bg-background-elevated text-foreground-secondary hover:text-foreground"
    >
      View
    </Button>
  </div>
);

export const DashboardDiscoveryPanel = () => {
  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground">Discover</h2>
        <button className="text-xs text-foreground-muted hover:text-foreground-secondary transition-colors">
          See more
        </button>
      </div>

      <div className="space-y-3">
        {mockSuggestions.map((suggestion) => (
          <SuggestionCard key={suggestion.id} suggestion={suggestion} />
        ))}
      </div>
    </div>
  );
};
