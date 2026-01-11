import { User } from 'lucide-react';
import { useOnboardingContext } from './OnboardingProvider';

interface OnboardingReminderProps {
  onClick?: () => void;
}

const OnboardingReminder = ({ onClick }: OnboardingReminderProps) => {
  const { showReminder, data, reopenOnboarding } = useOnboardingContext();

  if (!showReminder || data.onboarding_completed) return null;

  const handleClick = () => {
    reopenOnboarding();
    onClick?.();
  };

  const stepsCompleted = data.onboarding_step - 1;
  const totalSteps = 4;

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors text-left"
    >
      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
        <User className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-foreground">
          Complete your profile
        </div>
        <div className="text-xs text-foreground-muted">
          {stepsCompleted} of {totalSteps} steps done
        </div>
      </div>
      <div className="w-12 h-1.5 bg-background-elevated rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${(stepsCompleted / totalSteps) * 100}%` }}
        />
      </div>
    </button>
  );
};

export default OnboardingReminder;
