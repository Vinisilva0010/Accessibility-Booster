import Head from 'next/head'
import Layout from '@/components/Layout'
import AccessibilityToolsPage from '@/components/AccessibilityToolsPage'

export default function AccessibilityTools() {
  return (
    <>
      <Head>
        <title>Chrome AI - Accessibility Tools</title>
        <meta name="description" content="Chrome AI Accessibility Tools" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <AccessibilityToolsPage />
      </Layout>
    </>
  )
}

