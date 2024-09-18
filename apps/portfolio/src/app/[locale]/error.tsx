'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'

import { Body, Heading, Html } from '@react-components'

import { cn } from '@react-utils'

export type CustomErrorProps = {
  error: Error & { digest?: string }
}

const strings = {
  errorMessage: 'Something went wrong!'
}

/**
 * Render the custom error app page.
 * @param {CustomErrorProps} props - The app page props
 * @returns The rendered app page
 */
const CustomError = ({ error }: CustomErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <Html className={cn('h-full antialiased')} suppressHydrationWarning>
      <Body className={cn('flex h-full bg-zinc-50 dark:bg-black')}>
        <Heading as="h2">{strings.errorMessage}</Heading>
      </Body>
    </Html>
  )
}

CustomError.displayName = 'CustomError'

export default CustomError
