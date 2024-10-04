'use client'

import { cn } from '@react-utils'

import { ContentLayout, type TContentLayoutProps } from '@portfolio/components'
import { notFoundPageData } from '@portfolio/data'

export type TNotFoundAppProps = TContentLayoutProps

/**
 * Render the not found app component.
 * @param {TNotFoundAppProps} props - The component props
 * @returns The rendered not found app component
 */
const NotFoundApp = ({ className, children, ...rest }: TNotFoundAppProps) => {
  return (
    <ContentLayout.Simple
      className={cn('sm:px-8', className)}
      intro={notFoundPageData.description}
      title={notFoundPageData.title}
      {...rest}
    >
      {children}
    </ContentLayout.Simple>
  )
}

NotFoundApp.displayName = 'NotFoundApp'

export default NotFoundApp
