'use client'

import Head from 'next/head'
import { TSeoProps } from 'types/components'

/**
 * Renders SEO meta tags for the page.
 * @param {TSeoProps} props - The props object containing meta information.
 * @returns {JSX.Element} - The rendered SEO component.
 */
export default function Seo({ meta }: TSeoProps): JSX.Element {
  return (
    <Head>
      <title>{meta?.title || ''}</title>
      <meta name="description" content={meta?.description || ''} />
      <meta name="keywords" content={meta?.keywords || ''} />
    </Head>
  )
}
