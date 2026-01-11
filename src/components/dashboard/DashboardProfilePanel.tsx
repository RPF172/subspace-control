import { Pencil, Clock, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";

const RoleBadge = ({ role }: { role: string | null }) => {
  const roleLabels: Record<string, string> = {
    dominant: "Dominant",
    submissive: "Submissive",
    switch: "Switch",
    undeclared: "Undeclared",
  };

  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md bg-background-elevated text-foreground-secondary text-xs font-medium">
      {roleLabels[role || "undeclared"] || "Undeclared"}
    </span>
  );
};

export const DashboardProfilePanel = () => {
  const { profile, loading } = useProfile();
  const navigate = useNavigate();

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-background-elevated" />
            <div className="space-y-2">
              <div className="w-32 h-5 bg-background-elevated rounded" />
              <div className="w-20 h-4 bg-background-elevated rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-start justify-between mb-6">
        <h2 className="font-serif text-lg font-semibold text-foreground">Your Space</h2>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Avatar className="w-16 h-16 border-2 border-border">
          <AvatarImage src={profile?.avatar_url || undefined} />
          <AvatarFallback className="bg-background-elevated text-foreground-muted text-lg">
            {getInitials(profile?.display_name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-foreground">
              {profile?.display_name || "Anonymous"}
            </h3>
            <span className="w-2 h-2 rounded-full bg-success" />
          </div>
          <RoleBadge role={profile?.role} />
        </div>
      </div>

      {profile?.bio && (
        <p className="text-sm text-foreground-secondary mb-6 line-clamp-1">
          {profile.bio}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/profile")}
          className="border-border bg-transparent hover:bg-background-elevated"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-border bg-transparent hover:bg-background-elevated"
        >
          <Clock className="w-4 h-4 mr-2" />
          Set Availability
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-border bg-transparent hover:bg-background-elevated"
        >
          <Shield className="w-4 h-4 mr-2" />
          Update Boundaries
        </Button>
      </div>
    </div>
  );
};
