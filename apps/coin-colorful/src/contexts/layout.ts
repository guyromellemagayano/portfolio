'use client'

import { createContext } from 'react'

export type LayoutContextValueProps = {
  containerWidth: number
  parent: string
}

export const layoutContextValues: LayoutContextValueProps = {
  containerWidth: 770,
  parent: ''
}

export const LayoutContext =
  createContext<LayoutContextValueProps>(layoutContextValues)
