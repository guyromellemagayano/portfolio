'use client'

import { useEffect } from 'react'

import * as Sentry from '@sentry/nextjs'

import { Heading } from '@react-components'

import { BaseLayout } from '@portfolio/components'

export type TCustomErrorProps = {
  error: Error & { digest?: string }
}

const strings = {
  errorMessage: 'Something went wrong!'
}

/**
 * Render the custom error app page.
 * @param {TCustomErrorProps} props - The app props
 * @returns The rendered custom error app page
 */
const CustomError = ({ error }: TCustomErrorProps) => {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <BaseLayout>
      <Heading as="h2">{strings.errorMessage}</Heading>
    </BaseLayout>
  )
}

CustomError.displayName = 'CustomError'

export default CustomError
