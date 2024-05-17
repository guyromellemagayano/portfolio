import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  CtaCtfComponentFeature,
  useCtfCtaQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type CtaGqlCtlComponentFeatureProps = {
  id: string
  locale: string
  preview: boolean
}

/**
 * Renders the CTA `graphql` feature component for the `contentful` API to consume.
 * @param {CtaGqlCtlComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const CtaGqlCtfComponentFeature = (props: CtaGqlCtlComponentFeatureProps) => {
  const { id, locale, preview } = props

  const { data, isLoading } = useCtfCtaQuery({
      id,
      locale,
      preview
    }),
    componentCta = useContentfulLiveUpdates(
      data?.componentCta && Object.keys(data?.componentCta)?.length > 0
        ? data.componentCta
        : null
    )

  if (isLoading || !componentCta) {
    return null
  }

  return (
    componentCta &&
    Object.keys(componentCta)?.length > 0 && (
      <CtaCtfComponentFeature {...componentCta} />
    )
  )
}

CtaGqlCtfComponentFeature.displayName = 'CtaGqlCtfComponentFeature'

export default CtaGqlCtfComponentFeature
