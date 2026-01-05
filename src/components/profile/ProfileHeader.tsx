import { useState, useRef } from 'react';
import { Camera, Edit2, Eye, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Profile } from '@/hooks/useProfile';
import ProfileEditForm from './ProfileEditForm';

interface ProfileHeaderProps {
  profile: Profile | null;
  loading: boolean;
  onAvatarUpload: (file: File) => Promise<void>;
  onProfileUpdate: (updates: { display_name?: string; bio?: string }) => Promise<void>;
}

const ProfileHeader = ({ profile, loading, onAvatarUpload, onProfileUpdate }: ProfileHeaderProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    await onAvatarUpload(file);
    setIsUploading(false);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Placeholder analytics - these will be real when we add those features
  const analytics = [
    { label: 'Views', value: 0, icon: Eye },
    { label: 'Followers', value: 0, icon: Users },
    { label: 'Following', value: 0, icon: Users },
    { label: 'Posts', value: 0, icon: FileText },
  ];

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
        <div className="h-24 bg-background-elevated" />
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-background-elevated border-4 border-card" />
            <div className="flex-1 pt-14 space-y-2">
              <div className="h-6 w-32 bg-background-elevated rounded" />
              <div className="h-4 w-48 bg-background-elevated rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header gradient background */}
      <div className="h-24 bg-gradient-to-r from-background-elevated via-background-surface to-background-elevated" />
      
      <div className="px-6 pb-6">
        <div className="flex items-end gap-4 -mt-12">
          {/* Avatar with upload */}
          <div className="relative group">
            <Avatar className="w-24 h-24 rounded-2xl border-4 border-card">
              <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || 'Profile'} />
              <AvatarFallback className="rounded-2xl bg-background-elevated text-xl font-semibold">
                {getInitials(profile?.display_name)}
              </AvatarFallback>
            </Avatar>
            <button
              onClick={handleAvatarClick}
              disabled={isUploading}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:cursor-wait"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Name and bio */}
          <div className="flex-1 pt-14">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-serif font-semibold text-foreground">
                  {profile?.display_name || 'Unknown User'}
                </h1>
                {profile?.bio && (
                  <p className="text-foreground-muted text-sm mt-1 line-clamp-2 max-w-md">
                    {profile.bio}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          {analytics.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <Icon className="w-4 h-4 text-foreground-muted" />
                <span className="text-2xl font-semibold text-foreground">{value}</span>
              </div>
              <span className="text-xs text-foreground-muted uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Edit form modal */}
      <ProfileEditForm
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        profile={profile}
        onSave={onProfileUpdate}
      />
    </div>
  );
};

export default ProfileHeader;
