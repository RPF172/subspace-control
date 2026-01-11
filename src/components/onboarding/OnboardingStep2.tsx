import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useOnboardingContext } from './OnboardingProvider';
import { cn } from '@/lib/utils';

const roles = [
  { value: 'dominant', label: 'Dominant', description: 'I prefer to lead and guide' },
  { value: 'submissive', label: 'Submissive', description: 'I prefer to follow and serve' },
  { value: 'switch', label: 'Switch', description: 'I enjoy both roles' },
  { value: 'undeclared', label: 'Exploring', description: 'Still discovering my path' },
] as const;

const OnboardingStep2 = () => {
  const { data, saveProfileField, nextStep, prevStep, saving } = useOnboardingContext();
  
  const [displayName, setDisplayName] = useState(data.display_name || '');
  const [role, setRole] = useState<typeof roles[number]['value'] | null>(data.role);
  const [location, setLocation] = useState(data.location || '');
  const [locationPublic, setLocationPublic] = useState(data.location_public);
  const [age, setAge] = useState(data.age?.toString() || '');
  const [agePublic, setAgePublic] = useState(data.age_public);

  // Autosave on blur
  const handleDisplayNameBlur = () => {
    if (displayName.trim()) {
      saveProfileField('display_name', displayName.trim());
    }
  };

  const handleRoleSelect = (selectedRole: typeof roles[number]['value']) => {
    setRole(selectedRole);
    saveProfileField('role', selectedRole);
  };

  const handleLocationBlur = () => {
    saveProfileField('location', location.trim() || null);
  };

  const handleLocationPublicChange = (checked: boolean) => {
    setLocationPublic(checked);
    saveProfileField('location_public', checked);
  };

  const handleAgeBlur = () => {
    const ageNum = parseInt(age);
    if (ageNum >= 18 && ageNum <= 120) {
      saveProfileField('age', ageNum);
    } else if (!age) {
      saveProfileField('age', null);
    }
  };

  const handleAgePublicChange = (checked: boolean) => {
    setAgePublic(checked);
    saveProfileField('age_public', checked);
  };

  const canContinue = displayName.trim() && role;

  const handleContinue = () => {
    if (canContinue) {
      nextStep();
    }
  };

  return (
    <div className="space-y-6">
      {/* Core Identity Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="displayName" className="text-foreground">
            Display Name <span className="text-accent-red">*</span>
          </Label>
          <Input
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            onBlur={handleDisplayNameBlur}
            placeholder="How should we call you?"
            className="bg-background-elevated border-border"
          />
          <p className="text-xs text-foreground-muted">
            This is your public-facing name
          </p>
        </div>

        <div className="space-y-2">
          <Label className="text-foreground">
            Role <span className="text-accent-red">*</span>
          </Label>
          <div className="grid grid-cols-2 gap-2">
            {roles.map((r) => (
              <button
                key={r.value}
                onClick={() => handleRoleSelect(r.value)}
                className={cn(
                  'p-3 rounded-xl border text-left transition-all',
                  role === r.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-background-elevated hover:border-foreground-muted'
                )}
              >
                <div className="font-medium text-foreground text-sm">{r.label}</div>
                <div className="text-xs text-foreground-muted mt-0.5">{r.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Optional Context Section */}
      <div className="pt-4 border-t border-border space-y-4">
        <p className="text-sm text-foreground-muted">Optional information</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="location" className="text-foreground">
              Location
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground-muted">
                {locationPublic ? 'Public' : 'Private'}
              </span>
              <Switch
                checked={locationPublic}
                onCheckedChange={handleLocationPublicChange}
              />
            </div>
          </div>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onBlur={handleLocationBlur}
            placeholder="City, Country"
            className="bg-background-elevated border-border"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="age" className="text-foreground">
              Age
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground-muted">
                {agePublic ? 'Public' : 'Private'}
              </span>
              <Switch
                checked={agePublic}
                onCheckedChange={handleAgePublicChange}
              />
            </div>
          </div>
          <Input
            id="age"
            type="number"
            min={18}
            max={120}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onBlur={handleAgeBlur}
            placeholder="Must be 18+"
            className="bg-background-elevated border-border w-24"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="ghost" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleContinue} disabled={!canContinue || saving}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep2;
