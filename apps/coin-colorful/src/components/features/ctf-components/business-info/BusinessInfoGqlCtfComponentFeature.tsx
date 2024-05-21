'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'
import { Container } from '@mui/material'
import Head from 'next/head'

import { Meta } from '@guy-romelle-magayano/react-components/server'

import {
  BusinessInfoCtfComponentFeature,
  EntryNotFoundErrorFeature,
  useCtfBusinessInfoQuery
} from '@guy-romelle-magayano/coin-colorful/components'
import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'

export type BusinessInfoGqlCtfComponentFeatureProps = {
  preview?: boolean
  id: string
}

/**
 * Renders the business info `graphql` feature component for the `contentful` API to consume.
 * @param {BusinessInfoGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const BusinessInfoGqlCtfComponentFeature = (
  props: BusinessInfoGqlCtfComponentFeatureProps
) => {
  const { id, preview } = props

  const { locale } = useContentfulContext(),
    { data, isLoading } = useCtfBusinessInfoQuery({
      locale,
      id,
      preview
    }),
    topicBusinessInfo = useContentfulLiveUpdates(
      data?.topicBusinessInfo &&
        Object.keys(data?.topicBusinessInfo)?.length > 0
        ? data.topicBusinessInfo
        : null
    )

  if (!data || isLoading) {
    return null
  }

  if (!topicBusinessInfo) {
    return (
      <Container>
        <EntryNotFoundErrorFeature />
      </Container>
    )
  }

  return (
    <>
      {topicBusinessInfo?.featuredImage?.url &&
        topicBusinessInfo?.featuredImage?.url?.length > 0 && (
          <Head>
            <Meta
              key="og:image"
              property="og:image"
              content={`${topicBusinessInfo.featuredImage.url}?w=1200&h=630&f=faces&fit=fill`}
            />
          </Head>
        )}

      {topicBusinessInfo && Object.keys(topicBusinessInfo)?.length > 0 && (
        <BusinessInfoCtfComponentFeature {...topicBusinessInfo} />
      )}
    </>
  )
}

BusinessInfoGqlCtfComponentFeature.displayName =
  'BusinessInfoGqlCtfComponentFeature'

export default BusinessInfoGqlCtfComponentFeature
