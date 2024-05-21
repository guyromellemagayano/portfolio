import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import {
  AssetFieldsFragmentDoc,
  PageLinkFieldsFragmentDoc,
  type AssetFieldsFragment,
  type PageLinkFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { ctfFetcher } from '@guy-romelle-magayano/coin-colorful/libs'
import * as Types from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'

export type DuplexFieldsFragment = {
  __typename: 'ComponentDuplex'
  containerLayout?: boolean | null
  headline?: string | null
  ctaText?: string | null
  imageStyle?: boolean | null
  colorPalette?: string | null
  sys: { __typename?: 'Sys'; id: string }
  bodyText?: { __typename?: 'ComponentDuplexBodyText'; json: any } | null
  targetPage?: ({ __typename?: 'Page' } & PageLinkFieldsFragment) | null
  image?: ({ __typename?: 'Asset' } & AssetFieldsFragment) | null
}

export type CtfDuplexQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfDuplexQuery = {
  __typename?: 'Query'
  componentDuplex?:
    | ({ __typename?: 'ComponentDuplex' } & DuplexFieldsFragment)
    | null
}

export const DuplexFieldsFragmentDoc = `
  fragment DuplexFields on ComponentDuplex {
    __typename
    sys {
      id
    }
    containerLayout
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
    colorPalette
  }
`

export const CtfDuplexDocument = `
  query CtfDuplex($id: String!, $locale: String, $preview: Boolean) {
    componentDuplex(id: $id, locale: $locale, preview: $preview) {
      ...DuplexFields
    }
  }
  ${DuplexFieldsFragmentDoc}
  ${PageLinkFieldsFragmentDoc}
  ${AssetFieldsFragmentDoc}
`

export const useCtfDuplexQuery = <TData = CtfDuplexQuery, TError = unknown>(
  variables: CtfDuplexQueryVariables,
  options?: UseQueryOptions<CtfDuplexQuery, TError, TData>
) => {
  return useQuery<CtfDuplexQuery, TError, TData>({
    queryKey: ['CtfDuplex', variables],
    queryFn: ctfFetcher<CtfDuplexQuery, CtfDuplexQueryVariables>(
      CtfDuplexDocument,
      variables
    ),
    ...options
  })
}

useCtfDuplexQuery.getKey = (variables: CtfDuplexQueryVariables) => [
  'CtfDuplex',
  variables
]

useCtfDuplexQuery.fetcher = (
  variables: CtfDuplexQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfDuplexQuery, CtfDuplexQueryVariables>(
    CtfDuplexDocument,
    variables,
    options
  )
