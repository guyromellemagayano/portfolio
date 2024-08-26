// Base type for SEO metadata
export type BaseSeoData = {
  title: string
  description?: string
  keywords?: string
}

// Base type for hero components
export type BaseHeroData = {
  heading?: string
  description?: string | string[]
}

// Base type for page data
export type BasePageData = {
  meta?: BaseSeoData
  hero?: BaseHeroData
}
