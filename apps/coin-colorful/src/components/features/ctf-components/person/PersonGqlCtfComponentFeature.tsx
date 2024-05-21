'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'

import {
  PersonCtfComponentFeature,
  useCtfPersonQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type PersonGqlCtfComponentFeatureProps = {
  id: string
  locale: string
  preview: boolean
  previousComponent: string | null
}

/**
 * Renders the person feature component for the `contentful` API to consume.
 * @param {PersonGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PersonGqlCtfComponentFeature = (
  props: PersonGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview, previousComponent } = props

  const { isLoading, data } = useCtfPersonQuery({
      id,
      locale,
      preview
    }),
    topicPerson = useContentfulLiveUpdates(
      data?.topicPerson && Object.keys(data?.topicPerson)?.length > 0
        ? data.topicPerson
        : null
    )

  if (isLoading || !topicPerson) {
    return null
  }

  return (
    topicPerson &&
    Object.keys(topicPerson)?.length > 0 && (
      <PersonCtfComponentFeature
        {...topicPerson}
        previousComponent={previousComponent}
      />
    )
  )
}

PersonGqlCtfComponentFeature.displayName = 'PersonGqlCtfComponentFeature'

export default PersonGqlCtfComponentFeature
