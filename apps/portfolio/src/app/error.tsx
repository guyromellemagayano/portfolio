'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'

import { ErrorApp } from '@portfolio/components'

export type TCustomErrorPageProps = {
  error: Error & { digest?: string }
}

/**
 * Render the custom error page.
 * @param {TCustomErrorPageProps} props - The page props
 * @returns The rendered custom error page
 */
const CustomErrorPage = ({ error }: TCustomErrorPageProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return <ErrorApp />
}

CustomErrorPage.displayName = 'CustomErrorPage'

export default CustomErrorPage
