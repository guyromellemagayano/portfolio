import { ApolloQueryResult } from '@apollo/client'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  getNotFoundMetaDataQuery,
  getNotFoundPageDataQuery,
  type NotFoundMetaDataQuery,
  type NotFoundPageDataQuery
} from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = (await getClient().query({
    query: getNotFoundMetaDataQuery
  })) as ApolloQueryResult<NotFoundMetaDataQuery>

  return {
    title: data?.notFoundPage?.meta?.title || undefined,
    description: data?.notFoundPage?.meta?.description || undefined
  }
}

// Dynamic imports
const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)

/**
 * Render the custom not found app page.
 * @returns The rendered custom not found app page
 */
const NotFoundPage = async () => {
  const { data } = (await getClient().query({
    query: getNotFoundPageDataQuery
  })) as ApolloQueryResult<NotFoundPageDataQuery>

  if (!data) return null

  return (
    <ContentSimpleLayout
      className="sm:px-8"
      heading={data?.notFoundPage?.hero?.heading}
      description={data?.notFoundPage?.hero?.description}
    />
  )
}

export default NotFoundPage
