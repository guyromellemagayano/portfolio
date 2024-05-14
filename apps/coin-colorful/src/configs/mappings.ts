import dynamic from 'next/dynamic'

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

  // GraphQL module for the ComponentTextBlock component
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
}
