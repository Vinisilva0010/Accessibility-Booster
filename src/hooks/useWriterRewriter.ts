import { useState, useCallback } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'

export interface WriterRewriterOptions {
  transformationType: string
  targetLanguage: string
  creativity?: number
  desiredLength?: 'short' | 'medium' | 'long' | 'original'
  style?: 'easy' | 'detailed' | 'professional' | 'concise'
  temperature?: number
  maxOutputTokens?: number
}

export interface WriterRewriterResult {
  generatedText: string
  transformationType: string
  targetLanguage: string
  originalLength: number
  generatedLength: number
  lengthRatio: number
  style: string
  usageMetadata?: {
    promptTokenCount: number
    candidatesTokenCount: number
    totalTokenCount: number
  }
  finishReason?: string
  processingTime?: number
}

export interface WriterRewriterRequest {
  text: string
  options: WriterRewriterOptions
}

export function useWriterRewriter() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<WriterRewriterResult | null>(null)

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

  const writeRewrite = useCallback(
    async (request: WriterRewriterRequest): Promise<WriterRewriterResult> => {
      const startTime = Date.now()
      setIsLoading(true)
      setError(null)
      setResult(null)

      try {
        // Validate input
        if (!request.text.trim()) {
          throw new Error('Please provide text to transform.')
        }

        if (!request.options.transformationType) {
          throw new Error('Please select a transformation type.')
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
            temperature: request.options.temperature || 0.7,
            maxOutputTokens: request.options.maxOutputTokens || 2048,
            topP: 0.8,
            topK: 40,
          },
        })

        const {
          transformationType,
          targetLanguage,
          creativity = 0.7,
          desiredLength = 'original',
          style = 'professional',
        } = request.options

        const languageCode = getLanguageCode(targetLanguage)

        // Build transformation prompt based on type
        let prompt = `Transform the following text in ${targetLanguage} (${languageCode}) according to the specified requirements:\n\n`

        // Transformation type specific prompts
        switch (transformationType) {
          case 'writer':
            prompt += `Create a completely new text based on the theme or topic of the original text. Be creative and original while maintaining the core message.`
            break
          case 'rewriter':
            prompt += `Rewrite the original text to improve clarity, flow, and engagement while preserving the main ideas and structure.`
            break
          case 'bullet-points':
            prompt += `Convert the text into clear, organized bullet points that capture all the key information.`
            break
          case 'simplify':
            prompt += `Simplify the text for easy reading, using simpler vocabulary and shorter sentences while maintaining the original meaning.`
            break
          case 'email-formal':
            prompt += `Transform the text into a formal email format with proper greeting, body, and closing.`
            break
          case 'email-casual':
            prompt += `Transform the text into a casual email format with friendly tone and informal language.`
            break
          case 'summary':
            prompt += `Create a concise summary that captures the main points and key information.`
            break
          case 'expand':
            prompt += `Expand the text with additional details, examples, and explanations while maintaining the original structure.`
            break
          case 'academic':
            prompt += `Rewrite the text in an academic style with formal language, proper citations format, and scholarly tone.`
            break
          case 'creative':
            prompt += `Rewrite the text in a creative, engaging style with vivid descriptions and compelling narrative.`
            break
          default:
            prompt += `Transform the text according to the "${transformationType}" style.`
        }

        // Add style requirements
        switch (style) {
          case 'easy':
            prompt += ` Use simple language and short sentences for easy understanding.`
            break
          case 'detailed':
            prompt += ` Provide comprehensive details and thorough explanations.`
            break
          case 'professional':
            prompt += ` Use professional, formal language appropriate for business contexts.`
            break
          case 'concise':
            prompt += ` Be concise and to the point, avoiding unnecessary words.`
            break
        }

        // Add length requirements
        switch (desiredLength) {
          case 'short':
            prompt += ` Keep the output brief and concise.`
            break
          case 'medium':
            prompt += ` Provide a moderate length response.`
            break
          case 'long':
            prompt += ` Provide a detailed, comprehensive response.`
            break
          case 'original':
            prompt += ` Maintain a similar length to the original text.`
            break
        }

        // Add creativity level
        if (creativity > 0.7) {
          prompt += ` Be creative and innovative in your approach.`
        } else if (creativity < 0.3) {
          prompt += ` Be conservative and stick closely to the original content.`
        }

        prompt += `\n\nOriginal text:\n${request.text}`

        // Generate transformation
        const result = await model.generateContent(prompt)
        const response = await result.response
        const generatedText = response.text().trim()

        const processingTime = Date.now() - startTime

        // Calculate metrics
        const originalLength = request.text
          .split(/\s+/)
          .filter(word => word.length > 0).length
        const generatedLength = generatedText
          .split(/\s+/)
          .filter(word => word.length > 0).length
        const lengthRatio = Math.round((generatedLength / originalLength) * 100)

        const writerRewriterResult: WriterRewriterResult = {
          generatedText,
          transformationType,
          targetLanguage,
          originalLength,
          generatedLength,
          lengthRatio,
          style,
          usageMetadata: result.response.usageMetadata,
          finishReason: result.response.candidates?.[0]?.finishReason,
          processingTime,
        }

        setResult(writerRewriterResult)
        return writerRewriterResult
      } catch (err) {
        let errorMessage = 'Unknown error occurred while transforming text'

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
    writeRewrite,
    isLoading,
    error,
    result,
    clearResult,
  }
}

