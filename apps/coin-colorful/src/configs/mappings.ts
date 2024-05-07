import dynamic from 'next/dynamic'

// Mapping of page topics to dynamically imported components.
const pageTopicMap = {
  // CtfProduct component
  TopicProduct: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-product/ctf-product-gql'
    ).then(module => module.CtfProductGql)
  ),

  // CtfBusinessInfo component
  TopicBusinessInfo: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-business-info/ctf-business-info-gql'
    ).then(module => module.CtfBusinessInfoGql)
  ),

  // CtProductTable component
  ComponentProductTable: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-product-table/ctf-product-table-gql'
    ).then(module => module.CtfProductTableGql)
  )
}

// Mapping of component names to their corresponding dynamic imports.
export const componentMap = {
  // CtfCta component
  ComponentCta: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-cta/ctf-cta'
    ).then(module => module.CtfCta)
  ),

  // CtfDuplex component
  ComponentDuplex: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-duplex/ctf-duplex'
    ).then(module => module.CtfDuplex)
  ),

  // CtfHeroBanner component
  ComponentHeroBanner: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-hero-banner/ctf-hero-banner'
    ).then(module => module.CtfHeroBanner)
  ),

  // CtfInfoBlock component
  ComponentInfoBlock: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-info-block/ctf-info-block'
    ).then(module => module.CtfInfoBlock)
  ),

  // CtfQuote component
  ComponentQuote: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-quote/ctf-quote'
    ).then(module => module.CtfQuote)
  ),

  // CtfTextBlock component
  ComponentTextBlock: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-text-block/ctf-text-block'
    ).then(module => module.CtfTextBlock)
  ),

  // CtfPerson component
  TopicPerson: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-person/ctf-person'
    ).then(module => module.CtfPerson)
  )
}

// Mapping of component names to their corresponding GraphQL modules.
export const componentGqlMap = {
  ...pageTopicMap,

  // GraphQL module for the ComponentCta component
  ComponentCta: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-cta/ctf-cta-gql'
    ).then(module => module.CtfCtaGql)
  ),

  // GraphQL module for the ComponentDuplex component
  ComponentDuplex: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-duplex/ctf-duplex-gql'
    ).then(module => module.CtfDuplexGql)
  ),

  // GraphQL module for the ComponentHeroBanner component
  ComponentHeroBanner: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-hero-banner/ctf-hero-banner-gql'
    ).then(module => module.CtfHeroGql)
  ),

  // GraphQL module for the ComponentInfoBlock component
  ComponentInfoBlock: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-info-block/ctf-info-block-gql'
    ).then(module => module.CtfInfoBlockGql)
  ),

  // GraphQL module for the ComponentQuote component
  ComponentQuote: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-quote/ctf-quote-gql'
    ).then(module => module.CtfQuoteGql)
  ),

  // GraphQL module for the ComponentTextBlock component
  ComponentTextBlock: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-text-block/ctf-text-block-gql'
    ).then(module => module.CtfTextBlockGql)
  ),

  // GraphQL module for the TopicPerson component
  TopicPerson: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-person/ctf-person-gql'
    ).then(module => module.CtfPersonGql)
  ),

  // GraphQL module for the ComponentFooter component
  ComponentFooter: dynamic(() =>
    import(
      '@guy-romelle-magayano/coin-colorful/components/features/ctf-components/ctf-footer/ctf-footer-gql'
    ).then(module => module.CtfFooterGql)
  )
}
