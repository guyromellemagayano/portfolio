import {
  useCtfBusinessInfoQuery,
  useCtfCtaQuery,
  useCtfDuplexQuery,
  useCtfHeroBannerQuery,
  useCtfInfoBlockQuery,
  useCtfPersonQuery,
  useCtfProductQuery,
  useCtfProductTableQuery,
  useCtfQuoteQuery,
  useCtfTextBlockQuery
} from '../components'
import {
  CtfBusinessInfoQuery,
  CtfPersonQuery,
  CtfProductQuery
} from '../libs/__generated/graphql.types'

export type TPrefetchMappingTypeFetcher =
  | CtfBusinessInfoQuery
  | CtfPersonQuery
  | CtfProductQuery

/**
 * This map is used to match a generated GQL query to a Contentful model's `__typename`.
 * The query is used to prefetch the data through React Query's `prefetchQuery` method.
 */
export const prefetchMap = {
  ComponentCta: useCtfCtaQuery,
  ComponentHeroBanner: useCtfHeroBannerQuery,
  ComponentDuplex: useCtfDuplexQuery,
  ComponentInfoBlock: useCtfInfoBlockQuery,
  ComponentTextBlock: useCtfTextBlockQuery,
  ComponentQuote: useCtfQuoteQuery,
  ComponentProductTable: useCtfProductTableQuery,
  TopicBusinessInfo: useCtfBusinessInfoQuery,
  TopicProduct: useCtfProductQuery,
  TopicPerson: useCtfPersonQuery
}
