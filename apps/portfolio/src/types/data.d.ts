import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import type { BasePageData } from './base'
import type { CommonPhotosData, CommonPostsData } from './common'

// Pages data
export type PagesData = {
  id?: string
  title: string
  link: string
  slug: string
}

// Work data
export type WorkData = Pick<BasePageData, 'hero'> & {
  workExperiences?: WorkExperiencesData[]
  cvFile?: string
}

// Work experiences data
export type WorkExperiencesData = {
  id?: string
  company: string
  title: string
  logo?: string | StaticImport
  alt?: string
  start: string
  end: string
  duration: string
  country?: string
  contributions: string[]
  skills: string[]
}

// Skills data
export type SkillsData = Pick<BasePageData, 'hero'> & {
  skills?: SkillsListData[]
}

// Skills list data
export type SkillsListData = {
  id?: string
  name: string
  type: string
  image: SkillsListImageData
}

// Skills list image data
export type SkillsListImageData = {
  default: CommonPhotosData
  dark?: CommonPhotosData
}

// Photos data
export type PhotosData = {
  slidePhotos: CommonPhotosData[]
  about: CommonPhotosData
}

// Social links data
export type SocialLinksData = {
  id?: string
  href: string
  label?: string
  icon: string
}

// Articles data
export type ArticlesData = CommonPostsData & {
  author: string
  date: string
}

// Articles app data
export type ArticlesAppData = BasePageData['hero'] & {
  articles?: ArticlesData[]
}

// Projects app data
export type ProjectsAppData = BasePageData['hero'] & {
  projects?: ProjectsData[]
}

// Projects data
export type ProjectsData = CommonPostsData & {
  logo: string | StaticImport
  link: ProjectsLinkData
  tech: string[]
}

// Projects link data
export type ProjectsLinkData = {
  url: string
  text: string
}

// Navigation data
export type NavigationData = {
  headerMenu: PagesData[]
  footerMenu: PagesData[]
}
