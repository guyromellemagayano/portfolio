import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  NavigationCtfComponentFeature,
  useCtfNavigationQuery
} from '@guy-romelle-magayano/coin-colorful/components'
import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'

/**
 * Renders the navigation `graphql` feature component for the `contentful` API to consume.
 * @returns The rendered feature component.
 */
const NavigationGqlCtfComponentFeature = () => {
  const { locale, previewActive } = useContentfulContext(),
    { data, isLoading } = useCtfNavigationQuery({
      locale,
      preview: previewActive
    }),
    navigationMenuCollection = useContentfulLiveUpdates(
      data?.navigationMenuCollection &&
        Object.keys(data?.navigationMenuCollection)?.length > 0
        ? data.navigationMenuCollection
        : null
    )

  if (!navigationMenuCollection || isLoading) return null

  return (
    navigationMenuCollection &&
    Object.keys(navigationMenuCollection)?.length > 0 && (
      <NavigationCtfComponentFeature {...navigationMenuCollection} />
    )
  )
}

NavigationGqlCtfComponentFeature.displayName =
  'NavigationGqlCtfComponentFeature'

export default NavigationGqlCtfComponentFeature
