import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import type { TBasePageData } from './base'
import type { TCommonPhotosData, TCommonPostsData } from './common'

// Pages data
export type TPagesData = {
  id?: string
  title: string
  link: string
  slug: string
}

// Work data
export type TWorkData = Pick<TBasePageData, 'hero'> & {
  workExperiences?: TWorkExperiencesData[]
  cvFile?: string
}

// Work experiences data
export type TWorkExperiencesData = TCommonPhotosData & {
  company: string
  title: string
  start: string
  end: string
  duration: string
  country?: string
  contributions: string[]
  skills: string[]
}

// Skills data
export type TSkillsData = Pick<TBasePageData, 'hero'> & {
  skills?: TSkillsListData[]
}

// Skills list data
export type TSkillsListData = {
  id?: string
  name: string
  type: string
  image: TSkillsListImageData
}

// Skills list image data
export type TSkillsListImageData = {
  default: TCommonPhotosData
  dark?: TCommonPhotosData
}

// Photos data
export type TPhotosData = {
  slidePhotos: TCommonPhotosData[]
  aboutImage: TCommonPhotosData
}

// Articles data
export type TArticlesData = TCommonPostsData & {
  date: string
}

// Articles app data
export type TArticlesAppData = TBasePageData['hero'] & {
  articles?: TArticlesData[]
}

// Projects app data
export type TProjectsAppData = TBasePageData['hero'] & {
  projects?: TProjectsData[]
}

// Projects data
export type TProjectsData = TCommonPostsData & {
  logo: string | StaticImport
  link: TProjectsLinkData
  tech: string[]
}

// Projects link data
export type TProjectsLinkData = {
  url: string
  text: string
}

// Navigation data
export type TNavigationData = {
  headerMenu: TPagesData[]
  footerMenu: TPagesData[]
}

// Favicons data
export type TFaviconsData = {
  manifest: string
  icons: TFaviconsIconsData
}

// Favicons icons data
export type TFaviconsIconsData = {
  shortcut: TFaviconsShortcutData
  icon: TFaviconsIconData[]
  apple: TFaviconsAppleData[]
  other: TFaviconsOtherData[]
}

// Favicons shortcut data
export type TFaviconsShortcutData = {
  url: string
  type: string
}

// Favicons icon data
export type TFaviconsIconData = TFaviconsShortcutData & {
  sizes?: string
}

// Favicons apple data
export type TFaviconsAppleData = TFaviconsIconData

// Favicons other data
export type TFaviconsOtherData = Pick<TFaviconsShortcutData, 'url'> & {
  rel: string
  color: string
}

// Social links data
export type TSocialLinksData = {
  id?: string
  href: string
  label?: string
  icon: string
}
