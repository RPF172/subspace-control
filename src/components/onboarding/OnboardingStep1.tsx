import { useState, useRef } from 'react';
import { Upload, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useOnboardingContext } from './OnboardingProvider';
import { useProfile } from '@/hooks/useProfile';

const OnboardingStep1 = () => {
  const { data, nextStep, saveProfileFields } = useOnboardingContext();
  const { uploadAvatar } = useProfile();
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.avatar_url);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    setUploading(true);
    const result = await uploadAvatar(file);
    setUploading(false);

    if (result.url) {
      setPreviewUrl(result.url);
    }
  };

  const handleSkip = async () => {
    await saveProfileFields({ avatar_skipped: true });
    nextStep();
  };

  const handleContinue = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6">
      {/* Avatar Preview */}
      <div className="relative">
        <Avatar className="w-32 h-32 border-4 border-border">
          <AvatarImage src={previewUrl || ''} alt="Profile" />
          <AvatarFallback className="bg-background-elevated">
            <User className="w-12 h-12 text-foreground-muted" />
          </AvatarFallback>
        </Avatar>
        {uploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-full">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Title & Description */}
      <div className="space-y-2">
        <h3 className="font-serif text-lg font-semibold text-foreground">
          Add a Profile Photo
        </h3>
        <p className="text-sm text-foreground-muted max-w-sm">
          A photo helps others recognize you and builds trust. You can change this anytime.
        </p>
      </div>

      {/* Upload Button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="gap-2"
      >
        <Upload className="w-4 h-4" />
        {previewUrl ? 'Change Photo' : 'Upload Photo'}
      </Button>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full pt-4">
        <Button
          onClick={handleContinue}
          disabled={uploading}
          className="w-full"
        >
          Continue
        </Button>
        {!previewUrl && (
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-foreground-muted"
          >
            Skip for now
          </Button>
        )}
      </div>

      {/* Reassurance */}
      <p className="text-xs text-foreground-muted">
        Your photo is only visible to people you choose
      </p>
    </div>
  );
};

export default OnboardingStep1;
