import { TSkillsData } from '@data/skills'
import { TUsesData } from '@data/uses'
import { TWorkData } from '@data/work'

import { THeroCommonProps, TSeoMetaCommonProps } from './common'
import { TArticleProps, TProjectProps } from './components'

// Base type for SEO metadata
export type TSeoMetaCommonProps<T = object> = T & {
  title: string
  description?: string
  keywords?: string
}

// Base type for hero components
export type THeroCommonProps<T = object> = T & {
  heading: string
  description: string[]
}

// Common data props
export type TDataProps<T = object> = T & {
  meta: TSeoMetaCommonProps
  hero: THeroCommonProps
}

// Data props for pages without specific data requirements
export type TGenericPageData<T = object> = TDataProps<T>

// Base type for components with common app props
export type TBaseCommonAppComponentProps<T = object> = T & {
  translations?: {
    [key: string]: string
  }
  articles?: TArticleProps[]
  projects?: TProjectProps[]
  hero?: THeroCommonProps
  skills?: TSkillsData['skills']
  tools?: TUsesData['tools']
  workExperiences?: TWorkData['workExperiences']
}
