import { ComponentType, LazyExoticComponent, lazy } from 'react'

import { LAZY_LOADING_DURATION } from '@/configs/env'

export type TUseLazyLoading = {
  importFunction: any
  duration?: number
}

/**
 * Loads a component lazily after a specified duration.
 * @param {Object} options - The options for lazy loading.
 * @param {any} options.component - The component to be lazily loaded.
 * @param {number} [options.duration=LAZY_LOADING_DURATION] - The duration in milliseconds before the component is loaded.
 * @returns {Promise<any>} - A promise that resolves to the lazily loaded component.
 */
const useLazyLoading = ({
  importFunction,
  duration = LAZY_LOADING_DURATION
}: TUseLazyLoading): LazyExoticComponent<ComponentType<any>> =>
  lazy(
    () =>
      new Promise(res => {
        setTimeout(() => res(importFunction()), duration)
      })
  )

export default useLazyLoading
