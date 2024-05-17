import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  InfoBlockCtfComponentFeature,
  useCtfInfoBlockQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type InfoBlockGqlCtfComponentFeatureProps = {
  id: string
  locale: string
  preview: boolean
  previousComponent: string | null
}

/**
 * Renders an info block `graphql` feature component for the `contentful` API to consume.
 * @param {InfoBlockGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const InfoBlockGqlCtfComponentFeature = (
  props: InfoBlockGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, previousComponent } = props

  const { isLoading, data } = useCtfInfoBlockQuery({
      id,
      locale,
      preview
    }),
    componentInfoBlock = useContentfulLiveUpdates(
      data?.componentInfoBlock &&
        Object.keys(data?.componentInfoBlock)?.length > 0
        ? data.componentInfoBlock
        : null
    )

  if (isLoading || !componentInfoBlock) {
    return null
  }

  return (
    componentInfoBlock &&
    Object.keys(componentInfoBlock)?.length > 0 && (
      <InfoBlockCtfComponentFeature
        {...componentInfoBlock}
        previousComponent={previousComponent}
      />
    )
  )
}

InfoBlockGqlCtfComponentFeature.displayName = 'InfoBlockGqlCtfComponentFeature'

export default InfoBlockGqlCtfComponentFeature
