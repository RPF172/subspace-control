import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface OnboardingData {
  // Step 1
  avatar_url: string | null;
  avatar_skipped: boolean;
  // Step 2
  display_name: string | null;
  role: 'dominant' | 'submissive' | 'switch' | 'undeclared' | null;
  location: string | null;
  location_public: boolean;
  age: number | null;
  age_public: boolean;
  // Step 3
  interests: Interest[];
  soft_limits: string[];
  hard_limits: string[];
  interests_public: boolean;
  // Step 4
  about: string | null;
  questionnaire_responses: Record<string, string>;
  generated_about: string | null;
  // Meta
  onboarding_step: number;
  onboarding_completed: boolean;
}

export interface Interest {
  id?: string;
  tag: string;
  is_custom: boolean;
  is_public: boolean;
}

const SUGGESTED_INTERESTS = [
  'Bondage', 'Dominance', 'Submission', 'Roleplay', 'Sensory Play',
  'Impact Play', 'Rope', 'Leather', 'Service', 'Protocol',
  'Pet Play', 'Praise', 'Degradation', 'Exhibitionism', 'Voyeurism',
  'Wax Play', 'Edge Play', 'Aftercare', 'Power Exchange', 'Discipline'
];

const AI_QUESTIONS = [
  { id: 'identity', question: "How would you describe yourself in the community?" },
  { id: 'experience', question: "What's your experience level? (New, exploring, experienced)" },
  { id: 'seeking', question: "What are you looking for on SubSpace?" },
  { id: 'style', question: "How would you describe your communication style?" },
  { id: 'values', question: "What values are most important to you in connections?" },
  { id: 'interests', question: "What draws you to this lifestyle?" },
  { id: 'boundaries', question: "How do you approach boundaries and consent?" },
];

