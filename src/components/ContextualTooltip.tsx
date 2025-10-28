import React, { useState, useRef, useEffect } from 'react'

interface ContextualTooltipProps {
  content: string
  title?: string
  examples?: string[]
  tips?: string[]
  position?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
  children: React.ReactNode
}

export function ContextualTooltip({
  content,
  title,
  examples = [],
  tips = [],
  position = 'top',
  className = '',
  children,
}: ContextualTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Calculate tooltip position
  useEffect(() => {
    if (
      isVisible &&
      triggerRef.current &&
      tooltipRef.current &&
      typeof window !== 'undefined'
    ) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = 0
      let left = 0

      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8
          left =
            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          break
        case 'bottom':
          top = triggerRect.bottom + 8
          left =
            triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
          break
        case 'left':
          top =
            triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          left = triggerRect.left - tooltipRect.width - 8
          break
        case 'right':
          top =
            triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
          left = triggerRect.right + 8
          break
      }

      // Adjust for viewport boundaries
      if (left < 8) left = 8
      if (left + tooltipRect.width > viewportWidth - 8) {
        left = viewportWidth - tooltipRect.width - 8
      }
      if (top < 8) top = 8
      if (top + tooltipRect.height > viewportHeight - 8) {
        top = viewportHeight - tooltipRect.height - 8
      }

      setTooltipPosition({ top, left })
    }
  }, [isVisible, position])

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsVisible(!isVisible)
    } else if (e.key === 'Escape') {
      setIsVisible(false)
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false)
      }
    }

    if (isVisible && typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isVisible])

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger */}
      <div
        ref={triggerRef}
        className="inline-block"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label="Show help tooltip"
        aria-expanded={isVisible}
        aria-describedby={isVisible ? 'tooltip-content' : undefined}
      >
        {children}
      </div>

      {/* Tooltip */}
      {isVisible && (
        <div
          ref={tooltipRef}
          id="tooltip-content"
          className="fixed z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
          role="tooltip"
        >
          {/* Arrow */}
          <div
            className={`absolute h-0 w-0 border-4 ${
              position === 'top'
                ? 'bottom-[-8px] left-1/2 -translate-x-1/2 border-b-transparent border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800'
                : position === 'bottom'
                  ? 'left-1/2 top-[-8px] -translate-x-1/2 border-b-white border-l-transparent border-r-transparent border-t-transparent dark:border-b-gray-800'
                  : position === 'left'
                    ? 'right-[-8px] top-1/2 -translate-y-1/2 border-b-transparent border-l-white border-r-transparent border-t-transparent dark:border-l-gray-800'
                    : 'left-[-8px] top-1/2 -translate-y-1/2 border-b-transparent border-l-transparent border-r-white border-t-transparent dark:border-r-gray-800'
            }`}
          />

          {/* Content */}
          <div className="space-y-3">
            {/* Title */}
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            )}

            {/* Main content */}
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {content}
            </p>

            {/* Examples */}
            {examples.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                  💡 Examples:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {examples.map((example, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-blue-600 dark:text-blue-400">
                        •
                      </span>
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tips */}
            {tips.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                  🎯 Tips:
                </h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2 text-green-600 dark:text-green-400">
                        ✓
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Close hint */}
            <div className="pt-2 text-xs text-gray-500 dark:text-gray-400">
              Press{' '}
              <kbd className="rounded bg-gray-100 px-1 dark:bg-gray-700">
                Esc
              </kbd>{' '}
              to close
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Predefined tooltip content for different tools
export const TOOLTIP_CONTENT = {
  summarizer: {
    title: 'AI Summarizer',
    content:
      'Transform long texts into concise summaries using advanced AI. Perfect for articles, documents, or any lengthy content.',
    examples: [
      'Summarize a news article',
      'Create bullet points from a research paper',
      'Extract key points from meeting notes',
    ],
    tips: [
      'Use "Brief" style for quick overviews',
      'Try "Detailed" for comprehensive summaries',
      'Adjust creativity level for different tones',
    ],
  },
  promptBox: {
    title: 'Multimodal Prompt Box',
    content:
      'Interact with AI using text and images. Ask questions, analyze images, or get creative assistance.',
    examples: [
      'Upload an image and ask AI to describe it',
      'Ask "Explain quantum computing in simple terms"',
      'Request creative writing prompts',
    ],
    tips: [
      'Combine text and images for complex analysis',
      'Use Ctrl+Enter for quick submission',
      'Adjust temperature for creativity control',
    ],
  },
  translator: {
    title: 'AI Translator',
    content:
      'Translate text between multiple languages with high accuracy. Supports auto-detection and preserves formatting.',
    examples: [
      'Translate Portuguese to English',
      'Convert Spanish text to French',
      'Auto-detect language and translate',
    ],
    tips: [
      'Enable auto-detect for faster workflow',
      'Preserve formatting for structured text',
      'Adjust translation style for different needs',
    ],
  },
  proofreader: {
    title: 'AI Proofreader',
    content:
      'Correct grammar, spelling, and style errors. Get detailed suggestions or automatic corrections.',
    examples: [
      'Fix grammar errors in an email',
      'Correct spelling mistakes in a document',
      'Improve writing style and clarity',
    ],
    tips: [
      'Enable auto-correct for quick fixes',
      'Use suggestions mode to learn',
      'Adjust strictness for different contexts',
    ],
  },
  writerRewriter: {
    title: 'Writer & Rewriter',
    content:
      'Generate new content or improve existing text. Transform formats, adjust styles, and control creativity.',
    examples: [
      'Convert paragraph to bullet points',
      'Rewrite text in professional tone',
      'Create new content from a topic',
    ],
    tips: [
      'Try different transformation types',
      'Adjust creativity for desired output',
      'Control length for specific needs',
    ],
  },
  accessibilitySettings: {
    title: 'Accessibility Settings',
    content:
      'Customize the interface to meet your accessibility needs. Adjust font size, contrast, colors, and more.',
    examples: [
      'Increase font size for better readability',
      'Enable high contrast mode',
      'Choose dyslexia-friendly fonts',
    ],
    tips: [
      'All changes are saved automatically',
      'Settings apply immediately',
      'Reset to defaults anytime',
    ],
  },
}
