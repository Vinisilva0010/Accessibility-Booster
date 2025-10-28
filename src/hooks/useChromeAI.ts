import { useState } from 'react'
import ChromeAIClient from '@/api/chrome-ai'

export function useChromeAI() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const client = new ChromeAIClient({
    apiKey: typeof window !== 'undefined' ? localStorage.getItem('apiKey') || '' : '',
  })

  const executeAI = async (
    operation: keyof ChromeAIClient,
    ...args: unknown[]
  ) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await (client[operation] as (...args: unknown[]) => Promise<unknown>)(...args)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    executeAI,
    isLoading,
    error,
  }
}

