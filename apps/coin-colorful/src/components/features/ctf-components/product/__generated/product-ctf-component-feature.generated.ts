import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import {
  AssetFieldsFragmentDoc,
  ProductFeatureFieldsFragmentDoc,
  type AssetFieldsFragment,
  type ProductFeatureFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { ctfFetcher } from '@guy-romelle-magayano/coin-colorful/libs'
import * as Types from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'

export type ProductFieldsFragment = {
  __typename: 'TopicProduct'
  name?: string | null
  price?: number | null
  sys: { __typename?: 'Sys'; id: string }
  featuredImage?: ({ __typename?: 'Asset' } & AssetFieldsFragment) | null
  description?: { __typename?: 'TopicProductDescription'; json: any } | null
  featuresCollection?: {
    __typename?: 'TopicProductFeaturesCollection'
    items: Array<
      | ({ __typename?: 'TopicProductFeature' } & ProductFeatureFieldsFragment)
      | null
    >
  } | null
}

export type CtfProductQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfProductQuery = {
  __typename?: 'Query'
  topicProduct?:
    | ({ __typename?: 'TopicProduct' } & ProductFieldsFragment)
    | null
}

export const ProductFieldsFragmentDoc = `
  fragment ProductFields on TopicProduct {
    __typename
    sys {
      id
    }
    name
    featuredImage {
      ...AssetFields
    }
    description {
      json
    }
    price
    featuresCollection(limit: 30) {
      items {
        ...ProductFeatureFields
      }
    }
  }
`

export const CtfProductDocument = `
  query CtfProduct($id: String!, $locale: String, $preview: Boolean) {
    topicProduct(id: $id, preview: $preview, locale: $locale) {
      ...ProductFields
    }
  }
  ${ProductFieldsFragmentDoc}
  ${AssetFieldsFragmentDoc}
  ${ProductFeatureFieldsFragmentDoc}
`

export const useCtfProductQuery = <TData = CtfProductQuery, TError = unknown>(
  variables: CtfProductQueryVariables,
  options?: UseQueryOptions<CtfProductQuery, TError, TData>
) => {
  return useQuery<CtfProductQuery, TError, TData>({
    queryKey: ['CtfProduct', variables],
    queryFn: ctfFetcher<CtfProductQuery, CtfProductQueryVariables>(
      CtfProductDocument,
      variables
    ),
    ...options
  })
}

useCtfProductQuery.getKey = (variables: CtfProductQueryVariables) => [
  'CtfProduct',
  variables
]
useCtfProductQuery.fetcher = (
  variables: CtfProductQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfProductQuery, CtfProductQueryVariables>(
    CtfProductDocument,
    variables,
    options
  )
