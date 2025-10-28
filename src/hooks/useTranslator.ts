import { useState, useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export interface TranslationOptions {
  sourceLanguage?: string
  targetLanguage: string
  autoDetect?: boolean
  preserveFormatting?: boolean
  temperature?: number
}

export interface TranslationResult {
  translatedText: string
  detectedLanguage?: string
  sourceLanguage: string
  targetLanguage: string
  originalLength: number
  translatedLength: number
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
  finishReason?: string
  processingTime?: number
}

export interface TranslationRequest {
  text: string
  options: TranslationOptions
}

export function useTranslator() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<TranslationResult | null>(null)

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

  const getLanguageName = (code: string): string => {
    const codeMap: { [key: string]: string } = {
      pt: 'Portuguese',
      en: 'English',
      es: 'Spanish',
      fr: 'French',
      de: 'German',
      it: 'Italian',
      ja: 'Japanese',
      zh: 'Chinese',
    }
    return codeMap[code] || code
  }

  const translate = useCallback(
    async (request: TranslationRequest): Promise<TranslationResult> => {
      const startTime = Date.now()
      setIsLoading(true)
      setError(null)
      setResult(null)

      try {
        // Validate input
        if (!request.text.trim()) {
          throw new Error('Please provide text to translate.')
        }

        if (!request.options.targetLanguage) {
          throw new Error('Please select a target language.')
        }

        // Get API key
        const apiKey = getApiKey()

        if (!apiKey) {
          throw new Error(
            'API key not found. Please configure your Google Generative AI API key in settings or environment variables.'
          )
        }

        // Initialize Google Generative AI
        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          generationConfig: {
            temperature: request.options.temperature || 0.3,
            maxOutputTokens: 1024,
            topP: 0.8,
            topK: 40,
          },
        })

        const {
          sourceLanguage,
          targetLanguage,
          autoDetect,
          preserveFormatting = true,
        } = request.options

        // Build translation prompt
        let prompt = `Translate the following text`

        if (autoDetect) {
          prompt += ` (detect the source language automatically)`
        } else if (sourceLanguage) {
          const sourceCode = getLanguageCode(sourceLanguage)
          prompt += ` from ${sourceLanguage} (${sourceCode})`
        }

        const targetCode = getLanguageCode(targetLanguage)
        prompt += ` to ${targetLanguage} (${targetCode}).`

        if (preserveFormatting) {
          prompt += ` Preserve the original formatting, punctuation, and structure.`
        }

        prompt += `\n\nText to translate:\n${request.text}`

        // Generate translation
        const result = await model.generateContent(prompt)
        const response = await result.response
        const translatedText = response.text().trim()

        const processingTime = Date.now() - startTime

        // Calculate metrics
        const originalLength = request.text
          .split(/\s+/)
          .filter(word => word.length > 0).length
        const translatedLength = translatedText
          .split(/\s+/)
          .filter(word => word.length > 0).length

        // Try to detect source language if auto-detect was used
        let detectedLanguage: string | undefined
        if (autoDetect) {
          // Simple heuristic: if the prompt response mentions a language, extract it
          const responseText = response.text()
          const languageMatch = responseText.match(/from\s+(\w+)/i)
          if (languageMatch) {
            detectedLanguage = getLanguageName(languageMatch[1])
          }
        }

        const translationResult: TranslationResult = {
          translatedText,
          detectedLanguage,
          sourceLanguage: sourceLanguage || detectedLanguage || 'Unknown',
          targetLanguage,
          originalLength,
          translatedLength,
          usageMetadata: result.response.usageMetadata,
          finishReason: result.response.candidates?.[0]?.finishReason,
          processingTime,
        }

        setResult(translationResult)
        return translationResult
      } catch (err) {
        let errorMessage = 'Unknown error occurred while translating text'

        if (err instanceof Error) {
          errorMessage = err.message
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
    translate,
    isLoading,
    error,
    result,
    clearResult,
  }
}

