'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  QuoteCtfComponentFeature,
  useCtfQuoteQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type QuoteGqlCtfComponentFeatureProps = {
  id: string
  locale: string
  preview: boolean
}

/**
 * Renders the quote `graphql` feature component for the `contentful` API to consume.
 * @param { QuoteGqlCtfComponentFeatureProps } props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const QuoteGqlCtfComponentFeature = (
  props: QuoteGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview } = props

  const { isLoading, data } = useCtfQuoteQuery({
      id,
      locale,
      preview
    }),
    componentQuote = useContentfulLiveUpdates(
      data?.componentQuote && Object.keys(data?.componentQuote)?.length > 0
        ? data.componentQuote
        : null
    )

  if (isLoading || !componentQuote) {
    return null
  }

  return (
    componentQuote &&
    Object.keys(componentQuote)?.length > 0 && (
      <QuoteCtfComponentFeature {...componentQuote} />
    )
  )
}

QuoteGqlCtfComponentFeature.displayName = 'QuoteGqlCtfComponentFeature'

export default QuoteGqlCtfComponentFeature
