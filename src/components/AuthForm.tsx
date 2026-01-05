import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft, Loader2 } from 'lucide-react';

const emailSchema = z.string().trim().email({ message: 'Please enter a valid email address' });

type Step = 'email' | 'otp';

interface AuthFormProps {
  onSuccess: () => void;
}

export const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendDisabled, setResendDisabled] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: result.data,
      });

      if (error) {
        if (error.message.includes('rate limit')) {
          setError('Too many requests. Please wait a moment before trying again.');
        } else {
          setError(error.message);
        }
        return;
      }

      setStep('otp');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = async (value: string) => {
    setOtp(value);
    setError(null);

    if (value.length === 6) {
      setLoading(true);
      try {
        const { error } = await supabase.auth.verifyOtp({
          email,
          token: value,
          type: 'email',
        });

        if (error) {
          if (error.message.includes('expired')) {
            setError('Code expired. Please request a new one.');
          } else if (error.message.includes('invalid')) {
            setError('Invalid code. Please check and try again.');
          } else {
            setError(error.message);
          }
          setOtp('');
          return;
        }

        onSuccess();
      } catch {
        setError('Something went wrong. Please try again.');
        setOtp('');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setError(null);
    setResendDisabled(true);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
      });

      if (error) {
        setError(error.message);
      }
    } catch {
      setError('Failed to resend code.');
    } finally {
      setLoading(false);
      // Re-enable resend after 30 seconds
      setTimeout(() => setResendDisabled(false), 30000);
    }
  };

  const handleBack = () => {
    setStep('email');
    setOtp('');
    setError(null);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {step === 'email' ? (
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Request access
            </h1>
            <p className="text-foreground-secondary text-sm">
              Enter your email to continue.
            </p>
          </div>

          <div className="space-y-2">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              disabled={loading}
              className="h-12 bg-background-elevated border-border text-foreground placeholder:text-foreground-muted"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="accent"
            className="w-full h-12"
            disabled={loading || !email}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif font-semibold text-foreground mb-2">
              Enter verification code
            </h1>
            <p className="text-foreground-secondary text-sm">
              We sent a 6-digit code to{' '}
              <span className="text-foreground">{email}</span>
            </p>
          </div>

          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              disabled={loading}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} className="bg-background-elevated border-border text-foreground" />
                <InputOTPSlot index={1} className="bg-background-elevated border-border text-foreground" />
                <InputOTPSlot index={2} className="bg-background-elevated border-border text-foreground" />
                <InputOTPSlot index={3} className="bg-background-elevated border-border text-foreground" />
                <InputOTPSlot index={4} className="bg-background-elevated border-border text-foreground" />
                <InputOTPSlot index={5} className="bg-background-elevated border-border text-foreground" />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          {loading && (
            <div className="flex justify-center">
              <Loader2 className="w-5 h-5 animate-spin text-foreground-muted" />
            </div>
          )}

          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={resendDisabled || loading}
              className="text-sm text-foreground-secondary hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resendDisabled ? 'Code sent. Wait 30s to resend.' : "Didn't receive it? Resend code"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
