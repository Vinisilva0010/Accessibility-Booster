import { useState } from 'react'

interface Tool {
  name: string
  description: string
  enabled: boolean
}

export default function AccessibilityToolsPage() {
  const [tools, setTools] = useState<Tool[]>([
    {
      name: 'Text Summarizer',
      description: 'Automatically summarize long texts',
      enabled: false,
    },
    {
      name: 'Translator',
      description: 'Translate text to different languages',
      enabled: false,
    },
    {
      name: 'Proofreader',
      description: 'Check grammar and spelling',
      enabled: false,
    },
    {
      name: 'Text to Speech',
      description: 'Convert text to audio',
      enabled: false,
    },
    {
      name: 'Font Size Adjuster',
      description: 'Adjust text size for better readability',
      enabled: false,
    },
  ])

  const toggleTool = (index: number) => {
    const newTools = [...tools]
    newTools[index].enabled = !newTools[index].enabled
    setTools(newTools)
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Accessibility Tools
        </h2>

        <p className="text-lg text-gray-600 mb-8">
          Configure and enable various accessibility tools to enhance your
          browsing experience.
        </p>

        <div className="space-y-4">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {tool.description}
                  </p>
                </div>
                <button
                  onClick={() => toggleTool(index)}
                  className={`ml-4 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                    tool.enabled ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      tool.enabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-primary-50 border border-primary-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-primary-900 mb-2">
            Quick Tip
          </h3>
          <p className="text-sm text-primary-700">
            Enable multiple tools at once for a better accessibility experience.
            These tools work seamlessly with Chrome AI APIs.
          </p>
        </div>
      </div>
    </div>
  )
}

