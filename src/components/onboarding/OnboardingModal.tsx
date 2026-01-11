import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useOnboardingContext } from './OnboardingProvider';
import OnboardingProgress from './OnboardingProgress';
import OnboardingStep1 from './OnboardingStep1';
import OnboardingStep2 from './OnboardingStep2';
import OnboardingStep3 from './OnboardingStep3';
import OnboardingStep4 from './OnboardingStep4';

const OnboardingModal = () => {
  const {
    showModal,
    setShowModal,
    currentStep,
    skipOnboarding,
    loading,
  } = useOnboardingContext();

  if (loading) return null;

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <OnboardingStep1 />;
      case 2:
        return <OnboardingStep2 />;
      case 3:
        return <OnboardingStep3 />;
      case 4:
        return <OnboardingStep4 />;
      default:
        return <OnboardingStep1 />;
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-lg bg-card border-border p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Profile Setup</DialogTitle>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-4 border-b border-border">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">
              Complete Your Profile
            </h2>
            <p className="text-sm text-foreground-muted mt-1">
              Tell us about yourself
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={skipOnboarding}
            className="text-foreground-muted hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Progress */}
        <div className="px-6 pt-4">
          <OnboardingProgress />
        </div>

        {/* Step Content */}
        <div className="p-6 min-h-[400px]">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 pt-4 border-t border-border bg-background-surface/50">
          <Button
            variant="ghost"
            onClick={skipOnboarding}
            className="text-foreground-muted hover:text-foreground"
          >
            Skip for now
          </Button>
          <p className="text-xs text-foreground-muted">
            You can always update this later
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnboardingModal;
