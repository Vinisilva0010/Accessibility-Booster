import { useState, useEffect } from 'react'
import { AccessibilitySettings } from '@/components/AccessibilitySettings'
import { useOnboarding } from '@/hooks/useOnboarding'

interface Settings {
  apiKey: string
  language: string
  theme: string
  fontSize: string
  contrast: string
  autoTranslate: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  reducedMotion: boolean
  highContrast: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    apiKey: '',
    language: 'pt',
    theme: 'light',
    fontSize: 'medium',
    contrast: 'normal',
    autoTranslate: false,
    screenReader: false,
    keyboardNavigation: true,
    reducedMotion: false,
    highContrast: false,
  })

  const [activeTab, setActiveTab] = useState('general')
  const { startOnboarding, resetOnboarding, state } = useOnboarding()

  useEffect(() => {
    // Load settings from localStorage
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('accessibilitySettings')
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings))
      }
    }
  }, [])

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessibilitySettings', JSON.stringify(settings))
      localStorage.setItem('apiKey', settings.apiKey)
    }
    alert('Configurações salvas com sucesso!')
  }

  const handleReset = () => {
    setSettings({
      apiKey: '',
      language: 'pt',
      theme: 'light',
      fontSize: 'medium',
      contrast: 'normal',
      autoTranslate: false,
      screenReader: false,
      keyboardNavigation: true,
      reducedMotion: false,
      highContrast: false,
    })
  }

  const tabs = [
    { id: 'general', name: 'Geral', icon: '⚙️' },
    { id: 'accessibility', name: 'Acessibilidade', icon: '♿' },
    { id: 'appearance', name: 'Aparência', icon: '🎨' },
    { id: 'language', name: 'Idioma', icon: '🌐' },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Configurações</h1>
        <p className="text-lg text-gray-600">
          Personalize sua experiência e configure as opções de acessibilidade
        </p>
      </div>

      {/* Tabs */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <span className="mr-2" aria-hidden="true">
                  {tab.icon}
                </span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Configurações Gerais
              </h2>

              <div>
                <label
                  htmlFor="apiKey"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Chave da API do Google Generative AI
                </label>
                <input
                  type="password"
                  id="apiKey"
                  value={settings.apiKey}
                  onChange={e =>
                    setSettings({ ...settings, apiKey: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Digite sua chave da API"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Necessário para usar todas as ferramentas de IA
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="autoTranslate"
                  checked={settings.autoTranslate}
                  onChange={e =>
                    setSettings({
                      ...settings,
                      autoTranslate: e.target.checked,
                    })
                  }
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="autoTranslate"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Tradução automática de conteúdo
                </label>
              </div>

              {/* Onboarding Tour */}
              <div className="rounded-md border border-purple-200 bg-purple-50 p-4">
                <h3 className="mb-2 text-sm font-medium text-purple-800">
                  🎯 Interactive Tour
                </h3>
                <p className="mb-3 text-sm text-purple-700">
                  {state.isCompleted
                    ? 'You have completed the onboarding tour. You can restart it anytime to learn about the features.'
                    : 'Take the interactive tour to learn about all the features of Accessibility Booster.'}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={startOnboarding}
                    className="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
                  >
                    {state.isCompleted ? 'Restart Tour' : 'Start Tour'}
                  </button>
                  {state.isCompleted && (
                    <button
                      onClick={resetOnboarding}
                      className="rounded-md border border-purple-600 px-4 py-2 text-sm text-purple-600 hover:bg-purple-600 hover:text-white"
                    >
                      Reset Progress
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Accessibility Tab */}
          {activeTab === 'accessibility' && <AccessibilitySettings />}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Aparência
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="theme"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Tema
                  </label>
                  <select
                    id="theme"
                    value={settings.theme}
                    onChange={e =>
                      setSettings({ ...settings, theme: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="light">Claro</option>
                    <option value="dark">Escuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="fontSize"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Tamanho da Fonte
                  </label>
                  <select
                    id="fontSize"
                    value={settings.fontSize}
                    onChange={e =>
                      setSettings({ ...settings, fontSize: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="small">Pequeno</option>
                    <option value="medium">Médio</option>
                    <option value="large">Grande</option>
                    <option value="extra-large">Extra Grande</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contrast"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Contraste
                  </label>
                  <select
                    id="contrast"
                    value={settings.contrast}
                    onChange={e =>
                      setSettings({ ...settings, contrast: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">Alto</option>
                    <option value="maximum">Máximo</option>
                  </select>
                </div>
              </div>

              <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-800">
                  Preview das Configurações
                </h3>
                <div
                  className={`rounded-md p-4 ${
                    settings.theme === 'dark'
                      ? 'bg-gray-800 text-white'
                      : 'bg-white text-gray-900'
                  } ${
                    settings.fontSize === 'small'
                      ? 'text-sm'
                      : settings.fontSize === 'large'
                        ? 'text-lg'
                        : settings.fontSize === 'extra-large'
                          ? 'text-xl'
                          : 'text-base'
                  }`}
                >
                  <p>
                    Este é um exemplo de como o texto aparecerá com suas
                    configurações atuais.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Language Tab */}
          {activeTab === 'language' && (
            <div className="space-y-6">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Idioma e Localização
              </h2>

              <div>
                <label
                  htmlFor="language"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Idioma Principal
                </label>
                <select
                  id="language"
                  value={settings.language}
                  onChange={e =>
                    setSettings({ ...settings, language: e.target.value })
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pt">Português (Brasil)</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div className="rounded-md border border-green-200 bg-green-50 p-4">
                <h3 className="mb-2 text-sm font-medium text-green-800">
                  Idiomas Suportados pelas Ferramentas
                </h3>
                <p className="text-sm text-green-700">
                  Todas as ferramentas de IA suportam múltiplos idiomas. O
                  idioma selecionado será usado como padrão para traduções e
                  respostas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleReset}
          className="rounded-md border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Restaurar Padrões
        </button>
        <button
          onClick={handleSave}
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  )
}
