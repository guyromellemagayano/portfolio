'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  FooterCtfComponentFeature,
  useCtfFooterQuery
} from '@guy-romelle-magayano/coin-colorful/components'
import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'

/**
 * Renders the footer `graphql` feature component for the `contentful` API to consume
 * @returns The rendered feature component.
 */
const FooterGqlCtfComponentFeature = () => {
  const { locale, previewActive } = useContentfulContext(),
    { data, isLoading } = useCtfFooterQuery({
      locale,
      preview: previewActive
    }),
    footerMenuCollection = useContentfulLiveUpdates(
      data?.footerMenuCollection &&
        Object.keys(data?.footerMenuCollection)?.length > 0
        ? data.footerMenuCollection
        : null
    )

  if (!footerMenuCollection || isLoading) return null

  return (
    footerMenuCollection &&
    Object.keys(footerMenuCollection)?.length > 0 && (
      <FooterCtfComponentFeature {...footerMenuCollection} />
    )
  )
}

FooterGqlCtfComponentFeature.displayName = 'FooterGqlCtfComponentFeature'

export default FooterGqlCtfComponentFeature
