import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useOnboarding } from "@/hooks/useOnboarding";
import { OnboardingReminder } from "@/components/onboarding";
import { useNavigate } from "react-router-dom";

export const DashboardTopBar = () => {
  const { signOut } = useAuth();
  const { profile } = useProfile();
  const { showReminder } = useOnboarding();
  const navigate = useNavigate();

  const hasUnreadNotifications = showReminder;

  const getInitials = (name: string | null) => {
    if (!name) return "U";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <header className="fixed top-0 right-0 left-16 h-14 bg-background/80 backdrop-blur-sm border-b border-border z-30">
      <div className="h-full flex items-center justify-end px-6 gap-4">
        {/* Notification Icon */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-background-elevated transition-colors">
              <Bell className="w-5 h-5 text-foreground-muted" />
              {hasUnreadNotifications && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-popover border-border">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-sm font-medium">Notifications</p>
            </div>
            {showReminder ? (
              <div className="p-2">
                <OnboardingReminder />
              </div>
            ) : (
              <div className="px-3 py-6 text-center">
                <p className="text-sm text-foreground-muted">No new notifications</p>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Online Status */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success" />
        </div>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full ring-2 ring-transparent hover:ring-border transition-all">
              <Avatar className="w-8 h-8">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-background-elevated text-foreground-muted text-xs">
                  {getInitials(profile?.display_name)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-popover border-border">
            <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer">
              View Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem 
              onClick={() => signOut()} 
              className="cursor-pointer text-accent focus:text-accent"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
