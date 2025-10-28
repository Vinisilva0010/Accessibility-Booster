import Head from 'next/head'
import Layout from '@/components/Layout'
import React, { useState } from 'react'
import { PromptBox } from '@/components/PromptBox'
import { SummarizerTool } from '@/components/SummarizerTool'
import { TranslatorTool } from '@/components/TranslatorTool'
import { ProofreaderTool } from '@/components/ProofreaderTool'
import { WriterRewriterTool } from '@/components/WriterRewriterTool'

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState('summarizer')

  const tools = [
    {
      id: 'summarizer',
      name: 'Summarizer',
      icon: '📝',
      description: 'Resuma textos longos em pontos principais concisos',
      component: <SummarizerTool />,
    },
    {
      id: 'promptbox',
      name: 'PromptBox',
      icon: '💬',
      description: 'Interaja com IA multimodal usando texto e imagens',
      component: <PromptBox />,
    },
    {
      id: 'translator',
      name: 'Translator',
      icon: '🌐',
      description: 'Traduza textos entre diferentes idiomas',
      component: <TranslatorTool />,
    },
    {
      id: 'proofreader',
      name: 'Proofreader',
      icon: '✏️',
      description: 'Corrija erros gramaticais e ortográficos',
      component: <ProofreaderTool />,
    },
    {
      id: 'writer',
      name: 'Writer',
      icon: '✍️',
      description: 'Gere conteúdo criativo e profissional',
      component: <WriterRewriterTool />,
    },
    {
      id: 'rewriter',
      name: 'Rewriter',
      icon: '🔄',
      description: 'Reescreva textos com diferentes estilos',
      component: <WriterRewriterTool />,
    },
  ]

  const activeToolData = tools.find(tool => tool.id === activeTool)

  return (
    <>
      <Head>
        <title>Accessibility Booster - Ferramentas</title>
        <meta
          name="description"
          content="Ferramentas de IA para acessibilidade"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <div className="space-y-6">
          {/* Page Header */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">
              Ferramentas de IA
            </h1>
            <p className="text-lg text-gray-600">
              Utilize nossas ferramentas de inteligência artificial para
              melhorar a acessibilidade e produtividade
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Tools Sidebar */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  Ferramentas Disponíveis
                </h2>
                <nav className="space-y-2">
                  {tools.map(tool => (
                    <button
                      key={tool.id}
                      onClick={() => setActiveTool(tool.id)}
                      className={`w-full rounded-lg p-3 text-left transition-colors ${
                        activeTool === tool.id
                          ? 'border-l-4 border-blue-500 bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="mr-3 text-xl" aria-hidden="true">
                          {tool.icon}
                        </span>
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="mt-1 text-xs text-gray-500">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Tool Content */}
            <div className="lg:col-span-3">
              <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-6">
                  <div className="flex items-center">
                    <span className="mr-3 text-2xl" aria-hidden="true">
                      {activeToolData?.icon}
                    </span>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {activeToolData?.name}
                      </h2>
                      <p className="text-gray-600">
                        {activeToolData?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">{activeToolData?.component}</div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
