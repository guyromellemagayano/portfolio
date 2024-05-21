import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import {
  PageLinkFieldsFragmentDoc,
  type PageLinkFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { ctfFetcher } from '@guy-romelle-magayano/coin-colorful/libs'
import * as Types from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'

export type CtaFieldsFragment = {
  __typename: 'ComponentCta'
  headline?: string | null
  ctaText?: string | null
  urlParameters?: string | null
  colorPalette?: string | null
  sys: { __typename?: 'Sys'; id: string }
  subline?: { __typename?: 'ComponentCtaSubline'; json: any } | null
  targetPage?: ({ __typename?: 'Page' } & PageLinkFieldsFragment) | null
}

export type CtfCtaQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfCtaQuery = {
  __typename?: 'Query'
  componentCta?: ({ __typename?: 'ComponentCta' } & CtaFieldsFragment) | null
}

export const CtaFieldsFragmentDoc = `
  fragment CtaFields on ComponentCta {
    __typename
    sys {
      id
    }
    headline
    subline {
      json
    }
    ctaText
    targetPage {
      ...PageLinkFields
    }
    urlParameters
    colorPalette
  }
`

export const CtfCtaDocument = `
  query CtfCta($id: String!, $locale: String, $preview: Boolean) {
    componentCta(id: $id, locale: $locale, preview: $preview) {
      ...CtaFields
    }
  }
  ${CtaFieldsFragmentDoc}
  ${PageLinkFieldsFragmentDoc}
`

export const useCtfCtaQuery = <TData = CtfCtaQuery, TError = unknown>(
  variables: CtfCtaQueryVariables,
  options?: UseQueryOptions<CtfCtaQuery, TError, TData>
) => {
  return useQuery<CtfCtaQuery, TError, TData>({
    queryKey: ['CtfCta', variables],
    queryFn: ctfFetcher<CtfCtaQuery, CtfCtaQueryVariables>(
      CtfCtaDocument,
      variables
    ),
    ...options
  })
}

useCtfCtaQuery.getKey = (variables: CtfCtaQueryVariables) => [
  'CtfCta',
  variables
]
useCtfCtaQuery.fetcher = (
  variables: CtfCtaQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfCtaQuery, CtfCtaQueryVariables>(
    CtfCtaDocument,
    variables,
    options
  )
