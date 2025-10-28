import { useState, useEffect, useCallback } from 'react'

export interface AccessibilitySettings {
  fontSize: number // 0.8 to 2.0 (80% to 200%)
  contrast: 'normal' | 'high'
  colorScheme: 'default' | 'custom' | 'blue' | 'green' | 'purple' | 'orange'
  customColors?: {
    primary: string
    secondary: string
    background: string
    text: string
  }
  spacing: 'normal' | 'extra'
  fontFamily: 'regular' | 'dyslexia-friendly'
  darkMode: boolean
  keyboardNavigation: boolean
  reducedMotion: boolean
  screenReaderOptimized: boolean
}

const DEFAULT_SETTINGS: AccessibilitySettings = {
  fontSize: 1.0,
  contrast: 'normal',
  colorScheme: 'default',
  spacing: 'normal',
  fontFamily: 'regular',
  darkMode: false,
  keyboardNavigation: true,
  reducedMotion: false,
  screenReaderOptimized: false,
}

const STORAGE_KEY = 'accessibility-settings'

export function useAccessibilitySettings() {
  const [settings, setSettings] =
    useState<AccessibilitySettings>(DEFAULT_SETTINGS)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSaveMessage, setShowSaveMessage] = useState(false)

  // Apply settings to document
  const applySettingsToDocument = useCallback(
    (settings: AccessibilitySettings) => {
      if (typeof document === 'undefined') return

      const root = document.documentElement

      // Font size
      root.style.setProperty(
        '--accessibility-font-size',
        `${settings.fontSize}rem`
      )

      // Contrast
      if (settings.contrast === 'high') {
        root.classList.add('high-contrast')
      } else {
        root.classList.remove('high-contrast')
      }

      // Color scheme
      root.classList.remove(
        'color-scheme-blue',
        'color-scheme-green',
        'color-scheme-purple',
        'color-scheme-orange'
      )
      if (
        settings.colorScheme !== 'default' &&
        settings.colorScheme !== 'custom'
      ) {
        root.classList.add(`color-scheme-${settings.colorScheme}`)
      }

      // Custom colors
      if (settings.colorScheme === 'custom' && settings.customColors) {
        root.style.setProperty(
          '--custom-primary',
          settings.customColors.primary
        )
        root.style.setProperty(
          '--custom-secondary',
          settings.customColors.secondary
        )
        root.style.setProperty(
          '--custom-background',
          settings.customColors.background
        )
        root.style.setProperty('--custom-text', settings.customColors.text)
      }

      // Spacing
      if (settings.spacing === 'extra') {
        root.classList.add('extra-spacing')
      } else {
        root.classList.remove('extra-spacing')
      }

      // Font family
      if (settings.fontFamily === 'dyslexia-friendly') {
        root.classList.add('dyslexia-friendly')
      } else {
        root.classList.remove('dyslexia-friendly')
      }

      // Dark mode
      if (settings.darkMode) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }

      // Keyboard navigation
      if (settings.keyboardNavigation) {
        root.classList.add('keyboard-navigation')
      } else {
        root.classList.remove('keyboard-navigation')
      }

      // Reduced motion
      if (settings.reducedMotion) {
        root.classList.add('reduced-motion')
      } else {
        root.classList.remove('reduced-motion')
      }

      // Screen reader optimization
      if (settings.screenReaderOptimized) {
        root.classList.add('screen-reader-optimized')
      } else {
        root.classList.remove('screen-reader-optimized')
      }
    },
    []
  )

  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY)
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings) as AccessibilitySettings
        setSettings({ ...DEFAULT_SETTINGS, ...parsed })
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Apply settings to document when they change
  useEffect(() => {
    if (!isLoaded) return

    applySettingsToDocument(settings)
  }, [settings, isLoaded, applySettingsToDocument])

  // Save settings to localStorage
  const saveSettings = useCallback((newSettings: AccessibilitySettings) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings))
      setSettings(newSettings)
      setShowSaveMessage(true)
      setTimeout(() => setShowSaveMessage(false), 3000)
    } catch (error) {
      console.error('Error saving accessibility settings:', error)
    }
  }, [])

  // Update individual setting
  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K,
      value: AccessibilitySettings[K]
    ) => {
      const newSettings = { ...settings, [key]: value }
      saveSettings(newSettings)
    },
    [settings, saveSettings]
  )

  // Reset to default settings
  const resetToDefault = useCallback(() => {
    saveSettings(DEFAULT_SETTINGS)
  }, [saveSettings])

  // Get current setting value
  const getSetting = useCallback(
    <K extends keyof AccessibilitySettings>(
      key: K
    ): AccessibilitySettings[K] => {
      return settings[key]
    },
    [settings]
  )

  // Check if setting is enabled
  const isEnabled = useCallback(
    (key: keyof AccessibilitySettings): boolean => {
      const value = settings[key]
      return typeof value === 'boolean' ? value : false
    },
    [settings]
  )

  return {
    settings,
    isLoaded,
    showSaveMessage,
    updateSetting,
    resetToDefault,
    getSetting,
    isEnabled,
    saveSettings,
  }
}
