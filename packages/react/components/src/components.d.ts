import { ReactNode } from 'react'

// ====================================================
// Common Component Prop Types
// ====================================================
export type TCommonComponentsProps = TCommonComponentExtensionProps & {
  children?: ReactNode
  className?: string
}

export type TCommonComponentExtensionProps = {
  [key: string]: any
}
