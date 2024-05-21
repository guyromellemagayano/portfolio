import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import {
  AssetFieldsFragmentDoc,
  type AssetFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'
import { ctfFetcher } from '@guy-romelle-magayano/coin-colorful/libs'
import * as Types from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'
import {
  ComponentReferenceFieldsFragmentDoc,
  type ComponentReferenceFields_ComponentCta_Fragment,
  type ComponentReferenceFields_ComponentDuplex_Fragment,
  type ComponentReferenceFields_ComponentHeroBanner_Fragment,
  type ComponentReferenceFields_ComponentInfoBlock_Fragment,
  type ComponentReferenceFields_ComponentProductTable_Fragment,
  type ComponentReferenceFields_ComponentQuote_Fragment,
  type ComponentReferenceFields_ComponentTextBlock_Fragment,
  type ComponentReferenceFields_FooterMenu_Fragment,
  type ComponentReferenceFields_MenuGroup_Fragment,
  type ComponentReferenceFields_NavigationMenu_Fragment,
  type ComponentReferenceFields_Page_Fragment,
  type ComponentReferenceFields_Seo_Fragment,
  type ComponentReferenceFields_TopicBusinessInfo_Fragment,
  type ComponentReferenceFields_TopicPerson_Fragment,
  type ComponentReferenceFields_TopicProduct_Fragment,
  type ComponentReferenceFields_TopicProductFeature_Fragment
} from '@guy-romelle-magayano/coin-colorful/libs/shared-fragments/__generated/ctf-componentMap.generated'

export type QuoteFieldsFragment = {
  __typename: 'ComponentQuote'
  quoteAlignment?: boolean | null
  imagePosition?: boolean | null
  colorPalette?: string | null
  sys: { __typename?: 'Sys'; id: string }
  quote?: {
    __typename?: 'ComponentQuoteQuote'
    json: any
    links: {
      __typename?: 'ComponentQuoteQuoteLinks'
      entries: {
        __typename?: 'ComponentQuoteQuoteEntries'
        block: Array<
          | ({
              __typename?: 'ComponentCta'
            } & ComponentReferenceFields_ComponentCta_Fragment)
          | ({
              __typename?: 'ComponentDuplex'
            } & ComponentReferenceFields_ComponentDuplex_Fragment)
          | ({
              __typename?: 'ComponentHeroBanner'
            } & ComponentReferenceFields_ComponentHeroBanner_Fragment)
          | ({
              __typename?: 'ComponentInfoBlock'
            } & ComponentReferenceFields_ComponentInfoBlock_Fragment)
          | ({
              __typename?: 'ComponentProductTable'
            } & ComponentReferenceFields_ComponentProductTable_Fragment)
          | ({
              __typename?: 'ComponentQuote'
            } & ComponentReferenceFields_ComponentQuote_Fragment)
          | ({
              __typename?: 'ComponentTextBlock'
            } & ComponentReferenceFields_ComponentTextBlock_Fragment)
          | ({
              __typename?: 'FooterMenu'
            } & ComponentReferenceFields_FooterMenu_Fragment)
          | ({
              __typename?: 'MenuGroup'
            } & ComponentReferenceFields_MenuGroup_Fragment)
          | ({
              __typename?: 'NavigationMenu'
            } & ComponentReferenceFields_NavigationMenu_Fragment)
          | ({ __typename?: 'Page' } & ComponentReferenceFields_Page_Fragment)
          | ({ __typename?: 'Seo' } & ComponentReferenceFields_Seo_Fragment)
          | ({
              __typename?: 'TopicBusinessInfo'
            } & ComponentReferenceFields_TopicBusinessInfo_Fragment)
          | ({
              __typename?: 'TopicPerson'
            } & ComponentReferenceFields_TopicPerson_Fragment)
          | ({
              __typename?: 'TopicProduct'
            } & ComponentReferenceFields_TopicProduct_Fragment)
          | ({
              __typename?: 'TopicProductFeature'
            } & ComponentReferenceFields_TopicProductFeature_Fragment)
          | null
        >
      }
      assets: {
        __typename?: 'ComponentQuoteQuoteAssets'
        block: Array<({ __typename?: 'Asset' } & AssetFieldsFragment) | null>
      }
    }
  } | null
  image?: ({ __typename?: 'Asset' } & AssetFieldsFragment) | null
}

export type CtfQuoteQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfQuoteQuery = {
  __typename?: 'Query'
  componentQuote?:
    | ({ __typename?: 'ComponentQuote' } & QuoteFieldsFragment)
    | null
}

export const QuoteFieldsFragmentDoc = `
  fragment QuoteFields on ComponentQuote {
    __typename
    sys {
      id
    }
    quote {
      json
      links {
        entries {
          block {
            ...ComponentReferenceFields
          }
        }
        assets {
          block {
            ...AssetFields
          }
        }
      }
    }
    quoteAlignment
    image {
      ...AssetFields
    }
    imagePosition
    colorPalette
  }
`

export const CtfQuoteDocument = `
  query CtfQuote($id: String!, $locale: String, $preview: Boolean) {
    componentQuote(id: $id, locale: $locale, preview: $preview) {
      ...QuoteFields
    }
  }
  ${QuoteFieldsFragmentDoc}
  ${ComponentReferenceFieldsFragmentDoc}
  ${AssetFieldsFragmentDoc}
`

export const useCtfQuoteQuery = <TData = CtfQuoteQuery, TError = unknown>(
  variables: CtfQuoteQueryVariables,
  options?: UseQueryOptions<CtfQuoteQuery, TError, TData>
) => {
  return useQuery<CtfQuoteQuery, TError, TData>({
    queryKey: ['CtfQuote', variables],
    queryFn: ctfFetcher<CtfQuoteQuery, CtfQuoteQueryVariables>(
      CtfQuoteDocument,
      variables
    ),
    ...options
  })
}

useCtfQuoteQuery.getKey = (variables: CtfQuoteQueryVariables) => [
  'CtfQuote',
  variables
]
useCtfQuoteQuery.fetcher = (
  variables: CtfQuoteQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfQuoteQuery, CtfQuoteQueryVariables>(
    CtfQuoteDocument,
    variables,
    options
  )
