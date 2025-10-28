import React, { useState, useEffect } from 'react'
import {
  useAccessibilitySettings,
  AccessibilitySettings as AccessibilitySettingsType,
} from '@/hooks/useAccessibilitySettings'

interface AccessibilitySettingsProps {
  className?: string
}

export function AccessibilitySettings({
  className = '',
}: AccessibilitySettingsProps) {
  const {
    settings,
    isLoaded,
    showSaveMessage,
    updateSetting,
    resetToDefault,
    getSetting,
    isEnabled,
  } = useAccessibilitySettings()

  const [customColors, setCustomColors] = useState({
    primary: '#3B82F6',
    secondary: '#6366F1',
    background: '#FFFFFF',
    text: '#1F2937',
  })

  // Update custom colors when settings change
  useEffect(() => {
    if (settings.customColors) {
      setCustomColors(settings.customColors)
    }
  }, [settings.customColors])

  const handleFontSizeChange = (value: number) => {
    updateSetting('fontSize', value)
  }

  const handleContrastChange = (value: 'normal' | 'high') => {
    updateSetting('contrast', value)
  }

  const handleColorSchemeChange = (
    value: AccessibilitySettingsType['colorScheme']
  ) => {
    updateSetting('colorScheme', value)
  }

  const handleCustomColorChange = (
    colorType: keyof typeof customColors,
    value: string
  ) => {
    const newCustomColors = { ...customColors, [colorType]: value }
    setCustomColors(newCustomColors)
    updateSetting('customColors', newCustomColors)
  }

  const handleSpacingChange = (value: 'normal' | 'extra') => {
    updateSetting('spacing', value)
  }

  const handleFontFamilyChange = (value: 'regular' | 'dyslexia-friendly') => {
    updateSetting('fontFamily', value)
  }

  const handleToggleSetting = (key: keyof AccessibilitySettingsType) => {
    const currentValue = getSetting(key)
    if (typeof currentValue === 'boolean') {
      updateSetting(key, !currentValue as any)
    }
  }

  const colorSchemes = [
    {
      value: 'default',
      label: 'Default',
      description: 'Standard application colors',
    },
    {
      value: 'blue',
      label: 'Blue Theme',
      description: 'Calming blue color scheme',
    },
    {
      value: 'green',
      label: 'Green Theme',
      description: 'Nature-inspired green colors',
    },
    {
      value: 'purple',
      label: 'Purple Theme',
      description: 'Creative purple color palette',
    },
    {
      value: 'orange',
      label: 'Orange Theme',
      description: 'Energetic orange colors',
    },
    {
      value: 'custom',
      label: 'Custom Colors',
      description: 'Define your own color palette',
    },
  ]

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
        <span className="ml-2 text-gray-600">
          Loading accessibility settings...
        </span>
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Accessibility Settings
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Customize the interface to meet your accessibility needs. All changes
          are saved automatically.
        </p>
      </div>

      {/* Save Message */}
      {showSaveMessage && (
        <div className="rounded-md border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 text-green-600 dark:text-green-400">✅</div>
            <p className="font-medium text-green-800 dark:text-green-200">
              Settings saved successfully!
            </p>
          </div>
        </div>
      )}

      {/* Font Size */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          📏 Font Size
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="font-size"
              className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Text Size: {Math.round(getSetting('fontSize') * 100)}%
            </label>
            <input
              id="font-size"
              type="range"
              min="0.8"
              max="2.0"
              step="0.1"
              value={getSetting('fontSize')}
              onChange={e => handleFontSizeChange(Number(e.target.value))}
              className="w-full"
              aria-describedby="font-size-help"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Small (80%)</span>
              <span>Large (200%)</span>
            </div>
            <div
              id="font-size-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Adjust text size for better readability. Changes apply
              immediately.
            </div>
          </div>
        </div>
      </div>

      {/* Contrast */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          🎨 Contrast
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contrast Level
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contrast"
                  value="normal"
                  checked={getSetting('contrast') === 'normal'}
                  onChange={e =>
                    handleContrastChange(e.target.value as 'normal' | 'high')
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                  aria-describedby="contrast-help"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Normal Contrast
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contrast"
                  value="high"
                  checked={getSetting('contrast') === 'high'}
                  onChange={e =>
                    handleContrastChange(e.target.value as 'normal' | 'high')
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  High Contrast
                </span>
              </label>
            </div>
            <div
              id="contrast-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              High contrast mode increases color differences for better
              visibility.
            </div>
          </div>
        </div>
      </div>

      {/* Color Scheme */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          🌈 Color Scheme
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Color Theme
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {colorSchemes.map(scheme => (
                <label
                  key={scheme.value}
                  className={`flex cursor-pointer items-center rounded-md border p-3 transition-colors ${
                    getSetting('colorScheme') === scheme.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-300 hover:border-gray-400 dark:border-gray-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="colorScheme"
                    value={scheme.value}
                    checked={getSetting('colorScheme') === scheme.value}
                    onChange={e =>
                      handleColorSchemeChange(
                        e.target
                          .value as AccessibilitySettingsType['colorScheme']
                      )
                    }
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {scheme.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {scheme.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          {getSetting('colorScheme') === 'custom' && (
            <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700">
              <h4 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Custom Color Palette
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="custom-primary"
                    className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
                  >
                    Primary Color
                  </label>
                  <input
                    id="custom-primary"
                    type="color"
                    value={customColors.primary}
                    onChange={e =>
                      handleCustomColorChange('primary', e.target.value)
                    }
                    className="h-8 w-full rounded border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="custom-secondary"
                    className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
                  >
                    Secondary Color
                  </label>
                  <input
                    id="custom-secondary"
                    type="color"
                    value={customColors.secondary}
                    onChange={e =>
                      handleCustomColorChange('secondary', e.target.value)
                    }
                    className="h-8 w-full rounded border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="custom-background"
                    className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
                  >
                    Background Color
                  </label>
                  <input
                    id="custom-background"
                    type="color"
                    value={customColors.background}
                    onChange={e =>
                      handleCustomColorChange('background', e.target.value)
                    }
                    className="h-8 w-full rounded border border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="custom-text"
                    className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300"
                  >
                    Text Color
                  </label>
                  <input
                    id="custom-text"
                    type="color"
                    value={customColors.text}
                    onChange={e =>
                      handleCustomColorChange('text', e.target.value)
                    }
                    className="h-8 w-full rounded border border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Spacing */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          📐 Spacing
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Element Spacing
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="spacing"
                  value="normal"
                  checked={getSetting('spacing') === 'normal'}
                  onChange={e =>
                    handleSpacingChange(e.target.value as 'normal' | 'extra')
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                  aria-describedby="spacing-help"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Normal Spacing
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="spacing"
                  value="extra"
                  checked={getSetting('spacing') === 'extra'}
                  onChange={e =>
                    handleSpacingChange(e.target.value as 'normal' | 'extra')
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Extra Spacing
                </span>
              </label>
            </div>
            <div
              id="spacing-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Extra spacing increases padding and margins for easier navigation.
            </div>
          </div>
        </div>
      </div>

      {/* Font Family */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          🔤 Font Family
        </h3>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Font Type
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fontFamily"
                  value="regular"
                  checked={getSetting('fontFamily') === 'regular'}
                  onChange={e =>
                    handleFontFamilyChange(
                      e.target.value as 'regular' | 'dyslexia-friendly'
                    )
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                  aria-describedby="font-family-help"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Regular Font
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="fontFamily"
                  value="dyslexia-friendly"
                  checked={getSetting('fontFamily') === 'dyslexia-friendly'}
                  onChange={e =>
                    handleFontFamilyChange(
                      e.target.value as 'regular' | 'dyslexia-friendly'
                    )
                  }
                  className="mr-3 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Dyslexia-Friendly Font
                </span>
              </label>
            </div>
            <div
              id="font-family-help"
              className="mt-1 text-xs text-gray-500 dark:text-gray-400"
            >
              Dyslexia-friendly fonts are designed to improve readability for
              users with dyslexia.
            </div>
          </div>
        </div>
      </div>

      {/* Toggle Settings */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          ⚙️ Additional Options
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Dark Mode
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Switch between light and dark themes
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isEnabled('darkMode')
                  ? 'bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-label={`${isEnabled('darkMode') ? 'Disable' : 'Enable'} dark mode`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled('darkMode') ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Keyboard Navigation
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enhanced keyboard navigation support
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting('keyboardNavigation')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isEnabled('keyboardNavigation')
                  ? 'bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-label={`${isEnabled('keyboardNavigation') ? 'Disable' : 'Enable'} keyboard navigation`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled('keyboardNavigation')
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Reduced Motion
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Minimize animations and transitions
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting('reducedMotion')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isEnabled('reducedMotion')
                  ? 'bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-label={`${isEnabled('reducedMotion') ? 'Disable' : 'Enable'} reduced motion`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled('reducedMotion') ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Screen Reader Optimization
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Enhanced screen reader support
              </p>
            </div>
            <button
              onClick={() => handleToggleSetting('screenReaderOptimized')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isEnabled('screenReaderOptimized')
                  ? 'bg-blue-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              aria-label={`${isEnabled('screenReaderOptimized') ? 'Disable' : 'Enable'} screen reader optimization`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isEnabled('screenReaderOptimized')
                    ? 'translate-x-6'
                    : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Reset Settings
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Restore all accessibility settings to their default values
            </p>
          </div>
          <button
            onClick={resetToDefault}
            className="rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
            aria-label="Reset all accessibility settings to default"
          >
            Reset to Default
          </button>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="rounded-md border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
        <h4 className="mb-2 font-medium text-yellow-800 dark:text-yellow-200">
          💡 Accessibility Tips:
        </h4>
        <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
          <li>
            • <strong>Font Size:</strong> Increase text size for better
            readability
          </li>
          <li>
            • <strong>High Contrast:</strong> Improves visibility for users with
            visual impairments
          </li>
          <li>
            • <strong>Color Schemes:</strong> Choose colors that work best for
            your needs
          </li>
          <li>
            • <strong>Extra Spacing:</strong> Makes interface elements easier to
            click and navigate
          </li>
          <li>
            • <strong>Dyslexia-Friendly Font:</strong> Designed to improve
            reading for users with dyslexia
          </li>
          <li>
            • <strong>Reduced Motion:</strong> Minimizes animations for users
            sensitive to motion
          </li>
        </ul>
      </div>
    </div>
  )
}
