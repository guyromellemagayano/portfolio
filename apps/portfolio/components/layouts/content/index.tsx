'use client'

import { Suspense } from 'react'

import { useLazyLoading } from '@/hooks'

import { Skeleton } from '@/components'

import { TContentLayoutProps } from '@/types/components'

/**
 * Renders a simple layout with a title, intro, and children.
 * @returns {JSX.Element} The rendered component.
 */
const ContentLayout = ({
  as: Component = 'div',
  children,
  className,
  layout,
  ...rest
}: TContentLayoutProps): JSX.Element | React.ReactNode => {
  const Content = useLazyLoading({
    importFunction: () => import('./Content')
  })

  return (
    <Suspense
      fallback={
        layout === 'aside' ? (
          <Skeleton.ContentAsideLayout className={className} />
        ) : (
          <Skeleton.ContentSimpleLayout className={className} />
        )
      }
    >
      <Content className={className} layout={layout} {...rest}>
        {children}
      </Content>
    </Suspense>
  )
}

export default ContentLayout
