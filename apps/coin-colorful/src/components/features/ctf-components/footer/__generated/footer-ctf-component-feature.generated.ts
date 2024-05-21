import { useQuery, UseQueryOptions } from '@tanstack/react-query'

import { PageLinkFieldsFragmentDoc } from '@guy-romelle-magayano/coin-colorful/components'
import { ctfFetcher } from '@guy-romelle-magayano/coin-colorful/libs'
import * as Types from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'
import {
  MenuGroupFieldsFragmentDoc,
  type MenuGroupFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/libs/shared-fragments/__generated/ctf-menuGroup.generated'

export type FooterFieldsFragment = {
  __typename?: 'FooterMenuCollection'
  items: Array<{
    __typename: 'FooterMenu'
    twitterLink?: string | null
    facebookLink?: string | null
    linkedinLink?: string | null
    instagramLink?: string | null
    sys: { __typename?: 'Sys'; id: string }
    menuItemsCollection?: {
      __typename?: 'FooterMenuMenuItemsCollection'
      items: Array<{
        __typename: 'MenuGroup'
        groupName?: string | null
        sys: { __typename?: 'Sys'; id: string }
        featuredPagesCollection?:
          | ({
              __typename?: 'MenuGroupFeaturedPagesCollection'
            } & MenuGroupFieldsFragment)
          | null
      } | null>
    } | null
    legalLinks?: {
      __typename?: 'MenuGroup'
      featuredPagesCollection?:
        | ({
            __typename?: 'MenuGroupFeaturedPagesCollection'
          } & MenuGroupFieldsFragment)
        | null
    } | null
  } | null>
}

export type CtfFooterQueryVariables = Types.Exact<{
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfFooterQuery = {
  __typename?: 'Query'
  footerMenuCollection?:
    | ({ __typename?: 'FooterMenuCollection' } & FooterFieldsFragment)
    | null
}

export const FooterFieldsFragmentDoc = `
  fragment FooterFields on FooterMenuCollection {
    items {
      __typename
      sys {
        id
      }
      menuItemsCollection {
        items {
          __typename
          groupName
          sys {
            id
          }
          featuredPagesCollection {
            ...MenuGroupFields
          }
        }
      }
      legalLinks {
        featuredPagesCollection {
          ...MenuGroupFields
        }
      }
      twitterLink
      facebookLink
      linkedinLink
      instagramLink
    }
  }
`

export const CtfFooterDocument = `
  query CtfFooter($locale: String, $preview: Boolean) {
    footerMenuCollection(locale: $locale, preview: $preview, limit: 1) {
      ...FooterFields
    }
  }
  ${FooterFieldsFragmentDoc}
  ${MenuGroupFieldsFragmentDoc}
  ${PageLinkFieldsFragmentDoc}
`

export const useCtfFooterQuery = <TData = CtfFooterQuery, TError = unknown>(
  variables?: CtfFooterQueryVariables,
  options?: UseQueryOptions<CtfFooterQuery, TError, TData>
) => {
  return useQuery<CtfFooterQuery, TError, TData>({
    queryKey: ['CtfFooter', variables],
    queryFn: ctfFetcher<CtfFooterQuery, CtfFooterQueryVariables>(
      CtfFooterDocument,
      variables
    ),
    ...options
  })
}

useCtfFooterQuery.getKey = (variables?: CtfFooterQueryVariables) =>
  variables === undefined ? ['CtfFooter'] : ['CtfFooter', variables]
useCtfFooterQuery.fetcher = (
  variables?: CtfFooterQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfFooterQuery, CtfFooterQueryVariables>(
    CtfFooterDocument,
    variables,
    options
  )
