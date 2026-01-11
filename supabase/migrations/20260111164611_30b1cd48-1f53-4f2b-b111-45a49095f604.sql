-- Add onboarding and profile fields to profiles table
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS role text CHECK (role IN ('dominant', 'submissive', 'switch', 'undeclared')),
ADD COLUMN IF NOT EXISTS location text,
ADD COLUMN IF NOT EXISTS location_public boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS age integer CHECK (age >= 18 AND age <= 120),
ADD COLUMN IF NOT EXISTS age_public boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS about text,
ADD COLUMN IF NOT EXISTS onboarding_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS onboarding_step integer DEFAULT 1,
ADD COLUMN IF NOT EXISTS onboarding_skipped_at timestamp with time zone;

-- Create table for user interests (kinks/fetishes)
CREATE TABLE public.user_interests (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tag text NOT NULL,
  is_custom boolean DEFAULT false,
  is_public boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(user_id, tag)
);

-- Create table for user limits
CREATE TABLE public.user_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  limit_type text NOT NULL CHECK (limit_type IN ('soft', 'hard')),
  content text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create table for AI questionnaire responses
CREATE TABLE public.onboarding_questionnaire (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  responses jsonb DEFAULT '{}',
  generated_about text,
  approved boolean DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.onboarding_questionnaire ENABLE ROW LEVEL SECURITY;

-- RLS policies for user_interests
CREATE POLICY "Users can view their own interests"
ON public.user_interests FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can view public interests"
ON public.user_interests FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can insert their own interests"
ON public.user_interests FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own interests"
ON public.user_interests FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interests"
ON public.user_interests FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for user_limits
CREATE POLICY "Users can view their own limits"
ON public.user_limits FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own limits"
ON public.user_limits FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own limits"
ON public.user_limits FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own limits"
ON public.user_limits FOR DELETE
USING (auth.uid() = user_id);

-- RLS policies for onboarding_questionnaire
CREATE POLICY "Users can view their own questionnaire"
ON public.onboarding_questionnaire FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own questionnaire"
ON public.onboarding_questionnaire FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own questionnaire"
ON public.onboarding_questionnaire FOR UPDATE
USING (auth.uid() = user_id);

-- Trigger for updated_at on questionnaire
CREATE TRIGGER update_onboarding_questionnaire_updated_at
BEFORE UPDATE ON public.onboarding_questionnaire
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();