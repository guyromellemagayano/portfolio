'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import { useLocale } from 'next-intl'

import { BaseLayout, ErrorApp } from '@portfolio/components'

export type TCustomErrorProps = {
  error: Error & { digest?: string }
}

/**
 * Render the custom error app page.
 * @param {TCustomErrorProps} props - The app props
 * @returns The rendered custom error app page
 */
const CustomError = ({ error }: TCustomErrorProps) => {
  const locale = useLocale()

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <BaseLayout locale={locale}>
      <ErrorApp className="flex h-full items-center" />
    </BaseLayout>
  )
}

CustomError.displayName = 'CustomError'

export default CustomError
