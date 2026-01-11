import { Lock } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

interface ConversationPreview {
  id: string;
  displayName: string;
  initials: string;
  timestamp: string;
  isUnread: boolean;
  isLocked: boolean;
}

const mockConversations: ConversationPreview[] = [
  {
    id: "1",
    displayName: "Redacted User",
    initials: "RU",
    timestamp: "2h ago",
    isUnread: true,
    isLocked: false,
  },
  {
    id: "2",
    displayName: "Anonymous",
    initials: "AN",
    timestamp: "5h ago",
    isUnread: false,
    isLocked: true,
  },
  {
    id: "3",
    displayName: "Protected",
    initials: "PR",
    timestamp: "1d ago",
    isUnread: false,
    isLocked: false,
  },
];

const ConversationRow = ({ conversation }: { conversation: ConversationPreview }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/messages")}
      disabled={conversation.isLocked}
      className={`
        w-full flex items-center gap-3 p-3 rounded-lg transition-colors
        ${conversation.isLocked 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:bg-background-elevated cursor-pointer"
        }
      `}
    >
      <div className="relative">
        <Avatar className="w-10 h-10 border border-border">
          <AvatarFallback className="bg-background-elevated text-foreground-muted text-xs">
            {conversation.initials}
          </AvatarFallback>
        </Avatar>
        {conversation.isLocked && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-background-surface border border-border flex items-center justify-center">
            <Lock className="w-2.5 h-2.5 text-foreground-muted" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 text-left">
        <p className={`text-sm truncate ${conversation.isUnread ? "font-medium text-foreground" : "text-foreground-secondary"}`}>
          {conversation.displayName}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {conversation.isUnread && (
          <span className="w-2 h-2 rounded-full bg-accent" />
        )}
        <span className="text-xs text-foreground-muted">
          {conversation.timestamp}
        </span>
      </div>
    </button>
  );
};

export const DashboardMessagesPanel = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg font-semibold text-foreground">Messages</h2>
        <button 
          onClick={() => navigate("/messages")}
          className="text-xs text-foreground-muted hover:text-foreground-secondary transition-colors"
        >
          View all
        </button>
      </div>

      <div className="space-y-1">
        {mockConversations.map((conversation) => (
          <ConversationRow key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};
