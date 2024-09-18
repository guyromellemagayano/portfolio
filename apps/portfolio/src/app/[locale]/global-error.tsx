'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'
import { useLocale } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import Error from 'next/error'

import { BaseLayout } from '@portfolio/components'

import type { TCustomErrorProps } from './error'
import type { TLocaleLayoutProps } from './layout'

export type TGlobalErrorProps = TCustomErrorProps & TLocaleLayoutProps

/**
 * Render the global error app page.
 * @param {TGlobalErrorProps} props - The app props
 * @returns The rendered global error app page
 */
const GlobalError = ({ error, params }: TGlobalErrorProps) => {
  const locale = useLocale()

  unstable_setRequestLocale(params.locale || locale)

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <BaseLayout locale={params.locale || locale}>
      <Error statusCode={0} />
    </BaseLayout>
  )
}

GlobalError.displayName = 'GlobalError'

export default GlobalError