export const useOnboarding = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    avatar_url: null,
    avatar_skipped: false,
    display_name: null,
    role: null,
    location: null,
    location_public: false,
    age: null,
    age_public: false,
    interests: [],
    soft_limits: [],
    hard_limits: [],
    interests_public: false,
    about: null,
    questionnaire_responses: {},
    generated_about: null,
    onboarding_step: 1,
    onboarding_completed: false,
  });

  // Fetch onboarding state on mount
  useEffect(() => {
    if (user) {
      fetchOnboardingState();
    }
  }, [user]);

  const fetchOnboardingState = async () => {
    if (!user) return;
    setLoading(true);

    try {
      // Fetch profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      // Fetch interests
      const { data: interests, error: interestsError } = await supabase
        .from('user_interests')
        .select('*')
        .eq('user_id', user.id);

      if (interestsError) throw interestsError;

      // Fetch limits
      const { data: limits, error: limitsError } = await supabase
        .from('user_limits')
        .select('*')
        .eq('user_id', user.id);

      if (limitsError) throw limitsError;

      // Fetch questionnaire
      const { data: questionnaire } = await supabase
        .from('onboarding_questionnaire')
        .select('*')
        .eq('user_id', user.id)
        .single();

      const softLimits = limits?.filter(l => l.limit_type === 'soft').map(l => l.content) || [];
      const hardLimits = limits?.filter(l => l.limit_type === 'hard').map(l => l.content) || [];

      setData({
        avatar_url: profile.avatar_url,
        avatar_skipped: !profile.avatar_url && (profile.onboarding_step || 1) > 1,
        display_name: profile.display_name,
        role: profile.role as OnboardingData['role'],
        location: profile.location,
        location_public: profile.location_public || false,
        age: profile.age,
        age_public: profile.age_public || false,
        interests: interests?.map(i => ({
          id: i.id,
          tag: i.tag,
          is_custom: i.is_custom || false,
          is_public: i.is_public || false,
        })) || [],
        soft_limits: softLimits,
        hard_limits: hardLimits,
        interests_public: interests?.some(i => i.is_public) || false,
        about: profile.about,
        questionnaire_responses: (questionnaire?.responses as Record<string, string>) || {},
        generated_about: questionnaire?.generated_about || null,
        onboarding_step: profile.onboarding_step || 1,
        onboarding_completed: profile.onboarding_completed || false,
      });

      setCurrentStep(profile.onboarding_step || 1);

      // Show modal if not completed
      if (!profile.onboarding_completed) {
        setShowModal(true);
        setShowReminder(true);
      }
    } catch (error: any) {
      console.error('Error fetching onboarding state:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Autosave profile fields
  const saveProfileField = useCallback(async (field: string, value: any) => {
    if (!user) return;
    setSaving(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ [field]: value })
        .eq('id', user.id);

      if (error) throw error;
      setData(prev => ({ ...prev, [field]: value }));
    } catch (error: any) {
      console.error('Error saving field:', error.message);
      toast({
        title: "Error saving",
        description: "Your changes couldn't be saved. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [user, toast]);

  // Save multiple profile fields
  const saveProfileFields = useCallback(async (fields: Partial<OnboardingData>) => {
    if (!user) return;
    setSaving(true);

    try {
      const profileFields: Record<string, any> = {};
      const validProfileFields = ['display_name', 'role', 'location', 'location_public', 'age', 'age_public', 'about', 'onboarding_step', 'onboarding_completed'];
      
      for (const [key, value] of Object.entries(fields)) {
        if (validProfileFields.includes(key)) {
          profileFields[key] = value;
        }
      }

      if (Object.keys(profileFields).length > 0) {
        const { error } = await supabase
          .from('profiles')
          .update(profileFields)
          .eq('id', user.id);

        if (error) throw error;
      }

      setData(prev => ({ ...prev, ...fields }));
    } catch (error: any) {
      console.error('Error saving fields:', error.message);
      toast({
        title: "Error saving",
        description: "Your changes couldn't be saved. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  }, [user, toast]);

  // Add interest
  const addInterest = useCallback(async (tag: string, isCustom: boolean = false) => {
    if (!user) return;

    try {
      const { data: newInterest, error } = await supabase
        .from('user_interests')
        .insert({
          user_id: user.id,
          tag,
          is_custom: isCustom,
          is_public: data.interests_public,
        })
        .select()
        .single();

      if (error) throw error;

      setData(prev => ({
        ...prev,
        interests: [...prev.interests, {
          id: newInterest.id,
          tag: newInterest.tag,
          is_custom: newInterest.is_custom || false,
          is_public: newInterest.is_public || false,
        }],
      }));
    } catch (error: any) {
      if (error.code !== '23505') { // Ignore duplicate key errors
        console.error('Error adding interest:', error.message);
      }
    }
  }, [user, data.interests_public]);

  // Remove interest
  const removeInterest = useCallback(async (tag: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_interests')
        .delete()
        .eq('user_id', user.id)
        .eq('tag', tag);

      if (error) throw error;

      setData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i.tag !== tag),
      }));
    } catch (error: any) {
      console.error('Error removing interest:', error.message);
    }
  }, [user]);

  // Toggle interests public
  const setInterestsPublic = useCallback(async (isPublic: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_interests')
        .update({ is_public: isPublic })
        .eq('user_id', user.id);

      if (error) throw error;

      setData(prev => ({
        ...prev,
        interests_public: isPublic,
        interests: prev.interests.map(i => ({ ...i, is_public: isPublic })),
      }));
    } catch (error: any) {
      console.error('Error updating interests privacy:', error.message);
    }
  }, [user]);

  // Add limit
  const addLimit = useCallback(async (content: string, type: 'soft' | 'hard') => {
    if (!user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('user_limits')
        .insert({
          user_id: user.id,
          limit_type: type,
          content: content.trim(),
        });

      if (error) throw error;

      setData(prev => ({
        ...prev,
        [type === 'soft' ? 'soft_limits' : 'hard_limits']: [
          ...prev[type === 'soft' ? 'soft_limits' : 'hard_limits'],
          content.trim(),
        ],
      }));
    } catch (error: any) {
      console.error('Error adding limit:', error.message);
    }
  }, [user]);

  // Remove limit
  const removeLimit = useCallback(async (content: string, type: 'soft' | 'hard') => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_limits')
        .delete()
        .eq('user_id', user.id)
        .eq('limit_type', type)
        .eq('content', content);

      if (error) throw error;

      setData(prev => ({
        ...prev,
        [type === 'soft' ? 'soft_limits' : 'hard_limits']: prev[type === 'soft' ? 'soft_limits' : 'hard_limits'].filter(l => l !== content),
      }));
    } catch (error: any) {
      console.error('Error removing limit:', error.message);
    }
  }, [user]);

  // Save questionnaire response
  const saveQuestionnaireResponse = useCallback(async (questionId: string, response: string) => {
    if (!user) return;

    const newResponses = { ...data.questionnaire_responses, [questionId]: response };

    try {
      const { error } = await supabase
        .from('onboarding_questionnaire')
        .upsert({
          user_id: user.id,
          responses: newResponses,
        }, { onConflict: 'user_id' });

      if (error) throw error;

      setData(prev => ({
        ...prev,
        questionnaire_responses: newResponses,
      }));
    } catch (error: any) {
      console.error('Error saving questionnaire response:', error.message);
    }
  }, [user, data.questionnaire_responses]);

  // Save generated about
  const saveGeneratedAbout = useCallback(async (generatedText: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('onboarding_questionnaire')
        .upsert({
          user_id: user.id,
          generated_about: generatedText,
          responses: data.questionnaire_responses,
        }, { onConflict: 'user_id' });

      if (error) throw error;

      setData(prev => ({
        ...prev,
        generated_about: generatedText,
      }));
    } catch (error: any) {
      console.error('Error saving generated about:', error.message);
    }
  }, [user, data.questionnaire_responses]);

  // Approve and save about
  const approveAbout = useCallback(async (aboutText: string) => {
    if (!user) return;

    try {
      // Update profile with about text
      await supabase
        .from('profiles')
        .update({ about: aboutText })
        .eq('id', user.id);

      // Mark questionnaire as approved
      await supabase
        .from('onboarding_questionnaire')
        .update({ approved: true })
        .eq('user_id', user.id);

      setData(prev => ({
        ...prev,
        about: aboutText,
      }));
    } catch (error: any) {
      console.error('Error approving about:', error.message);
    }
  }, [user]);

  // Go to next step
  const nextStep = useCallback(async () => {
    const next = Math.min(currentStep + 1, 4);
    setCurrentStep(next);
    await saveProfileField('onboarding_step', next);
  }, [currentStep, saveProfileField]);

  // Go to previous step
  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  }, []);

  // Go to specific step
  const goToStep = useCallback((step: number) => {
    setCurrentStep(Math.min(Math.max(step, 1), 4));
  }, []);

  // Skip onboarding (dismiss modal but show reminder)
  const skipOnboarding = useCallback(async () => {
    if (!user) return;

    try {
      await supabase
        .from('profiles')
        .update({ onboarding_skipped_at: new Date().toISOString() })
        .eq('id', user.id);

      setShowModal(false);
      setShowReminder(true);
    } catch (error: any) {
      console.error('Error skipping onboarding:', error.message);
    }
  }, [user]);

  // Complete onboarding
  const completeOnboarding = useCallback(async () => {
    if (!user) return;

    try {
      await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          onboarding_step: 4,
        })
        .eq('id', user.id);

      setData(prev => ({ ...prev, onboarding_completed: true }));
      setShowModal(false);
      setShowReminder(false);

      toast({
        title: "Profile complete!",
        description: "Your profile is ready. Welcome to SubSpace.",
      });
    } catch (error: any) {
      console.error('Error completing onboarding:', error.message);
    }
  }, [user, toast]);

  // Reopen onboarding modal
  const reopenOnboarding = useCallback(() => {
    setShowModal(true);
  }, []);

  return {
    loading,
    saving,
    showModal,
    showReminder,
    currentStep,
    data,
    suggestedInterests: SUGGESTED_INTERESTS,
    aiQuestions: AI_QUESTIONS,
    setShowModal,
    saveProfileField,
    saveProfileFields,
    addInterest,
    removeInterest,
    setInterestsPublic,
    addLimit,
    removeLimit,
    saveQuestionnaireResponse,
    saveGeneratedAbout,
    approveAbout,
    nextStep,
    prevStep,
    goToStep,
    skipOnboarding,
    completeOnboarding,
    reopenOnboarding,
    refetch: fetchOnboardingState,
  };
};
