import { CSSProperties, FC, HTMLAttributes, JSX, ReactNode } from 'react'

// Base type for additional props
export type TCommonAdditionalProps = {
  [key: string]: any
}

// Base type for SEO metadata
export type TSeoMetaCommonProps = {
  title: string
  description?: string
  keywords?: string
}

// Base type for hero components
export type THeroCommonProps = {
  heading?: string
  description?: string[]
}

export type TCommonPageData = {
  meta?: TSeoMetaCommonProps
  hero?: THeroCommonProps
}

// Data props for pages without specific data requirements
export type TCommonComponentProps = TWithID &
  TWithClassName &
  TCommonAdditionalProps &
  TWithStyle

// Props for generic containers with optional children, id, and className
export type TContainerProps = TCommonComponentProps & TWithChildren

// Base type for props that include style object
export type TWithStyle = {
  style?: CSSProperties
}

// Base type for props that include children
export type TWithChildren = {
  children?: ReactNode
}

// Base type for props that include class name
export type TWithClassName = {
  className?: string
}

// Base type for props that include an ID
export type TWithID = {
  id?: string
}

// Props for generic components that represent a block structure
export type TBlockProps = HTMLAttributes<HTMLElement> &
  TContainerProps & {
    as?: keyof JSX.IntrinsicElements | FC<any>
    large?: boolean
  }

// Props for common SVG images
export type TCommonSvgImageProps = SVGProps<SVGSVGElement>

// Props for common component return types
export type TCommonComponentReturnType = ReactNode | null
