'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@react-utils'

import { type ContentLayoutProps, ContentLayout } from '@portfolio/components'

export type TErrorAppProps = ContentLayoutProps

/**
 * Render the error app component.
 * @param {TErrorAppProps} props - The component props
 * @returns The rendered error app component
 */
const ErrorApp = ({ className, children, ...rest }: TErrorAppProps) => {
  const t = useTranslations('ErrorPage')

  return (
    <ContentLayout.Simple
      className={cn('mt-9 sm:mt-9', className)}
      intro={t('description')}
      title={t('title')}
      {...rest}
    >
      {children}
    </ContentLayout.Simple>
  )
}

ErrorApp.displayName = 'ErrorApp'

export default ErrorApp
