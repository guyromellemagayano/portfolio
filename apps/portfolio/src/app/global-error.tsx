'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'

/**
 * Render the global error component.
 * @param {Error} error - The error object.
 * @returns {JSX.Element} The rendered component.
 */
const GlobalError = ({ error }: { error: Error & { digest?: string } }): JSX.Element => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body>
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        <NextError statusCode={undefined as any} />
      </body>
    </html>
  )
}

export default GlobalError
