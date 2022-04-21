import { RecoilRoot } from 'recoil'
import Head from 'next/head'
import { MainLayout } from '@components/layout'
import '@styles/globals.css'
// import { GlobalStyles } from 'twin.macro'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <MainLayout>
        <Head>
          <title>Cari Hewan</title>
          <meta name="description" content="Cari hewan favoritmu melalui carihewan.com" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
        <div id="modal-container" className="z-50" />
      </MainLayout>
    </RecoilRoot>
  )
}

export default MyApp
