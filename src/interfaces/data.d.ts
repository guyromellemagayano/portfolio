import { StaticImageData } from 'next/image'
import React from 'react'
import { IHeroCommonProps, ISeoMetaCommonProps } from './common'

// About page data
export interface IAboutData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
}

// Articles page data
export interface IArticlesData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
}

// Home page data
export interface IHomeData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
  slidePhotos: {
    alt: string
    src: StaticImageData
  }[]
  cvFile: string
  workExperiences: {
    company: string
    title: string
    logo: StaticImageData
    start: string
    end: string
  }[]
}

// Navigation data
export interface INavigationData {
  menu: {
    title: string
    slug: string
    link: string
  }[]
  copyright: {
    year: number
    text: string
  }
}

// Pages data
export interface IPagesData {
  pages: {
    title: string
    link: string
  }[]
  articles: {
    title: string
    link: string
  }[]
  projects: {
    title: string
    link: string
  }[]
}

// Projects page data
export interface IProjectsData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
  projects: {
    name: string
    description: string
    link: {
      url: string
      text: string
    }
    tech: string[]
    logo: StaticImageData
  }[]
}

// Thank you page data
export interface IThankYouData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
}

// Uses page data
export interface IUsesData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
  tools: {
    name: string
    items: IUsesToolsItemsData[]
  }[]
}

// Uses tools items data
export interface IUsesToolsItemsData {
  title: string
  description: string
}

// Skills page data
export interface ISkillsData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
  skills?: ISkillsListData[]
}

// Skills list data
export interface ISkillsListData {
  name: string
  items?: ISkillsListItemsData[]
}

// Skills list items data
export interface ISkillsListItemsData {
  title?: string
  skillLevel?: number
  description?: string[]
  technologies?: ITechnologiesData[]
}

// Work page data
export interface IWorkData {
  meta: ISeoMetaCommonProps
  hero: IHeroCommonProps
  workExperiences?: IWorkListData[]
}

// Work list data
export interface IWorkListData {
  company?: string
  duration: string
  country?: string
  description: string[]
  contributions: string[]
}

// Technologies data
export interface ITechnologiesData {
  name: string
  link?: string
}

// Social links data
export interface ISocialLinksData {
  url: string
  ariaLabel: string
  icon: React.FunctionComponent
}
