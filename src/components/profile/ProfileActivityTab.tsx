import { Activity } from 'lucide-react';

const ProfileActivityTab = () => {
  // Placeholder - no activity yet
  const activities: any[] = [];

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-background-elevated flex items-center justify-center mb-4">
          <Activity className="w-6 h-6 text-foreground-muted" />
        </div>
        <h3 className="text-foreground font-medium mb-1">No recent activity</h3>
        <p className="text-foreground-muted text-sm max-w-xs">
          Your activity like following, posting, and engagement will show here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Activity timeline will be rendered here */}
    </div>
  );
};

export default ProfileActivityTab;
