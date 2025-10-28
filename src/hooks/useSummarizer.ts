import { useState, useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export interface SummarizerOptions {
  maxLength?: number
  style?: 'brief' | 'detailed' | 'bullet-points'
  language?: string
  temperature?: number
}

export interface SummarizerResult {
  summary: string
  originalLength: number
  summaryLength: number
  compressionRatio: number
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
}

export function useSummarizer() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SummarizerResult | null>(null)

  const getApiKey = useCallback(() => {
    // Try environment variable first
    if (
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    ) {
      return process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('apiKey')
    }

    return null
  }, [])

  const summarize = useCallback(
    async (
      text: string,
      options: SummarizerOptions = {}
    ): Promise<SummarizerResult> => {
      setIsLoading(true)
      setError(null)
      setResult(null)

      try {
        if (!text.trim()) {
          throw new Error('Por favor, forneça um texto para resumir.')
        }

        // Get API key
        const apiKey = getApiKey()

        if (!apiKey) {
          throw new Error(
            'API key não encontrada. Configure sua chave do Google Generative AI nas configurações ou variáveis de ambiente.'
          )
        }

        // Initialize Google Generative AI
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
          model: process.env.NEXT_PUBLIC_CHROME_AI_MODEL || 'gemini-1.5-flash',
          generationConfig: {
            temperature: options.temperature || 0.3, // Lower temperature for more consistent summaries
            maxOutputTokens: options.maxLength || 1024,
            topP: 0.8,
            topK: 40,
          },
        })

        // Create prompt based on options
        const {
          maxLength = 200,
          style = 'brief',
          language = 'português',
        } = options

        let prompt = `Você é um especialista em resumir textos. Resuma o seguinte texto em ${language}:\n\n`

        if (style === 'brief') {
          prompt += `Crie um resumo conciso de no máximo ${maxLength} palavras, destacando apenas os pontos principais e mais importantes.\n\n`
        } else if (style === 'detailed') {
          prompt += `Crie um resumo detalhado de aproximadamente ${maxLength} palavras, incluindo informações importantes, contexto e detalhes relevantes.\n\n`
        } else if (style === 'bullet-points') {
          prompt += `Crie um resumo em formato de tópicos (bullet points) com os pontos principais. Use • para cada ponto.\n\n`
        }

        prompt += `Texto para resumir:\n"${text}"\n\nResumo:`

        // Generate summary
        const result = await model.generateContent(prompt)
        const response = await result.response
        const summary = response.text().trim()

        // Calculate metrics
        const originalLength = text
          .split(/\s+/)
          .filter(word => word.length > 0).length
        const summaryLength = summary
          .split(/\s+/)
          .filter(word => word.length > 0).length
        const compressionRatio = Math.round(
          Math.max(0, (1 - summaryLength / originalLength) * 100)
        )

        const summarizerResult: SummarizerResult = {
          summary,
          originalLength,
          summaryLength,
          compressionRatio,
          usageMetadata: result.response.usageMetadata,
        }

        setResult(summarizerResult)
        return summarizerResult
      } catch (err) {
        console.error('Error in summarize:', err)
        let errorMessage = 'Erro desconhecido ao resumir texto'

        if (err instanceof Error) {
          errorMessage = err.message
          // More specific error messages
          if (errorMessage.includes('API key')) {
            errorMessage =
              'API key inválida. Verifique sua chave do Google Generative AI.'
          } else if (errorMessage.includes('PERMISSION_DENIED')) {
            errorMessage =
              'Permissão negada. Verifique se sua API key tem as permissões necessárias.'
          } else if (errorMessage.includes('INVALID_ARGUMENT')) {
            errorMessage =
              'Argumentos inválidos. Verifique se o texto não está vazio.'
          } else if (errorMessage.includes('RESOURCE_EXHAUSTED')) {
            errorMessage =
              'Quota excedida. Aguarde alguns minutos e tente novamente.'
          }
        } else if (typeof err === 'string') {
          errorMessage = err
        }

        setError(errorMessage)
        throw new Error(errorMessage)
      } finally {
        setIsLoading(false)
      }
    },
    [getApiKey]
  )

  const clearResult = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    summarize,
    isLoading,
    error,
    result,
    clearResult,
  }
}
