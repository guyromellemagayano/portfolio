'use client'

import { cn } from '@react-utils'

import { ContentLayout, type TContentLayoutProps } from '@portfolio/components'
import { errorPageData } from '@portfolio/data'

export type TErrorAppProps = TContentLayoutProps

/**
 * Render the error app component.
 * @param {TErrorAppProps} props - The component props
 * @returns The rendered error app component
 */
const ErrorApp = ({ className, children, ...rest }: TErrorAppProps) => {
  return (
    <ContentLayout.Simple
      className={cn('sm:px-8', className)}
      intro={errorPageData.description}
      title={errorPageData.title}
      {...rest}
    >
      {children}
    </ContentLayout.Simple>
  )
}

ErrorApp.displayName = 'ErrorApp'

export default ErrorApp
