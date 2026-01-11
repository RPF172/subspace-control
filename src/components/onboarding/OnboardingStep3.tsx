import { useState } from 'react';
import { X, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useOnboardingContext } from './OnboardingProvider';
import { cn } from '@/lib/utils';

const OnboardingStep3 = () => {
  const {
    data,
    suggestedInterests,
    addInterest,
    removeInterest,
    setInterestsPublic,
    addLimit,
    removeLimit,
    nextStep,
    prevStep,
  } = useOnboardingContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [customInterest, setCustomInterest] = useState('');
  const [softLimitInput, setSoftLimitInput] = useState('');
  const [hardLimitInput, setHardLimitInput] = useState('');

  const filteredSuggestions = suggestedInterests.filter(
    (interest) =>
      interest.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !data.interests.some((i) => i.tag.toLowerCase() === interest.toLowerCase())
  );

  const handleAddCustomInterest = () => {
    if (customInterest.trim()) {
      addInterest(customInterest.trim(), true);
      setCustomInterest('');
    }
  };

  const handleAddSoftLimit = () => {
    if (softLimitInput.trim()) {
      addLimit(softLimitInput.trim(), 'soft');
      setSoftLimitInput('');
    }
  };

  const handleAddHardLimit = () => {
    if (hardLimitInput.trim()) {
      addLimit(hardLimitInput.trim(), 'hard');
      setHardLimitInput('');
    }
  };

  return (
    <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
      {/* Interests Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-foreground font-medium">Interests & Kinks</Label>
            <p className="text-xs text-foreground-muted mt-0.5">
              What are you into? This helps find compatible connections.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-muted">
              {data.interests_public ? 'Public' : 'Private'}
            </span>
            <Switch
              checked={data.interests_public}
              onCheckedChange={setInterestsPublic}
            />
          </div>
        </div>

        {/* Selected Interests */}
        {data.interests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {data.interests.map((interest) => (
              <Badge
                key={interest.tag}
                variant="secondary"
                className="bg-background-elevated border border-border gap-1 pr-1"
              >
                {interest.tag}
                <button
                  onClick={() => removeInterest(interest.tag)}
                  className="ml-1 hover:text-accent-red transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        {/* Search Suggestions */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search interests..."
              className="pl-9 bg-background-elevated border-border"
            />
          </div>
          
          {(searchTerm || filteredSuggestions.length > 0) && (
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {filteredSuggestions.slice(0, 12).map((interest) => (
                <button
                  key={interest}
                  onClick={() => addInterest(interest)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-background-elevated border border-border text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors"
                >
                  + {interest}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Custom Interest */}
        <div className="flex gap-2">
          <Input
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomInterest()}
            placeholder="Add custom interest..."
            className="bg-background-elevated border-border"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddCustomInterest}
            disabled={!customInterest.trim()}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Limits Section */}
      <div className="pt-4 border-t border-border space-y-4">
        <div>
          <Label className="text-foreground font-medium">Boundaries & Limits</Label>
          <p className="text-xs text-foreground-muted mt-0.5">
            Setting clear limits is a sign of self-awareness and respect. These are always private.
          </p>
        </div>

        {/* Soft Limits */}
        <div className="space-y-2">
          <Label className="text-sm text-foreground-muted">
            Soft Limits
            <span className="ml-2 text-xs">(things you're cautious about)</span>
          </Label>
          
          {data.soft_limits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.soft_limits.map((limit) => (
                <Badge
                  key={limit}
                  variant="outline"
                  className="border-yellow-500/30 text-yellow-500/80 gap-1 pr-1"
                >
                  {limit}
                  <button
                    onClick={() => removeLimit(limit, 'soft')}
                    className="ml-1 hover:text-yellow-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={softLimitInput}
              onChange={(e) => setSoftLimitInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSoftLimit()}
              placeholder="Add soft limit..."
              className="bg-background-elevated border-border"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddSoftLimit}
              disabled={!softLimitInput.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Hard Limits */}
        <div className="space-y-2">
          <Label className="text-sm text-foreground-muted">
            Hard Limits
            <span className="ml-2 text-xs">(absolute boundaries)</span>
          </Label>
          
          {data.hard_limits.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.hard_limits.map((limit) => (
                <Badge
                  key={limit}
                  variant="outline"
                  className="border-accent-red/30 text-accent-red/80 gap-1 pr-1"
                >
                  {limit}
                  <button
                    onClick={() => removeLimit(limit, 'hard')}
                    className="ml-1 hover:text-accent-red transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Input
              value={hardLimitInput}
              onChange={(e) => setHardLimitInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddHardLimit()}
              placeholder="Add hard limit..."
              className="bg-background-elevated border-border"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleAddHardLimit}
              disabled={!hardLimitInput.trim()}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Exploring Option */}
        <button
          className="w-full p-3 rounded-xl border border-border bg-background-elevated text-left hover:border-foreground-muted transition-colors"
        >
          <div className="text-sm text-foreground">Still exploring</div>
          <div className="text-xs text-foreground-muted mt-0.5">
            I'm not sure about my limits yet, and that's okay
          </div>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 sticky bottom-0 bg-card">
        <Button variant="ghost" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default OnboardingStep3;
