'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import { default as Error, default as NextError } from 'next/error'

import { Body, Html } from '@react-components'

/**
 * Render the global error app.
 * @returns The rendered component
 */
export const GlobalErrorApp = () => {
  return (
    <Html>
      <Body>
        <NextError statusCode={undefined as any} />
      </Body>
    </Html>
  )
}

GlobalErrorApp.displayName = 'GlobalErrorApp'

export interface GlobalErrorProps {
  error: Error
}

/**
 * Render the global error page.
 * @param {GlobalErrorProps} props - The page props
 * @returns The rendered component
 */
const GlobalError = ({ error }: GlobalErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return <GlobalErrorApp />
}

GlobalError.displayName = 'GlobalError'

export default GlobalError
