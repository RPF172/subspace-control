import { Home, Compass, MessageCircle, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <button
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
          "hover:bg-background-elevated",
          isActive && "bg-background-elevated"
        )}
      >
        {isActive && (
          <div className="absolute inset-0 rounded-lg bg-accent/10 blur-sm" />
        )}
        <Icon 
          className={cn(
            "w-5 h-5 relative z-10 transition-colors",
            isActive ? "text-accent" : "text-foreground-muted hover:text-foreground-secondary"
          )} 
        />
      </button>
    </TooltipTrigger>
    <TooltipContent side="top" className="bg-popover border-border">
      <p>{label}</p>
    </TooltipContent>
  </Tooltip>
);

const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Compass, label: "Discover", path: "/discover" },
  { icon: MessageCircle, label: "Messages", path: "/messages" },
  { icon: User, label: "Profile", path: "/profile" },
];

export const DashboardNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed left-0 right-0 bottom-0 h-16 bg-background-surface border-t border-border flex items-center justify-center px-6 z-40">
      {/* Nav Items */}
      <div className="flex items-center gap-2">
        {navItems.map((item) => (
          <NavItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            isActive={location.pathname === item.path}
            onClick={() => navigate(item.path)}
          />
        ))}
        <NavItem
          icon={Settings}
          label="Settings"
          path="/settings"
          isActive={location.pathname === "/settings"}
          onClick={() => navigate("/settings")}
        />
      </div>
    </nav>
  );
};
