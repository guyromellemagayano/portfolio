'use client'

import { useEffect, useState } from 'react'

import * as Sentry from '@sentry/nextjs'
import dynamic from 'next/dynamic'

// import { ContentLayout } from '@portfolio/components'
import { getErrorPageDataQuery } from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'

export type TCustomErrorPageProps = {
  error: Error
}

const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)

/**
 * Render the custom error page.
 * @param {TCustomErrorPageProps} props - The page props
 * @returns The rendered custom error page
 */
const CustomErrorPage = ({ error: pageError }: TCustomErrorPageProps) => {
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    if (pageError) Sentry.captureException(pageError)
  }, [pageError])

  useEffect(() => {
    const fetchPageData = async () => {
      const client = getClient()

      try {
        const { data } = await client.query({ query: getErrorPageDataQuery })

        setData(data)
      } catch (err) {
        Sentry.captureException(err)
      }
    }

    fetchPageData()
  }, [])

  return (
    <ContentSimpleLayout
      className="sm:px-8"
      description={data?.errorPage?.hero?.description}
      heading={data?.errorPage?.hero?.heading}
    />
  )
}

CustomErrorPage.displayName = 'CustomErrorPage'

export default CustomErrorPage
