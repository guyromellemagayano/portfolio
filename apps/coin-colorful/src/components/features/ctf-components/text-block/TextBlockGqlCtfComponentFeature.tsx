'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  TextBlockCtfComponentFeature,
  useCtfTextBlockQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type TextBlockGqlCtfComponentFeatureProps = {
  id: string
  locale: string
  preview: boolean
}

/**
 * Renders the text block `graphql` feature component for the `contentful` API to consume.
 * @param {TextBlockGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const TextBlockGqlCtfComponentFeature = (
  props: TextBlockGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview } = props

  const { isLoading, data } = useCtfTextBlockQuery({
      id,
      locale,
      preview
    }),
    componentTextBlock = useContentfulLiveUpdates(
      data?.componentTextBlock &&
        Object.keys(data?.componentTextBlock)?.length > 0
        ? data.componentTextBlock
        : null
    )

  if (isLoading || !componentTextBlock) {
    return null
  }

  return (
    componentTextBlock &&
    Object.keys(componentTextBlock)?.length > 0 && (
      <TextBlockCtfComponentFeature {...componentTextBlock} />
    )
  )
}

TextBlockGqlCtfComponentFeature.displayName = 'TextBlockGqlCtfComponentFeature'

export default TextBlockGqlCtfComponentFeature
