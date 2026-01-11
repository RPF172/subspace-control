import { useState } from 'react';
import { Sparkles, Pencil, SkipForward, ChevronRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useOnboardingContext } from './OnboardingProvider';
import { cn } from '@/lib/utils';

type Mode = 'select' | 'write' | 'ai-questions' | 'ai-preview';

const OnboardingStep4 = () => {
  const {
    data,
    aiQuestions,
    saveProfileField,
    saveQuestionnaireResponse,
    saveGeneratedAbout,
    approveAbout,
    completeOnboarding,
    prevStep,
  } = useOnboardingContext();

  const [mode, setMode] = useState<Mode>('select');
  const [aboutText, setAboutText] = useState(data.about || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>(data.questionnaire_responses);
  const [generatedAbout, setGeneratedAbout] = useState(data.generated_about || '');
  const [generating, setGenerating] = useState(false);

  const currentQuestion = aiQuestions[currentQuestionIndex];
  const currentResponse = responses[currentQuestion?.id] || '';

  const handleWriteOwn = () => {
    setMode('write');
  };

  const handleAIAssist = () => {
    setMode('ai-questions');
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const handleSaveAbout = async () => {
    await saveProfileField('about', aboutText);
    completeOnboarding();
  };

  const handleResponseChange = (value: string) => {
    setResponses(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleResponseBlur = () => {
    if (currentResponse.trim()) {
      saveQuestionnaireResponse(currentQuestion.id, currentResponse.trim());
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < aiQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      generateAbout();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setMode('select');
    }
  };

  const generateAbout = async () => {
    setGenerating(true);
    
    // Simulate AI generation (in production, this would call an edge function)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate based on responses
    const generated = generateAboutFromResponses(responses);
    setGeneratedAbout(generated);
    await saveGeneratedAbout(generated);
    
    setGenerating(false);
    setMode('ai-preview');
  };

  const generateAboutFromResponses = (responses: Record<string, string>): string => {
    const parts: string[] = [];
    
    if (responses.identity) {
      parts.push(responses.identity);
    }
    
    if (responses.experience) {
      parts.push(`I'm ${responses.experience.toLowerCase()} in my journey.`);
    }
    
    if (responses.seeking) {
      parts.push(`Looking for ${responses.seeking.toLowerCase()}.`);
    }
    
    if (responses.values) {
      parts.push(`I value ${responses.values.toLowerCase()} above all.`);
    }
    
    if (responses.interests) {
      parts.push(responses.interests);
    }
    
    if (responses.boundaries) {
      parts.push(`When it comes to boundaries, ${responses.boundaries.toLowerCase()}.`);
    }
    
    return parts.join(' ') || "A curious soul exploring the depths of connection and power exchange.";
  };

  const handleApproveGenerated = async () => {
    await approveAbout(generatedAbout);
    completeOnboarding();
  };

  // Selection mode
  if (mode === 'select') {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Tell Your Story
          </h3>
          <p className="text-sm text-foreground-muted">
            How would you like to create your About section?
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleWriteOwn}
            className="w-full p-4 rounded-xl border border-border bg-background-elevated text-left hover:border-foreground-muted transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-foreground-muted" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Write my own</div>
                  <div className="text-xs text-foreground-muted">
                    Express yourself in your own words
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-foreground transition-colors" />
            </div>
          </button>

          <button
            onClick={handleAIAssist}
            className="w-full p-4 rounded-xl border border-border bg-background-elevated text-left hover:border-primary/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground">AI-assisted</div>
                  <div className="text-xs text-foreground-muted">
                    Answer a few questions, we'll help write it
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-primary transition-colors" />
            </div>
          </button>

          <button
            onClick={handleSkip}
            className="w-full p-4 rounded-xl border border-border bg-background-elevated text-left hover:border-foreground-muted transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <SkipForward className="w-5 h-5 text-foreground-muted" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Skip for now</div>
                  <div className="text-xs text-foreground-muted">
                    You can add this later
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-foreground-muted group-hover:text-foreground transition-colors" />
            </div>
          </button>
        </div>

        <div className="flex justify-start pt-4">
          <Button variant="ghost" onClick={prevStep}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  // Write own mode
  if (mode === 'write') {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-foreground">About You</Label>
          <Textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            placeholder="Tell others about yourself, what you're looking for, and what makes you unique..."
            className="min-h-[200px] bg-background-elevated border-border resize-none"
          />
          <p className="text-xs text-foreground-muted text-right">
            {aboutText.length} / 500
          </p>
        </div>

        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" onClick={() => setMode('select')}>
            Back
          </Button>
          <Button onClick={handleSaveAbout}>
            Complete Profile
          </Button>
        </div>
      </div>
    );
  }

  // AI Questions mode
  if (mode === 'ai-questions') {
    return (
      <div className="space-y-6">
        {generating ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-foreground-muted">Crafting your story...</p>
          </div>
        ) : (
          <>
            {/* Progress */}
            <div className="flex items-center gap-1">
              {aiQuestions.map((_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'h-1 flex-1 rounded-full transition-colors',
                    idx <= currentQuestionIndex
                      ? 'bg-primary'
                      : 'bg-background-elevated'
                  )}
                />
              ))}
            </div>

            {/* Question */}
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-foreground-muted">
                  Question {currentQuestionIndex + 1} of {aiQuestions.length}
                </p>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {currentQuestion.question}
                </h3>
              </div>

              <Textarea
                value={currentResponse}
                onChange={(e) => handleResponseChange(e.target.value)}
                onBlur={handleResponseBlur}
                placeholder="Your answer..."
                className="min-h-[120px] bg-background-elevated border-border resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Button variant="ghost" onClick={handlePrevQuestion}>
                Back
              </Button>
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex === aiQuestions.length - 1 ? 'Generate' : 'Next'}
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  // AI Preview mode
  if (mode === 'ai-preview') {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <Label className="text-foreground">Generated About</Label>
          </div>
          <p className="text-xs text-foreground-muted">
            Review and edit before saving. You have full control.
          </p>
        </div>

        <Textarea
          value={generatedAbout}
          onChange={(e) => setGeneratedAbout(e.target.value)}
          className="min-h-[200px] bg-background-elevated border-border resize-none"
        />

        <div className="flex items-center justify-between pt-4">
          <Button variant="ghost" onClick={() => setMode('ai-questions')}>
            Regenerate
          </Button>
          <Button onClick={handleApproveGenerated} className="gap-2">
            <Check className="w-4 h-4" />
            Approve & Complete
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default OnboardingStep4;
