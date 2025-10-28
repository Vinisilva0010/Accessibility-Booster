import React, { useEffect, useRef } from 'react'
import { useOnboarding } from '@/hooks/useOnboarding'

interface OnboardingModalProps {
  className?: string
}

export function OnboardingModal({ className = '' }: OnboardingModalProps) {
  const {
    state,
    steps,
    nextStep,
    prevStep,
    skipOnboarding,
    completeOnboarding,
    getCurrentStep,
  } = useOnboarding()

  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const currentStep = getCurrentStep()
  const isFirstStep = state.currentStep === 0
  const isLastStep = state.currentStep === steps.length - 1
  const progress = ((state.currentStep + 1) / steps.length) * 100

  // Focus management
  useEffect(() => {
    if (state.isActive && modalRef.current) {
      modalRef.current.focus()
    }
  }, [state.isActive, state.currentStep])

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        skipOnboarding()
        break
      case 'ArrowRight':
      case 'Enter':
        if (isLastStep) {
          completeOnboarding()
        } else {
          nextStep()
        }
        break
      case 'ArrowLeft':
        if (!isFirstStep) {
          prevStep()
        }
        break
    }
  }

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      skipOnboarding()
    }
  }

  if (!state.isActive) {
    return null
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      aria-describedby="onboarding-description"
    >
      {/* Backdrop overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800 ${className}`}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {/* Progress bar */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>
              Step {state.currentStep + 1} of {steps.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          <h2
            id="onboarding-title"
            className="mb-3 text-xl font-bold text-gray-900 dark:text-white"
          >
            {currentStep.title}
          </h2>
          <p
            id="onboarding-description"
            className="text-gray-600 dark:text-gray-300"
          >
            {currentStep.description}
          </p>

          {/* Tooltip hint */}
          {currentStep.tooltip && (
            <div className="mt-3 rounded-md bg-blue-50 p-3 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 <strong>Tip:</strong> {currentStep.tooltip}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {/* Skip button */}
            <button
              onClick={skipOnboarding}
              className="rounded-md px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Skip onboarding tour"
            >
              Skip Tour
            </button>

            {/* Previous button */}
            {!isFirstStep && (
              <button
                onClick={prevStep}
                className="rounded-md px-4 py-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Go to previous step"
              >
                ← Previous
              </button>
            )}
          </div>

          <div className="flex gap-2">
            {/* Next/Complete button */}
            <button
              onClick={isLastStep ? completeOnboarding : nextStep}
              className="rounded-md bg-blue-600 px-6 py-2 text-sm text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
              aria-label={
                isLastStep ? 'Complete onboarding tour' : 'Go to next step'
              }
            >
              {isLastStep ? 'Complete Tour' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          <p>
            💡 <strong>Keyboard shortcuts:</strong>
          </p>
          <p>
            • <kbd className="rounded bg-gray-100 px-1 dark:bg-gray-700">←</kbd>{' '}
            <kbd className="rounded bg-gray-100 px-1 dark:bg-gray-700">→</kbd>{' '}
            Navigate •{' '}
            <kbd className="rounded bg-gray-100 px-1 dark:bg-gray-700">
              Enter
            </kbd>{' '}
            Next •{' '}
            <kbd className="rounded bg-gray-100 px-1 dark:bg-gray-700">Esc</kbd>{' '}
            Skip
          </p>
        </div>
      </div>
    </div>
  )
}

