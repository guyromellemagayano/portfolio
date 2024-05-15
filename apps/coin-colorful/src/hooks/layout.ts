'use client'

import { useContext } from 'react'

import { LayoutContext } from '../contexts'

/**
 * Custom hook to access the layout context.
 * @returns The layout context.
 */
export const useLayoutContext = () => useContext(LayoutContext)
