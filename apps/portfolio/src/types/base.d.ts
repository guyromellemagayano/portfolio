// Base type for SEO data
export type TBaseSeoData = {
  id: string
  title: string
  link: string
  slug: string
  meta: TBaseSeoMetaData
  structuredData?: TBaseSeoStructuredData
  hero: TBaseSeoHeroData
}

// Base type for SEO meta data
export type TBaseSeoMetaData = {
  title: string
  description: string
  keywords?: string
  openGraph?: TBaseSeoOpenGraph
}

// Base type for SEO open graph
export type TBaseSeoOpenGraph = {
  title: string
  description: string
  type: string
  url: string
  siteName: string
  images: TBaseSeoImages[]
}

// Base type for SEO images
export type TBaseSeoImages = {
  url: string
  width: number
  height: number
  alt: string
}

// Base type for SEO structured metadata
export type TBaseSeoStructuredData = {
  '@context': string
  '@type': string
  name: string
  description: string
  publisher: {
    '@type': string
    name: string
  }
  sameAs: string[]
}

// Base type for hero components data
export type TBaseSeoHeroData = {
  heading: string
  description: string | string[]
}
