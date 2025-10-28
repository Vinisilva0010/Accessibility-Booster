import React from 'react'

interface ApiKeyInstructionsProps {
  className?: string
}

export function ApiKeyInstructions({
  className = '',
}: ApiKeyInstructionsProps) {
  return (
    <div
      className={`rounded-lg border border-yellow-200 bg-yellow-50 p-6 ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-2xl" aria-hidden="true">
            🔑
          </span>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-yellow-800">
            Configure sua API Key do Google Generative AI
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p className="mb-3">
              Para usar as ferramentas de IA, você precisa de uma chave de API
              válida:
            </p>
            <ol className="list-inside list-decimal space-y-2">
              <li>
                <strong>Acesse:</strong>{' '}
                <a
                  href="https://makersuite.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-800 underline hover:text-yellow-900"
                >
                  https://makersuite.google.com/app/apikey
                </a>
              </li>
              <li>
                <strong>Faça login</strong> com sua conta Google
              </li>
              <li>
                <strong>Clique em &quot;Create API Key&quot;</strong>
              </li>
              <li>
                <strong>Copie a chave</strong> gerada (começa com
                &quot;AIza...&quot;)
              </li>
              <li>
                <strong>Cole na página Settings</strong> → Geral → API Key
              </li>
            </ol>
            <div className="mt-4 rounded-md bg-yellow-100 p-3">
              <p className="text-xs text-yellow-800">
                <strong>💡 Dica:</strong> A chave é gratuita e permite até 15
                requisições por minuto. Mantenha-a segura e não compartilhe com
                ninguém.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
