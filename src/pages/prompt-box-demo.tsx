import React from 'react'
import { PromptBox } from '@/components/PromptBox'

export default function PromptBoxDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            Chrome AI Prompt Box Demo
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Teste o componente PromptBox com entrada de texto e imagem. A IA
            multimodal pode analisar e responder sobre ambos os tipos de
            conteúdo.
          </p>
        </div>

        <PromptBox className="mx-auto max-w-4xl" />

        <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Exemplos de uso:
          </h3>
          <div className="grid gap-4 text-sm md:grid-cols-2">
            <div>
              <h4 className="mb-2 font-medium text-gray-700">Com texto:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • &quot;Explique o conceito de inteligência artificial&quot;
                </li>
                <li>• &quot;Escreva um poema sobre tecnologia&quot;</li>
                <li>• &quot;Traduza este texto para inglês&quot;</li>
                <li>• &quot;Resuma este artigo em 3 pontos principais&quot;</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-2 font-medium text-gray-700">Com imagem:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• &quot;Descreva o que você vê nesta imagem&quot;</li>
                <li>• &quot;Que tipo de arquitetura é esta?&quot;</li>
                <li>• &quot;Analise o código nesta screenshot&quot;</li>
                <li>• &quot;Crie uma história baseada nesta foto&quot;</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-md border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-start gap-2">
            <div className="mt-0.5 h-5 w-5 text-yellow-600">ℹ️</div>
            <div>
              <p className="font-medium text-yellow-800">Nota importante:</p>
              <p className="text-sm text-yellow-700">
                Certifique-se de configurar sua chave de API do Google
                Generative AI nas configurações para que o componente funcione
                corretamente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
