'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import NextError from 'next/error'

import { BaseLayout } from '@portfolio/components'

import type { TCustomErrorProps } from './error'

export type TGlobalErrorProps = TCustomErrorProps

/**
 * Render the global error app page.
 * @param {TGlobalErrorProps} props - The app props
 * @returns The rendered global error app page
 */
const GlobalError = ({ error }: TGlobalErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <BaseLayout>
      <NextError statusCode={0} />
    </BaseLayout>
  )
}

GlobalError.displayName = 'GlobalError'

export default GlobalError
