'use client'

import { useContext } from 'react'

import { ContentfulContext } from '../contexts'

/**
 * Custom hook to access the Contentful context.
 * @returns The contentful context.
 */
export const useContentfulContext = () => useContext(ContentfulContext)
