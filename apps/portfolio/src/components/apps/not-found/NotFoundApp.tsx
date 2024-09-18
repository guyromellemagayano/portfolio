'use client'

import { useTranslations } from 'next-intl'

import { cn } from '@react-utils'

import { type ContentLayoutProps, ContentLayout } from '@portfolio/components'

export type TNotFoundAppProps = ContentLayoutProps

/**
 * Render the not found app component.
 * @param {TNotFoundAppProps} props - The component props
 * @returns The rendered not found app component
 */
const NotFoundApp = ({ className, children, ...rest }: TNotFoundAppProps) => {
  const t = useTranslations('NotFoundPage')

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

NotFoundApp.displayName = 'NotFoundApp'

export default NotFoundApp
