import { ApolloQueryResult } from '@apollo/client'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Script from 'next/script'

import {
  getHomePageAppQuery,
  getHomePageMetaQuery,
  type HomePageAppDataQuery,
  type HomePageMetaQuery
} from '@portfolio/graphql'
import { getClient } from '@portfolio/libs'

export const revalidate = 5

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { data } = (await getClient().query({
    query: getHomePageMetaQuery
  })) as ApolloQueryResult<HomePageMetaQuery>

  return {
    title: data?.homePage?.meta?.title || undefined,
    description: data?.homePage?.meta?.description || undefined
  }
}

// Dynamic imports
const HomeApp = dynamic(() =>
  import('@portfolio/components').then(mod => mod.HomeApp)
)

/**
 * Renders the home page.
 * @returns The rendered home page
 */
const HomePage = async () => {
  const { data } = (await getClient().query({
    query: getHomePageAppQuery
  })) as ApolloQueryResult<HomePageAppDataQuery>

  if (!data) return null

  return (
    <>
      <Script
        id="homepage-structured-data"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            ...(data?.homePage?.structuredData || undefined)
          })
        }}
      />
      <HomeApp data={data} />
    </>
  )
}

HomePage.displayName = 'HomePage'

export default HomePage
