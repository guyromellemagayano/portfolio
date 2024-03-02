import { ComponentType, LazyExoticComponent, lazy } from 'react'

const LAZY_LOADING_DURATION: number = 1000

type TUseLazyLoading = {
  importFunction: any
  duration?: number
}

/**
 * Loads a component lazily after a specified duration.
 * @param importFunction - The function to import the component.
 * @param duration - The duration to wait before loading the component.
 * @returns The lazily loaded component.
 */
export const useLazyLoading = ({
  importFunction,
  duration = LAZY_LOADING_DURATION
}: TUseLazyLoading): LazyExoticComponent<ComponentType<any>> =>
  lazy(
    () =>
      new Promise(res => {
        setTimeout(() => res(importFunction()), duration)
      })
  )
