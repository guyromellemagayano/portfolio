import { MDXContent } from 'mdx/types'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

// Base type for SEO metadata
export type BaseSeoData = {
  title: string
  description?: string
  keywords?: string
}

// Base type for hero components
export type BaseHeroData = {
  heading?: string
  description?: string[]
}

// Base type for page data
export type BasePageData = {
  meta?: BaseSeoData
  hero?: BaseHeroData
}

// Pages data
export type PagesData = {
  title: string
  link: string
  slug: string
}

// 404 page data
export type NotFoundPageData = BasePageData

// About page data
export type AboutPageData = BasePageData

// Articles page data
export type ArticlesPageData = BasePageData

// Projects page data
export type ProjectsPageData = BasePageData

// Thank you page data
export type ThankYouPageData = BasePageData

// Home page data
export type HomePageData = BasePageData & {
  slidePhotos?: Array<SlidePhotosData>
  cvFile?: string
  workExperiences?: Array<WorkExperienceData>
}

// Slide photos data
export type SlidePhotosData = {
  alt: string
  src: string
}

// Skills page data
export type SkillsPageData = BasePageData & {
  skills?: Array<SkillsData>
}

// Skills data
export type SkillsData = {
  name: string
  items?: Array<SkillsItemData>
}

// Skills item data
export type SkillsItemData = {
  title?: string
  skillLevel?: number
  description?: Array<string>
  technologies?: Array<TechnologiesData>
}

// Technologies data
export type TechnologiesData = {
  name: string
  link: string
}

// Uses page data
export type UsesPageData = BasePageData & {
  tools: Array<ToolsData>
}

// Tools data
export type ToolsData = {
  name: string
  items?: Array<ToolsItemsData>
}

// Tools items data
export type ToolsItemsData = {
  title?: string
  description?: string
}

// Work page data
export type WorkPageData = BasePageData & {
  workExperiences?: Array<WorkExperienceData>
}

// Work experience data
export type WorkExperienceData = {
  company?: string
  duration?: string
  country?: string
  contributions?: string[]
  skills?: string[]
  title?: string
  logo: string | StaticImport
  alt: string
  start?: string
  end?: string
}

// Social links data
export type SocialLinksData = {
  href: string
  label?: string
  icon: string
}

// Articles data
export type ArticlesData = {
  author: string
  slug: string
  date: string
  title: string
  description: string
  category: string
  component?: MDXContent
}

// Common page app data
export type CommonPageAppData = {
  hero?: BaseHeroData
}

// Home app data
export type HomeAppData = CommonPageAppData & {
  links?: Array<SocialLinksData>
  articles?: Array<ArticlesData>
  slidePhotos?: Array<SlidePhotosData>
  cvFile?: HomePageData['cvFile']
  workExperiences?: Array<WorkExperienceData>
}

// Articles app data
export type ArticlesAppData = CommonPageAppData & {
  articles?: Array<ArticlesData>
}

// Navigation data
export type NavigationData = {
  headerMenu: PagesData[]
  footerMenu: PagesData[]
}
