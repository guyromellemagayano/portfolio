'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import { default as Error, default as NextError } from 'next/error'

import { Body, Button, Heading, Html } from '@react-components'

import { cn } from '@react-utils'

export interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Render the global error page.
 * @param {GlobalErrorProps} props - The page props
 * @returns The rendered component
 */
const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <Html className={cn('h-full antialiased')} suppressHydrationWarning>
      <Body className={cn('flex h-full bg-zinc-50 dark:bg-black')}>
        <NextError statusCode={undefined as any} />
        <Heading as="h2">Something went wrong!</Heading>
        <Button onClick={() => reset()}>Try again</Button>
      </Body>
    </Html>
  )
}

GlobalError.displayName = 'GlobalError'

export default GlobalError
