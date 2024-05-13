import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  MobileMenuCtfComponentFeature,
  useCtfNavigationQuery
} from '@guy-romelle-magayano/coin-colorful/components'
import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'

export type MobileMenuGqlCtfComponentFeatureProps = {
  isOpen?: boolean
  onOpenChange: (isOpen: boolean) => any
}

/**
 * Renders the mobile menu component for the `contentful` API to consume.
 * @param {MobileMenuGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const MobileMenuGqlCtfComponentFeature = (
  props: MobileMenuGqlCtfComponentFeatureProps
) => {
  const { locale, previewActive } = useContentfulContext(),
    { data, isLoading } = useCtfNavigationQuery({
      locale,
      preview: previewActive
    }),
    navigationMenuCollection =
      data?.navigationMenuCollection &&
      Object.keys(data.navigationMenuCollection)?.length > 0
        ? useContentfulLiveUpdates(data.navigationMenuCollection)
        : null

  if (!navigationMenuCollection || isLoading) return null

  return (
    navigationMenuCollection &&
    Object.keys(navigationMenuCollection)?.length > 0 && (
      <MobileMenuCtfComponentFeature {...props} {...navigationMenuCollection} />
    )
  )
}

MobileMenuGqlCtfComponentFeature.displayName =
  'MobileMenuGqlCtfComponentFeature'

export default MobileMenuGqlCtfComponentFeature
