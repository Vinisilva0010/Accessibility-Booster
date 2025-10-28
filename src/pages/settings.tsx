import Head from 'next/head'
import Layout from '@/components/Layout'
import SettingsPage from '@/components/SettingsPage'

export default function Settings() {
  return (
    <>
      <Head>
        <title>Accessibility Booster - Configurações</title>
        <meta
          name="description"
          content="Configurações de acessibilidade e personalização"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Layout>
        <SettingsPage />
      </Layout>
    </>
  )
}
