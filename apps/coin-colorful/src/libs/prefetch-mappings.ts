import { useCtfBusinessInfoQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/business-info/__generated/business-info-ctf-component-feature.generated'
import { useCtfCtaQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/cta/__generated/cta-ctf-component-feature.generated'
import { useCtfDuplexQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/duplex/__generated/duplex-ctf-component-feature.generated'
import { useCtfHeroBannerQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/hero-banner/__generated/hero-banner-ctf-component-feature.generated'
import { useCtfInfoBlockQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/info-block/__generated/info-block-ctf-component-feature.generated'
import { useCtfPersonQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/person/__generated/person-ctf-component-feature.generated'
import { useCtfProductTableQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/product-table/__generated/product-table-ctf-component-feature.generated'
import { useCtfProductQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/product/__generated/product-ctf-component-feature.generated'
import { useCtfQuoteQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/quote/__generated/ctf-quote.generated'
import { useCtfTextBlockQuery } from '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/text-block/__generated/ctf-text-block.generated'
import {
  CtfBusinessInfoQuery,
  CtfPersonQuery,
  CtfProductQuery
} from '@guy-romelle-magayano/coin-colorful/libs/__generated/graphql.types'

export type TPrefetchMappingTypeFetcher =
  | CtfBusinessInfoQuery
  | CtfPersonQuery
  | CtfProductQuery

// This map is used to match a generated GQL query to a Contentful model's __typename. The query is used to prefetch the data through React Query's prefetchQuery method
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
