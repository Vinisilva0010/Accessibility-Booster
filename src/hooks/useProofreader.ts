import { useState, useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export interface ProofreaderOptions {
  targetLanguage: string
  autoCorrect?: boolean
  includeSuggestions?: boolean
  temperature?: number
  maxOutputTokens?: number
}

export interface CorrectionSuggestion {
  originalText: string
  correctedText: string
  explanation: string
  confidence: number
  type: 'grammar' | 'spelling' | 'punctuation' | 'style' | 'clarity'
}

export interface ProofreaderResult {
  correctedText: string
  suggestions: CorrectionSuggestion[]
  originalLength: number
  correctedLength: number
  correctionsCount: number
  language: string
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
  finishReason?: string
  processingTime?: number
}

export interface ProofreaderRequest {
  text: string
  options: ProofreaderOptions
}

export function useProofreader() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ProofreaderResult | null>(null)

  const getApiKey = useCallback(() => {
    // Try environment variable first
    if (
      typeof window !== 'undefined' &&
      process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY &&
      process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY.trim() !== ''
    ) {
      return process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY
    }

    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      const storedKey = localStorage.getItem('apiKey')
      if (storedKey && storedKey.trim() !== '') {
        return storedKey
      }
    }

    return null
  }, [])

  const getLanguageCode = (language: string): string => {
    const languageMap: { [key: string]: string } = {
      Portuguese: 'pt',
      English: 'en',
      Spanish: 'es',
      French: 'fr',
      German: 'de',
      Italian: 'it',
      Japanese: 'ja',
      Chinese: 'zh',
    }
    return languageMap[language] || language.toLowerCase()
  }

  const proofread = useCallback(
    async (request: ProofreaderRequest): Promise<ProofreaderResult> => {
      const startTime = Date.now()
      setIsLoading(true)
      setError(null)
      setResult(null)

      try {
        // Validate input
        if (!request.text.trim()) {
          throw new Error('Please provide text to proofread.')
        }

        if (!request.options.targetLanguage) {
          throw new Error('Please select a target language.')
        }

        // Get API key
        const apiKey = getApiKey()

        if (!apiKey) {
          throw new Error(
            '🔑 API key não encontrada!\n\n' +
              'Para usar o Proofreader, você precisa configurar sua chave de API do Google Generative AI:\n\n' +
              '1. Acesse: https://makersuite.google.com/app/apikey\n' +
              '2. Faça login com sua conta Google\n' +
              '3. Clique em "Create API Key"\n' +
              '4. Copie a chave gerada\n' +
              '5. Cole na página Settings → Geral → API Key\n\n' +
              'Ou configure a variável de ambiente NEXT_PUBLIC_GOOGLE_AI_API_KEY no arquivo .env.local'
          )
        }

        // Initialize Google Generative AI
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            temperature: request.options.temperature || 0.2,
            maxOutputTokens: request.options.maxOutputTokens || 2048,
            topP: 0.8,
            topK: 40,
          },
        })

        const {
          targetLanguage,
          autoCorrect = true,
          includeSuggestions = true,
        } = request.options

        const languageCode = getLanguageCode(targetLanguage)

        // Build proofreading prompt
        let prompt = `Please proofread and correct the following text in ${targetLanguage} (${languageCode}).`

        if (autoCorrect && includeSuggestions) {
          prompt += `\n\nProvide both:\n1. The corrected text\n2. A detailed list of corrections made with explanations\n\nFormat your response as:\nCORRECTED_TEXT:\n[corrected text here]\n\nCORRECTIONS:\n- [original] → [corrected] (explanation)`
        } else if (autoCorrect) {
          prompt += `\n\nReturn only the corrected text with improved grammar, spelling, punctuation, and clarity.`
        } else {
          prompt += `\n\nProvide suggestions for improvement without changing the original text. List each suggestion with:\n- Original text\n- Suggested correction\n- Explanation\n- Type of issue (grammar/spelling/punctuation/style/clarity)`
        }

        prompt += `\n\nText to proofread:\n${request.text}`

        // Generate proofreading
        const result = await model.generateContent(prompt)
        const response = await result.response
        const responseText = response.text().trim()

        const processingTime = Date.now() - startTime

        // Parse the response based on mode
        let correctedText = request.text
        let suggestions: CorrectionSuggestion[] = []

        if (autoCorrect && includeSuggestions) {
          // Parse corrected text and suggestions
          const correctedMatch = responseText.match(
            /CORRECTED_TEXT:\s*([\s\S]*?)(?=\n\nCORRECTIONS:|$)/i
          )
          const correctionsMatch = responseText.match(
            /CORRECTIONS:\s*([\s\S]*?)$/i
          )

          if (correctedMatch) {
            correctedText = correctedMatch[1].trim()
          }

          if (correctionsMatch) {
            const correctionsText = correctionsMatch[1]
            const correctionLines = correctionsText
              .split('\n')
              .filter(line => line.trim())

            suggestions = correctionLines.map(line => {
              const match = line.match(/^- (.+?) → (.+?) \((.+?)\)/)
              if (match) {
                return {
                  originalText: match[1].trim(),
                  correctedText: match[2].trim(),
                  explanation: match[3].trim(),
                  confidence: 0.9,
                  type: 'grammar' as const,
                }
              }
              return {
                originalText: line.trim(),
                correctedText: line.trim(),
                explanation: 'Correction made',
                confidence: 0.8,
                type: 'grammar' as const,
              }
            })
          }
        } else if (autoCorrect) {
          // Only corrected text
          correctedText = responseText
        } else {
          // Only suggestions
          const suggestionLines = responseText
            .split('\n')
            .filter(line => line.trim())
          suggestions = suggestionLines.map(line => {
            const match = line.match(/^- (.+?) → (.+?) \((.+?)\) \[(.+?)\]/)
            if (match) {
              return {
                originalText: match[1].trim(),
                correctedText: match[2].trim(),
                explanation: match[3].trim(),
                confidence: 0.9,
                type: match[4].trim().toLowerCase() as any,
              }
            }
            return {
              originalText: line.trim(),
              correctedText: line.trim(),
              explanation: 'Suggestion provided',
              confidence: 0.7,
              type: 'grammar' as const,
            }
          })
        }

        // Calculate metrics
        const originalLength = request.text
          .split(/\s+/)
          .filter(word => word.length > 0).length
        const correctedLength = correctedText
          .split(/\s+/)
          .filter(word => word.length > 0).length

        const proofreaderResult: ProofreaderResult = {
          correctedText,
          suggestions,
          originalLength,
          correctedLength,
          correctionsCount: suggestions.length,
          language: targetLanguage,
          usageMetadata: result.response.usageMetadata,
          finishReason: result.response.candidates?.[0]?.finishReason,
          processingTime,
        }

        setResult(proofreaderResult)
        return proofreaderResult
      } catch (err) {
        console.error('Error in proofread:', err)
        let errorMessage = 'Erro desconhecido ao revisar texto'

        if (err instanceof Error) {
          errorMessage = err.message

          // More specific error messages
          if (
            errorMessage.includes('API key not valid') ||
            errorMessage.includes('API_KEY_INVALID')
          ) {
            errorMessage =
              '🔑 API key inválida!\n\n' +
              'A chave de API fornecida não é válida. Verifique:\n\n' +
              '1. Se a chave está correta (sem espaços extras)\n' +
              '2. Se a chave foi gerada corretamente em https://makersuite.google.com/app/apikey\n' +
              '3. Se a conta Google tem permissões para usar a API\n\n' +
              'Configure uma nova chave em Settings → Geral → API Key'
          } else if (errorMessage.includes('PERMISSION_DENIED')) {
            errorMessage =
              '🚫 Permissão negada!\n\n' +
              'Sua API key não tem permissão para usar o serviço. Verifique se:\n\n' +
              '1. A conta Google tem acesso ao Google AI Studio\n' +
              '2. A API está habilitada para sua conta\n' +
              '3. Não há restrições de quota ou billing'
          } else if (errorMessage.includes('RESOURCE_EXHAUSTED')) {
            errorMessage =
              '⏰ Quota excedida!\n\n' +
              'Você atingiu o limite de uso da API. Aguarde alguns minutos e tente novamente.'
          } else if (errorMessage.includes('INVALID_ARGUMENT')) {
            errorMessage =
              '❌ Argumentos inválidos!\n\n' +
              'Verifique se o texto não está vazio e tem conteúdo válido.'
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
    proofread,
    isLoading,
    error,
    result,
    clearResult,
  }
}
