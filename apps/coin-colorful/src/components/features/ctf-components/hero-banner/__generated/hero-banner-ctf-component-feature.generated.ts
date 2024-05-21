import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import {
  AssetFieldsFragmentDoc,
  PageLinkFieldsFragmentDoc,
  type AssetFieldsFragment,
  type PageLinkFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { ctfFetcher } from '@guy-romelle-magayano/coin-colorful/libs'
import * as Types from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'

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
  ${AssetFieldsFragmentDoc}
`

export const useCtfHeroBannerQuery = <
  TData = CtfHeroBannerQuery,
  TError = unknown
>(
  variables: CtfHeroBannerQueryVariables,
  options?: UseQueryOptions<CtfHeroBannerQuery, TError, TData>
) => {
  return useQuery<CtfHeroBannerQuery, TError, TData>({
    queryKey: ['CtfHeroBanner', variables],
    queryFn: ctfFetcher<CtfHeroBannerQuery, CtfHeroBannerQueryVariables>(
      CtfHeroBannerDocument,
      variables
    ),
    ...options
  })
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
