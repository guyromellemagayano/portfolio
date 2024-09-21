'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import Error from 'next/error'

import type { TCustomErrorPageProps } from './error'
import type { TLocaleLayoutProps } from './layout'

export type TGlobalErrorPageProps = TCustomErrorPageProps & TLocaleLayoutProps

/**
 * Render the global error page.
 * @param {TGlobalErrorPageProps} props - The page props
 * @returns The rendered global error page
 */
const GlobalErrorPage = ({ error }: TGlobalErrorPageProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return <Error statusCode={0} />
}

GlobalErrorPage.displayName = 'GlobalErrorPage'

export default GlobalErrorPage
