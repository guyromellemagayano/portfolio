import { ISeoProps } from '@/interfaces/components'
import Head from 'next/head'

// SEO component
const Seo = ({ meta }: ISeoProps): React.ReactNode => {
  return (
    <Head>
      <title>{meta?.title || ''}</title>
      <meta name="description" content={meta?.description || ''} />
      <meta name="keywords" content={meta?.keywords || ''} />
    </Head>
  )
}

export default Seo
