import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import {
  AssetFieldsFragmentDoc,
  ProductFeatureFieldsFragmentDoc,
  ProductFieldsFragmentDoc,
  type ProductFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { ctfFetcher } from '@guy-romelle-magayano/coin-colorful/libs'
import * as Types from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'

export type ProductTableFieldsFragment = {
  __typename: 'ComponentProductTable'
  headline?: string | null
  subline?: string | null
  sys: { __typename?: 'Sys'; id: string }
  productsCollection?: {
    __typename?: 'ComponentProductTableProductsCollection'
    items: Array<
      ({ __typename?: 'TopicProduct' } & ProductFieldsFragment) | null
    >
  } | null
}

export type CtfProductTableQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfProductTableQuery = {
  __typename?: 'Query'
  componentProductTable?:
    | ({ __typename?: 'ComponentProductTable' } & ProductTableFieldsFragment)
    | null
}

export const ProductTableFieldsFragmentDoc = `
  fragment ProductTableFields on ComponentProductTable {
    __typename
    sys {
      id
    }
    headline
    subline
    productsCollection(limit: 3) {
      items {
        ...ProductFields
      }
    }
  }
`

export const CtfProductTableDocument = `
  query CtfProductTable($id: String!, $locale: String, $preview: Boolean) {
    componentProductTable(id: $id, preview: $preview, locale: $locale) {
      ...ProductTableFields
    }
  }
  ${ProductTableFieldsFragmentDoc}
  ${ProductFieldsFragmentDoc}
  ${AssetFieldsFragmentDoc}
  ${ProductFeatureFieldsFragmentDoc}
`

export const useCtfProductTableQuery = <
  TData = CtfProductTableQuery,
  TError = unknown
>(
  variables: CtfProductTableQueryVariables,
  options?: UseQueryOptions<CtfProductTableQuery, TError, TData>
) => {
  return useQuery<CtfProductTableQuery, TError, TData>({
    queryKey: ['CtfProductTable', variables],
    queryFn: ctfFetcher<CtfProductTableQuery, CtfProductTableQueryVariables>(
      CtfProductTableDocument,
      variables
    ),
    ...options
  })
}

useCtfProductTableQuery.getKey = (variables: CtfProductTableQueryVariables) => [
  'CtfProductTable',
  variables
]
useCtfProductTableQuery.fetcher = (
  variables: CtfProductTableQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfProductTableQuery, CtfProductTableQueryVariables>(
    CtfProductTableDocument,
    variables,
    options
  )
