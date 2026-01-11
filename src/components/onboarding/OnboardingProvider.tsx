import { createContext, useContext, ReactNode } from 'react';
import { useOnboarding as useOnboardingHook } from '@/hooks/useOnboarding';

type OnboardingContextType = ReturnType<typeof useOnboardingHook>;

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const onboarding = useOnboardingHook();

  return (
    <OnboardingContext.Provider value={onboarding}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboardingContext = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboardingContext must be used within an OnboardingProvider');
  }
  return context;
};

export default OnboardingProvider;
