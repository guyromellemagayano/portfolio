import { ReactNode, createContext } from 'react'

export type TLayoutContextValue = {
  containerWidth: number
  parent: string
}

export const layoutContextValues = {
  containerWidth: 770,
  parent: ''
}

export type TLayoutContextProvider = {
  children: ReactNode
}

export const LayoutContext =
  createContext<TLayoutContextValue>(layoutContextValues)
