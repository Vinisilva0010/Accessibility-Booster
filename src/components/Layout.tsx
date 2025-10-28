import { useRouter } from 'next/router'
import { Sidebar } from './Sidebar'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="relative">
        <Sidebar currentPath={router.pathname} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Accessibility Booster
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Ferramentas de IA para melhorar a acessibilidade digital
            </p>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
