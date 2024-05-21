'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'

import { Body, Html } from '@guy-romelle-magayano/react-components/server'

/**
 * Render the global error component.
 * @param {Error} error - The error object.
 * @returns The rendered component.
 */
const GlobalError = ({ error }: { error: Error & { digest?: string } }) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <Html>
      <Body>
        {/* This is the default Next.js error component but it doesn't allow omitting the statusCode property yet. */}
        <NextError statusCode={undefined as any} />
      </Body>
    </Html>
  )
}

export default GlobalError
