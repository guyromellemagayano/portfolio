import { THeroCommonProps, TSeoMetaCommonProps } from './common'

// Base type for SEO metadata
export type TSeoMetaCommonProps<T = object> = T & {
  title: string | null
  description?: string | null
  keywords?: string | null
}

// Base type for hero components
export type THeroCommonProps<T = object> = T & {
  heading: string | null
  description: string[] | null
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
  [key: string]: any
}
