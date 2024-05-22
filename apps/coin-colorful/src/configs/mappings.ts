import { ComponentType } from 'react'

import dynamic from 'next/dynamic'

import {
  type BusinessInfoCtfComponentFeatureProps,
  type CtaCtfComponentFeatureProps,
  type CtaGqlCtlComponentFeatureProps,
  type DuplexCtfComponentFeatureProps,
  type DuplexGqlCtfComponentFeatureProps,
  type HeroBannerCtfComponentFeatureProps,
  type HeroBannerGqlCtfComponentFeatureProps,
  type InfoBlockCtfComponentFeatureProps,
  type InfoBlockGqlCtfComponentFeatureProps,
  type PersonCtfComponentFeatureProps,
  type PersonGqlCtfComponentFeatureProps,
  type ProductCtfComponentFeatureProps,
  type ProductTableCtfComponentFeatureProps,
  type QuoteCtfComponentFeatureProps,
  type QuoteGqlCtfComponentFeatureProps,
  type TextBlockCtfComponentFeatureProps,
  type TextBlockGqlCtfComponentFeatureProps
} from '@guy-romelle-magayano/coin-colorful/components'

export type PageTopicMap = {
  TopicProduct: ComponentType<ProductCtfComponentFeatureProps>
  TopicBusinessInfo: ComponentType<BusinessInfoCtfComponentFeatureProps>
  ComponentProductTable: ComponentType<ProductTableCtfComponentFeatureProps>
}

// Mapping of page topics to dynamically imported components.
const pageTopicMap = {
  // `ProductCtfComponentFeature` component
  TopicProduct: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.ProductCtfComponentFeature
    )
  ),

  // `BusinessInfoCtfComponentFeature` component
  TopicBusinessInfo: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.BusinessInfoCtfComponentFeature
    )
  ),

  // `ProductTableCtfComponentFeature` component
  ComponentProductTable: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.ProductTableCtfComponentFeature
    )
  )
} as PageTopicMap

export type ComponentMap = {
  ComponentCta: ComponentType<CtaCtfComponentFeatureProps>
  ComponentDuplex: ComponentType<DuplexCtfComponentFeatureProps>
  ComponentHeroBanner: ComponentType<HeroBannerCtfComponentFeatureProps>
  ComponentInfoBlock: ComponentType<InfoBlockCtfComponentFeatureProps>
  ComponentQuote: ComponentType<QuoteCtfComponentFeatureProps>
  ComponentTextBlock: ComponentType<TextBlockCtfComponentFeatureProps>
  TopicPerson: ComponentType<PersonCtfComponentFeatureProps>
}

// Mapping of component names to their corresponding dynamic imports.
export const componentMap = {
  // `CtaCtfComponentFeature` component
  ComponentCta: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.CtaCtfComponentFeature
    )
  ),

  // `DuplexCtfComponentFeature` component
  ComponentDuplex: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.DuplexCtfComponentFeature
    )
  ),

  // `HeroBannerCtfComponentFeature` component
  ComponentHeroBanner: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.HeroBannerCtfComponentFeature
    )
  ),

  // `InfoBlockCtfComponentFeature` component
  ComponentInfoBlock: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.InfoBlockCtfComponentFeature
    )
  ),

  // `QuoteCtfComponentFeature` component
  ComponentQuote: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.QuoteCtfComponentFeature
    )
  ),

  // CtfTextBlock component
  ComponentTextBlock: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.TextBlockCtfComponentFeature
    )
  ),

  // `PersonCtfComponentFeature` component
  TopicPerson: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.PersonCtfComponentFeature
    )
  )
} as ComponentMap

export type ComponentGqlMap = {
  ComponentCta: ComponentType<CtaGqlCtlComponentFeatureProps>
  ComponentDuplex: ComponentType<DuplexGqlCtfComponentFeatureProps>
  ComponentHeroBanner: ComponentType<HeroBannerGqlCtfComponentFeatureProps>
  ComponentInfoBlock: ComponentType<InfoBlockGqlCtfComponentFeatureProps>
  ComponentQuote: ComponentType<QuoteGqlCtfComponentFeatureProps>
  ComponentTextBlock: ComponentType<TextBlockGqlCtfComponentFeatureProps>
  TopicPerson: ComponentType<PersonGqlCtfComponentFeatureProps>
  ComponentFooter: ComponentType<unknown>
}

// Mapping of component names to their corresponding GraphQL modules.
export const componentGqlMap = {
  ...pageTopicMap,

  // GraphQL module for the `CtaGqlCtfComponentFeature` component
  ComponentCta: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.CtaGqlCtfComponentFeature
    )
  ),

  // GraphQL module for the `DuplexGqlCtfComponentFeature` component
  ComponentDuplex: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.DuplexGqlCtfComponentFeature
    )
  ),

  // GraphQL module for the `HeroBannerGqlCtfComponentFeature` component
  ComponentHeroBanner: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.HeroBannerGqlCtfComponentFeature
    )
  ),

  // GraphQL module for the `InfoBlockGqlCtfComponentFeature` component
  ComponentInfoBlock: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.InfoBlockGqlCtfComponentFeature
    )
  ),

  // GraphQL module for the `QuoteGqlCtfComponentFeature` component
  ComponentQuote: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.QuoteGqlCtfComponentFeature
    )
  ),

  // GraphQL module for the `TextBlockGqlCtfComponentFeature` component
  ComponentTextBlock: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.TextBlockGqlCtfComponentFeature
    )
  ),

  // GraphQL module for the `PersonGqlCtfComponentFeature` component
  TopicPerson: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.PersonGqlCtfComponentFeature
    )
  ),

  // GraphQL module for the `FooterGqlCtfComponentFeature` component
  ComponentFooter: dynamic(() =>
    import('@guy-romelle-magayano/coin-colorful/components').then(
      module => module.FooterGqlCtfComponentFeature
    )
  )
} as ComponentGqlMap
