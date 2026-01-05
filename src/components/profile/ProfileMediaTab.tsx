import { Image } from 'lucide-react';

const ProfileMediaTab = () => {
  // Placeholder - no media yet
  const media: any[] = [];

  if (media.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-full bg-background-elevated flex items-center justify-center mb-4">
          <Image className="w-6 h-6 text-foreground-muted" />
        </div>
        <h3 className="text-foreground font-medium mb-1">No media shared</h3>
        <p className="text-foreground-muted text-sm max-w-xs">
          Photos and videos you share will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {/* Media thumbnails will be rendered here */}
    </div>
  );
};

export default ProfileMediaTab;
