'use client'

import { useEffect, useState } from 'react'

import { ApolloQueryResult } from '@apollo/client'
import * as Sentry from '@sentry/nextjs'
import dynamic from 'next/dynamic'

import {
  type ErrorPageDataQuery,
  getErrorPageDataQuery
} from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'

// Dynamic imports
const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)

export type TCustomErrorPageProps = {
  error: Error
}

/**
 * Render the custom error page.
 * @param {TCustomErrorPageProps} props - The page props
 * @returns The rendered custom error page
 */
const CustomErrorPage = ({ error: pageError }: TCustomErrorPageProps) => {
  const [data, setData] = useState<ErrorPageDataQuery | null>(null)

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const { data } = (await getClient().query({
          query: getErrorPageDataQuery
        })) as ApolloQueryResult<ErrorPageDataQuery>

        setData(data)
      } catch (err) {
        Sentry.captureException(err)
      }
    }

    fetchPageData()
  }, [])

  useEffect(() => {
    if (pageError) Sentry.captureException(pageError)
  }, [pageError])

  if (!data) return null

  return (
    <ContentSimpleLayout
      className="sm:px-8"
      heading={data?.errorPage?.hero?.heading}
      description={data?.errorPage?.hero?.description}
    />
  )
}

CustomErrorPage.displayName = 'CustomErrorPage'

export default CustomErrorPage
