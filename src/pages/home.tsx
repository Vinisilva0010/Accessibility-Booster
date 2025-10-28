import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { OnboardingModal } from '@/components/OnboardingModal'
import { useOnboarding } from '@/hooks/useOnboarding'

export default function HomePage() {
  const { state, startOnboarding } = useOnboarding()

  // Start onboarding for first-time users
  useEffect(() => {
    if (!state.isCompleted && !state.isActive) {
      // Small delay to ensure page is fully loaded
      const timer = setTimeout(() => {
        startOnboarding()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [state.isCompleted, state.isActive, startOnboarding])

  return (
    <>
      <Head>
        <title>Accessibility Booster - Home</title>
        <meta
          name="description"
          content="Ferramentas de IA para melhorar a acessibilidade digital"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        {/* Onboarding Modal */}
        <OnboardingModal />

        <div className="space-y-8">
          {/* Hero Section */}
          <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white shadow-lg">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-4 text-4xl font-bold">
                Bem-vindo ao Accessibility Booster
              </h1>
              <p className="mb-6 text-xl opacity-90">
                Transforme sua experiência digital com ferramentas de IA
                projetadas para acessibilidade
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/tools"
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-gray-100"
                >
                  Explorar Ferramentas
                </Link>
                <Link
                  href="/settings"
                  className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-blue-600"
                  data-tour="accessibility-settings"
                >
                  Configurações
                </Link>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon="📝"
              title="Summarizer"
              description="Resuma textos longos em pontos principais concisos e fáceis de entender"
              href="/tools#summarizer"
              dataTour="summarizer"
            />
            <FeatureCard
              icon="💬"
              title="PromptBox"
              description="Interaja com IA multimodal usando texto e imagens para análises avançadas"
              href="/tools#promptbox"
              dataTour="prompt-box"
            />
            <FeatureCard
              icon="🌐"
              title="Translator"
              description="Traduza conteúdo entre diferentes idiomas com precisão e contexto"
              href="/tools#translator"
              dataTour="translator"
            />
            <FeatureCard
              icon="✏️"
              title="Proofreader"
              description="Corrija erros gramaticais e ortográficos automaticamente"
              href="/tools#proofreader"
              dataTour="proofreader"
            />
            <FeatureCard
              icon="✍️"
              title="Writer"
              description="Gere conteúdo criativo e profissional adaptado às suas necessidades"
              href="/tools#writer"
              dataTour="writer-rewriter"
            />
            <FeatureCard
              icon="🔄"
              title="Rewriter"
              description="Reescreva textos com diferentes estilos e tons mantendo o significado"
              href="/tools#rewriter"
              dataTour="writer-rewriter"
            />
          </div>

          {/* Getting Started */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Como Começar
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <StepCard
                step="1"
                title="Configure sua API Key"
                description="Adicione sua chave do Google Generative AI nas configurações para usar todas as ferramentas"
                action="Ir para Configurações"
                href="/settings"
              />
              <StepCard
                step="2"
                title="Explore as Ferramentas"
                description="Teste diferentes ferramentas de IA para encontrar as que melhor atendem suas necessidades"
                action="Ver Ferramentas"
                href="/tools"
              />
              <StepCard
                step="3"
                title="Personalize sua Experiência"
                description="Ajuste configurações de acessibilidade, idioma e preferências visuais"
                action="Personalizar"
                href="/settings"
              />
            </div>
          </div>

          {/* Accessibility Features */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <h2 className="mb-4 text-2xl font-bold text-green-800">
              Recursos de Acessibilidade
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-green-700">
                  Design Inclusivo
                </h3>
                <ul className="space-y-1 text-green-600">
                  <li>• Contraste alto para melhor legibilidade</li>
                  <li>• Suporte a leitores de tela</li>
                  <li>• Navegação por teclado</li>
                  <li>• Textos alternativos para imagens</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold text-green-700">
                  Personalização
                </h3>
                <ul className="space-y-1 text-green-600">
                  <li>• Tamanho de fonte ajustável</li>
                  <li>• Esquemas de cores personalizáveis</li>
                  <li>• Múltiplos idiomas</li>
                  <li>• Preferências de entrada</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-6 text-center">
            <h2 className="mb-2 text-2xl font-bold text-blue-800">
              Precisa de Ajuda?
            </h2>
            <p className="mb-4 text-blue-600">
              Nossa equipe está aqui para ajudar você a aproveitar ao máximo o
              Accessibility Booster
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700">
                Documentação
              </button>
              <button className="rounded-lg border border-blue-600 px-6 py-2 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
                Suporte Técnico
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  href,
  dataTour,
}: {
  icon: string
  title: string
  description: string
  href: string
  dataTour?: string
}) {
  return (
    <div
      className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
      data-tour={dataTour}
    >
      <div className="mb-4 text-4xl">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <Link
        href={href}
        className="font-medium text-blue-600 transition-colors hover:text-blue-700"
      >
        Experimentar →
      </Link>
    </div>
  )
}

function StepCard({
  step,
  title,
  description,
  action,
  href,
}: {
  step: string
  title: string
  description: string
  action: string
  href: string
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
        {step}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mb-4 text-gray-600">{description}</p>
      <Link
        href={href}
        className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
      >
        {action}
      </Link>
    </div>
  )
}
