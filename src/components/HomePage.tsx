import { useState } from 'react'

export default function HomePage() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // TODO: Implement API call to Chrome AI
    setTimeout(() => {
      setOutput(`Generated response for: ${input}`)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Chrome AI Integration
        </h2>

        <div className="space-y-6">
          <div>
            <p className="text-lg text-gray-600 mb-4">
              Welcome to the Chrome AI Next.js application. This platform
              integrates with Chrome AI APIs to provide powerful AI capabilities.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="input"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Input
              </label>
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your text here..."
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Generate'}
            </button>
          </form>

          {output && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Output
              </label>
              <div className="bg-gray-100 p-4 rounded-md min-h-[100px]">
                <p className="text-gray-800">{output}</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Prompt API</h3>
            <p className="text-gray-600 text-sm">
              Generate intelligent prompts and suggestions
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Translator</h3>
            <p className="text-gray-600 text-sm">
              Translate text between multiple languages
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Proofreader</h3>
            <p className="text-gray-600 text-sm">
              Check and correct grammar and spelling
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

