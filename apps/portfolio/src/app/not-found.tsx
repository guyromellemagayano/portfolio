import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import {
  getNotFoundMetaDataQuery,
  getNotFoundPageDataQuery
} from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = await getClient().query({ query: getNotFoundMetaDataQuery })

  const pageMetadata = Object.fromEntries(
    Object.entries(data.notFoundPage.meta).filter(
      ([key]) => key !== '__typename'
    )
  )

  return {
    ...pageMetadata
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
  const { data } = await getClient().query({
    query: getNotFoundPageDataQuery
  })

  return (
    <ContentSimpleLayout
      className="sm:px-8"
      description={data?.notFoundPage?.hero?.description}
      heading={data?.notFoundPage?.hero?.heading}
    />
  )
}

export default NotFoundPage
