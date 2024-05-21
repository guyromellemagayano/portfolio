'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'
import { Container } from '@mui/material'
import Head from 'next/head'

import { Meta } from '@guy-romelle-magayano/react-components/server'

import {
  EntryNotFoundErrorFeature,
  ProductCtfComponentFeature,
  useCtfProductQuery
} from '@guy-romelle-magayano/coin-colorful/components'

export type ProductGqlCtfComponentFeatureProps = {
  id: string
  locale: string
  preview?: boolean
}

/**
 * Renders the product `graphql` feature component for the `contentful` API to consume.
 * @param {ProductGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const ProductGqlCtfComponentFeature = (
  props: ProductGqlCtfComponentFeatureProps
) => {
  const { id, locale, preview } = props

  const { isLoading, data } = useCtfProductQuery({
      id,
      locale,
      preview
    }),
    topicProduct = useContentfulLiveUpdates(
      data?.topicProduct && Object.keys(data?.topicProduct)?.length > 0
        ? data.topicProduct
        : null
    )

  if (!data || isLoading) {
    return null
  }

  if (!topicProduct) {
    return (
      <Container>
        <EntryNotFoundErrorFeature />
      </Container>
    )
  }

  return (
    <>
      {topicProduct?.featuredImage?.url &&
        topicProduct?.featuredImage?.url?.length > 0 && (
          <Head>
            <Meta
              key="og:image"
              property="og:image"
              content={`${topicProduct.featuredImage.url}?w=1200&h=630&f=faces&fit=fill`}
            />
          </Head>
        )}

      {topicProduct && Object.keys(topicProduct)?.length > 0 && (
        <ProductCtfComponentFeature {...topicProduct} />
      )}
    </>
  )
}

ProductGqlCtfComponentFeature.displayName = 'ProductGqlCtfComponentFeature'

export default ProductGqlCtfComponentFeature
