'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'
import { Container } from '@mui/material'

import {
  EntryNotFoundErrorFeature,
  ProductTableCtfComponentFeature,
  useCtfProductTableQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type ProductTableGqlCtfComponentFeatureProps = {
  id: string
  locale: string
  preview?: boolean
}

/**
 * Renders the product table `graphql` feature component for the `contentful` API to consume.
 * @param {ProductTableGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const ProductTableGqlCtfComponentFeature = (
  props: ProductTableGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview } = props

  const { isLoading, data } = useCtfProductTableQuery({
      id,
      locale,
      preview
    }),
    componentProductTable = useContentfulLiveUpdates(
      data?.componentProductTable &&
        Object.keys(data?.componentProductTable)?.length > 0
        ? data.componentProductTable
        : null
    )

  if (isLoading || !componentProductTable) {
    return null
  }

  if (!componentProductTable) {
    return (
      <Container>
        <EntryNotFoundErrorFeature />
      </Container>
    )
  }

  return (
    componentProductTable &&
    Object.keys(componentProductTable)?.length > 0 && (
      <ProductTableCtfComponentFeature {...componentProductTable} />
    )
  )
}

ProductTableGqlCtfComponentFeature.displayName =
  'ProductTableGqlCtfComponentFeature'

export default ProductTableGqlCtfComponentFeature
