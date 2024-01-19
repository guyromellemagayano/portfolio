import { ReactNode } from "react"

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

// Base type for props that include children
export type TWithChildren<T = object> = T & {
  children?: ReactNode
}

// Base type for props that include class name
export type TWithClassName<T = object> = T & {
  className?: string
}

// Base type for props that can have an ID and className
export type TWithIDAndClass<T = object> = T &
  TWithChildren<T> &
  TWithClassName<T> & {
    id?: string
  }

// Props for generic components that represent a block structure
export type TBlockProps<T = object> = T &
  TWithIDAndClass<T> & {
    as?: keyof JSX.IntrinsicElements
  }

// Props for generic containers with optional children, id, and className
export type TContainerProps<T = object> = T & TWithIDAndClass<T>
