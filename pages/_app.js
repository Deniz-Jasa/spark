import { Suspense } from 'react'
import Layout from '../app/layout'
import ConvexClientProvider from '@/app/ConvexClientProvider'
 
export default function MyApp({ Component, pageProps }) {
  return (
    <ConvexClientProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </ConvexClientProvider>
  )
}