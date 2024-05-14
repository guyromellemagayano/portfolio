import * as Types from '../../../../../libs/__generated/graphql.types'

import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { ctfFetcher } from '../../../../../libs'
import {
  PageLinkFieldsFragment,
  PageLinkFieldsFragmentDoc
} from '../../../page-link/__generated/page-link-feature.generated'
export type RichTextHyperlinkFieldsFragment = {
  __typename?: 'Query'
  page?: ({ __typename?: 'Page' } & PageLinkFieldsFragment) | null
}

export type CtfRichTextHyperlinkQueryVariables = Types.Exact<{
  id: Types.Scalars['String']['input']
  locale?: Types.InputMaybe<Types.Scalars['String']['input']>
  preview?: Types.InputMaybe<Types.Scalars['Boolean']['input']>
}>

export type CtfRichTextHyperlinkQuery = {
  __typename?: 'Query'
} & RichTextHyperlinkFieldsFragment

export const RichTextHyperlinkFieldsFragmentDoc = `
    fragment RichTextHyperlinkFields on Query {
  page(id: $id, preview: $preview, locale: $locale) {
    ...PageLinkFields
  }
}
    `
export const CtfRichTextHyperlinkDocument = `
    query CtfRichTextHyperlink($id: String!, $locale: String, $preview: Boolean) {
  ...RichTextHyperlinkFields
}
    ${RichTextHyperlinkFieldsFragmentDoc}
${PageLinkFieldsFragmentDoc}`

export const useCtfRichTextHyperlinkQuery = <
  TData = CtfRichTextHyperlinkQuery,
  TError = unknown
>(
  variables: CtfRichTextHyperlinkQueryVariables,
  options?: UseQueryOptions<CtfRichTextHyperlinkQuery, TError, TData>
) => {
  return useQuery<CtfRichTextHyperlinkQuery, TError, TData>(
    ['CtfRichTextHyperlink', variables],
    ctfFetcher<CtfRichTextHyperlinkQuery, CtfRichTextHyperlinkQueryVariables>(
      CtfRichTextHyperlinkDocument,
      variables
    ),
    options
  )
}

useCtfRichTextHyperlinkQuery.getKey = (
  variables: CtfRichTextHyperlinkQueryVariables
) => ['CtfRichTextHyperlink', variables]

useCtfRichTextHyperlinkQuery.fetcher = (
  variables: CtfRichTextHyperlinkQueryVariables,
  options?: RequestInit['headers']
) =>
  ctfFetcher<CtfRichTextHyperlinkQuery, CtfRichTextHyperlinkQueryVariables>(
    CtfRichTextHyperlinkDocument,
    variables,
    options
  )
