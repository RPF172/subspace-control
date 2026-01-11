import { useOnboardingContext } from './OnboardingProvider';
import { cn } from '@/lib/utils';

const steps = [
  { number: 1, label: 'Photo' },
  { number: 2, label: 'Identity' },
  { number: 3, label: 'Interests' },
  { number: 4, label: 'About' },
];

const OnboardingProgress = () => {
  const { currentStep } = useOnboardingContext();

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                currentStep === step.number
                  ? 'bg-primary text-primary-foreground'
                  : currentStep > step.number
                  ? 'bg-accent-green/20 text-accent-green'
                  : 'bg-background-elevated text-foreground-muted'
              )}
            >
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span
              className={cn(
                'text-xs mt-1 transition-colors',
                currentStep === step.number
                  ? 'text-foreground'
                  : 'text-foreground-muted'
              )}
            >
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                'flex-1 h-0.5 mx-2 transition-colors',
                currentStep > step.number
                  ? 'bg-accent-green/40'
                  : 'bg-border'
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default OnboardingProgress;
