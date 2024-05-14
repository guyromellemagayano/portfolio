import * as Types from '../../../../../libs/__generated/graphql.types'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ctfFetcher } from '../../../../../libs'
import {
  AssetFieldsFragment,
  AssetFieldsFragmentDoc
} from '../../asset/__generated/asset-ctf-component-feature.generated'
export type ProductFeatureFieldsFragment = {
  __typename: 'TopicProductFeature'
  name?: string | null
  sys: { __typename?: 'Sys'; id: string }
  longDescription?: {
    __typename?: 'TopicProductFeatureLongDescription'
    json: any
    links: {
      __typename?: 'TopicProductFeatureLongDescriptionLinks'
      assets: {
        __typename?: 'TopicProductFeatureLongDescriptionAssets'
        block: Array<({ __typename?: 'Asset' } & AssetFieldsFragment) | null>
      }
    }
  } | null
  shortDescription?: {
    __typename?: 'TopicProductFeatureShortDescription'
    json: any
    links: {
      __typename?: 'TopicProductFeatureShortDescriptionLinks'
      assets: {
        __typename?: 'TopicProductFeatureShortDescriptionAssets'
        block: Array<({ __typename?: 'Asset' } & AssetFieldsFragment) | null>
      }
    }
  } | null
}

export type CtfProductFeatureQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfProductFeatureQuery = {
  __typename?: 'Query'
  topicProductFeature?:
    | ({ __typename?: 'TopicProductFeature' } & ProductFeatureFieldsFragment)
    | null
}

export const ProductFeatureFieldsFragmentDoc = `
    fragment ProductFeatureFields on TopicProductFeature {
  __typename
  sys {
    id
  }
  name
  longDescription {
    json
    links {
      assets {
        block {
          ...AssetFields
        }
      }
    }
  }
  shortDescription {
    json
    links {
      assets {
        block {
          ...AssetFields
        }
      }
    }
  }
}
    `
export const CtfProductFeatureDocument = `
    query CtfProductFeature($id: String!, $locale: String, $preview: Boolean) {
  topicProductFeature(id: $id, preview: $preview, locale: $locale) {
    ...ProductFeatureFields
  }
}
    ${ProductFeatureFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`

export const useCtfProductFeatureQuery = <
  TData = CtfProductFeatureQuery,
  TError = unknown
>(
  variables: CtfProductFeatureQueryVariables,
  options?: UseQueryOptions<CtfProductFeatureQuery, TError, TData>
) => {
  return useQuery<CtfProductFeatureQuery, TError, TData>(
    ['CtfProductFeature', variables],
    ctfFetcher<CtfProductFeatureQuery, CtfProductFeatureQueryVariables>(
      CtfProductFeatureDocument,
      variables
    ),
    options
  )
}

useCtfProductFeatureQuery.getKey = (
  variables: CtfProductFeatureQueryVariables
) => ['CtfProductFeature', variables]

useCtfProductFeatureQuery.fetcher = (
  variables: CtfProductFeatureQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfProductFeatureQuery, CtfProductFeatureQueryVariables>(
    CtfProductFeatureDocument,
    variables,
    options
  )
