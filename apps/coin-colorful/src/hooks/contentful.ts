'use client'

import { useContext } from 'react'

import { ContentfulContext } from '@guy-romelle-magayano/coin-colorful/contexts'

/**
 * Custom hook to access the Contentful context.
 * @returns The contentful context.
 */
export const useContentfulContext = () => useContext(ContentfulContext)
