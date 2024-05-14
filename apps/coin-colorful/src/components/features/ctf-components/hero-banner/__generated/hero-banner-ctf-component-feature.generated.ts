import * as Types from '../../../../../libs/__generated/graphql.types'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ctfFetcher } from '../../../../../libs'
import {
  PageLinkFieldsFragment,
  PageLinkFieldsFragmentDoc
} from '../../../page-link/__generated/page-link-feature.generated'
import {
  AssetFieldsFragment,
  AssetFieldsFragmentDoc
} from '../../asset/__generated/asset-ctf-component-feature.generated'
export type HeroBannerFieldsFragment = {
  __typename: 'ComponentHeroBanner'
  headline?: string | null
  ctaText?: string | null
  imageStyle?: boolean | null
  heroSize?: boolean | null
  colorPalette?: string | null
  sys: { __typename?: 'Sys'; id: string }
  bodyText?: { __typename?: 'ComponentHeroBannerBodyText'; json: any } | null
  targetPage?: ({ __typename?: 'Page' } & PageLinkFieldsFragment) | null
  image?: ({ __typename?: 'Asset' } & AssetFieldsFragment) | null
}

export type CtfHeroBannerQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfHeroBannerQuery = {
  __typename?: 'Query'
  componentHeroBanner?:
    | ({ __typename?: 'ComponentHeroBanner' } & HeroBannerFieldsFragment)
    | null
}

export const HeroBannerFieldsFragmentDoc = `
    fragment HeroBannerFields on ComponentHeroBanner {
  __typename
  sys {
    id
  }
  headline
  bodyText {
    json
  }
  ctaText
  targetPage {
    ...PageLinkFields
  }
  image {
    ...AssetFields
  }
  imageStyle
  heroSize
  colorPalette
}
    `
export const CtfHeroBannerDocument = `
    query CtfHeroBanner($id: String!, $locale: String, $preview: Boolean) {
  componentHeroBanner(id: $id, locale: $locale, preview: $preview) {
    ...HeroBannerFields
  }
}
    ${HeroBannerFieldsFragmentDoc}
${PageLinkFieldsFragmentDoc}
${AssetFieldsFragmentDoc}`

export const useCtfHeroBannerQuery = <
  TData = CtfHeroBannerQuery,
  TError = unknown
>(
  variables: CtfHeroBannerQueryVariables,
  options?: UseQueryOptions<CtfHeroBannerQuery, TError, TData>
) => {
  return useQuery<CtfHeroBannerQuery, TError, TData>(
    ['CtfHeroBanner', variables],
    ctfFetcher<CtfHeroBannerQuery, CtfHeroBannerQueryVariables>(
      CtfHeroBannerDocument,
      variables
    ),
    options
  )
}

useCtfHeroBannerQuery.getKey = (variables: CtfHeroBannerQueryVariables) => [
  'CtfHeroBanner',
  variables
]

useCtfHeroBannerQuery.fetcher = (
  variables: CtfHeroBannerQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfHeroBannerQuery, CtfHeroBannerQueryVariables>(
    CtfHeroBannerDocument,
    variables,
    options
  )
