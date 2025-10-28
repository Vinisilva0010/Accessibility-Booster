import { useState, useEffect, useCallback } from 'react'

export interface OnboardingStep {
  id: string
  title: string
  description: string
  target?: string // CSS selector for element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  action?: 'click' | 'scroll' | 'none'
  tooltip?: string
}

export interface OnboardingState {
  isCompleted: boolean
  currentStep: number
  isActive: boolean
  showTooltips: boolean
}

const STORAGE_KEY = 'onboarding-completed'
const STEPS_KEY = 'onboarding-current-step'

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Accessibility Booster! 🚀',
    description:
      'This interactive tour will guide you through the main features of our AI-powered accessibility tools.',
    position: 'center',
    action: 'none',
  },
  {
    id: 'summarizer',
    title: '📝 AI Summarizer',
    description:
      'Transform long texts into concise summaries. Perfect for articles, documents, or any lengthy content. Access it from the Tools menu.',
    target: '[data-tour="summarizer"]',
    position: 'right',
    action: 'click',
    tooltip: 'Try summarizing a news article or research paper!',
  },
  {
    id: 'prompt-box',
    title: '💬 Multimodal Prompt Box',
    description:
      'Interact with AI using text and images. Ask questions, analyze images, or get creative assistance.',
    target: '[data-tour="prompt-box"]',
    position: 'right',
    action: 'click',
    tooltip: 'Upload an image and ask AI to describe it!',
  },
  {
    id: 'translator',
    title: '🌐 AI Translator',
    description:
      'Translate text between multiple languages with high accuracy. Supports auto-detection and preserves formatting.',
    target: '[data-tour="translator"]',
    position: 'right',
    action: 'click',
    tooltip: 'Try translating a paragraph from Portuguese to English!',
  },
  {
    id: 'proofreader',
    title: '✏️ AI Proofreader',
    description:
      'Correct grammar, spelling, and style errors. Get detailed suggestions or automatic corrections.',
    target: '[data-tour="proofreader"]',
    position: 'right',
    action: 'click',
    tooltip: 'Paste a text with errors and see AI fix them!',
  },
  {
    id: 'writer-rewriter',
    title: '✍️ Writer & Rewriter',
    description:
      'Generate new content or improve existing text. Transform formats, adjust styles, and control creativity.',
    target: '[data-tour="writer-rewriter"]',
    position: 'right',
    action: 'click',
    tooltip: 'Try converting a paragraph into bullet points!',
  },
  {
    id: 'accessibility-settings',
    title: '♿ Accessibility Settings',
    description:
      'Customize the interface to meet your needs. Adjust font size, contrast, colors, and more.',
    target: '[data-tour="accessibility-settings"]',
    position: 'left',
    action: 'click',
    tooltip: 'Increase font size or enable high contrast!',
  },
  {
    id: 'completion',
    title: '🎉 Tour Complete!',
    description:
      'Explore all the features above! You can revisit this tour anytime from the Settings page.',
    position: 'center',
    action: 'none',
  },
]

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    isCompleted: false,
    currentStep: 0,
    isActive: false,
    showTooltips: true,
  })

  // Load onboarding state from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const completed = localStorage.getItem(STORAGE_KEY) === 'true'
      const currentStep = parseInt(localStorage.getItem(STEPS_KEY) || '0', 10)

      setState(prev => ({
        ...prev,
        isCompleted: completed,
        currentStep: Math.min(currentStep, ONBOARDING_STEPS.length - 1),
      }))
    } catch (error) {
      console.error('Error loading onboarding state:', error)
    }
  }, [])

  // Start onboarding
  const startOnboarding = useCallback(() => {
    setState(prev => ({
      ...prev,
      isActive: true,
      currentStep: 0,
    }))
    if (typeof window !== 'undefined') {
      localStorage.setItem(STEPS_KEY, '0')
    }
  }, [])

  // Complete onboarding
  const completeOnboarding = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCompleted: true,
      isActive: false,
      currentStep: 0,
    }))
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true')
      localStorage.setItem(STEPS_KEY, '0')
    }
  }, [])

  // Skip onboarding
  const skipOnboarding = useCallback(() => {
    completeOnboarding()
  }, [completeOnboarding])

  // Go to next step
  const nextStep = useCallback(() => {
    setState(prev => {
      const nextStepIndex = prev.currentStep + 1
      const newState = {
        ...prev,
        currentStep: nextStepIndex,
      }

      // Save current step
      if (typeof window !== 'undefined') {
        localStorage.setItem(STEPS_KEY, nextStepIndex.toString())
      }

      // Complete if at the end
      if (nextStepIndex >= ONBOARDING_STEPS.length) {
        completeOnboarding()
      }

      return newState
    })
  }, [completeOnboarding])

  // Go to previous step
  const prevStep = useCallback(() => {
    setState(prev => {
      const prevStepIndex = Math.max(0, prev.currentStep - 1)
      const newState = {
        ...prev,
        currentStep: prevStepIndex,
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(STEPS_KEY, prevStepIndex.toString())
      }
      return newState
    })
  }, [])

  // Go to specific step
  const goToStep = useCallback((stepIndex: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(
        0,
        Math.min(stepIndex, ONBOARDING_STEPS.length - 1)
      ),
    }))
    if (typeof window !== 'undefined') {
      localStorage.setItem(STEPS_KEY, stepIndex.toString())
    }
  }, [])

  // Toggle tooltips
  const toggleTooltips = useCallback(() => {
    setState(prev => ({
      ...prev,
      showTooltips: !prev.showTooltips,
    }))
  }, [])

  // Reset onboarding (for settings)
  const resetOnboarding = useCallback(() => {
    setState(prev => ({
      ...prev,
      isCompleted: false,
      currentStep: 0,
      isActive: false,
    }))
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(STEPS_KEY)
    }
  }, [])

  // Get current step
  const getCurrentStep = useCallback(() => {
    return ONBOARDING_STEPS[state.currentStep] || ONBOARDING_STEPS[0]
  }, [state.currentStep])

  // Check if step exists
  const hasStep = useCallback((stepId: string) => {
    return ONBOARDING_STEPS.some(step => step.id === stepId)
  }, [])

  // Get step by ID
  const getStepById = useCallback((stepId: string) => {
    return ONBOARDING_STEPS.find(step => step.id === stepId)
  }, [])

  return {
    state,
    steps: ONBOARDING_STEPS,
    startOnboarding,
    completeOnboarding,
    skipOnboarding,
    nextStep,
    prevStep,
    goToStep,
    toggleTooltips,
    resetOnboarding,
    getCurrentStep,
    hasStep,
    getStepById,
  }
}
