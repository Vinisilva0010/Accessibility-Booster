import Link from 'next/link'
import { useState } from 'react'

interface SidebarProps {
  currentPath: string
}

export function Sidebar({ currentPath }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    {
      name: 'Home',
      href: '/home',
      icon: '🏠',
      description: 'Informações e onboarding',
    },
    {
      name: 'Ferramentas',
      href: '/tools',
      icon: '🛠️',
      description: 'IA multimodal e acessibilidade',
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: '⚙️',
      description: 'Personalização e acessibilidade',
    },
  ]

  const tools = [
    { name: 'Summarizer', href: '/tools#summarizer', icon: '📝' },
    { name: 'PromptBox', href: '/tools#promptbox', icon: '💬' },
    { name: 'Translator', href: '/tools#translator', icon: '🌐' },
    { name: 'Proofreader', href: '/tools#proofreader', icon: '✏️' },
    { name: 'Writer', href: '/tools#writer', icon: '✍️' },
    { name: 'Rewriter', href: '/tools#rewriter', icon: '🔄' },
  ]

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-blue-600">
              Accessibility Booster
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="rounded-md p-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          >
            <span className="text-lg">{isCollapsed ? '→' : '←'}</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-4">
        {navigation.map(item => {
          const isActive = currentPath === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center rounded-lg p-3 transition-colors ${
                isActive
                  ? 'border-l-4 border-blue-500 bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="mr-3 text-xl" aria-hidden="true">
                {item.icon}
              </span>
              {!isCollapsed && (
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Tools Section */}
      {!isCollapsed && (
        <div className="border-t border-gray-200 p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Ferramentas IA
          </h3>
          <div className="space-y-1">
            {tools.map(tool => (
              <Link
                key={tool.name}
                href={tool.href}
                className="flex items-center rounded-md p-2 text-sm text-gray-600 transition-colors hover:bg-gray-100"
              >
                <span className="mr-2 text-lg" aria-hidden="true">
                  {tool.icon}
                </span>
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 p-4">
        {!isCollapsed && (
          <div className="text-center text-xs text-gray-500">
            Chrome AI Integration
          </div>
        )}
      </div>
    </div>
  )
}
