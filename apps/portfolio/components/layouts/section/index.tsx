'use client'

import { Suspense } from 'react'

import { Skeleton } from '@/components'

import { useLazyLoading } from '@/hooks'

import { TSectionLayoutProps } from '@/types/components'

/**
 * The props for the Section component.
 * @param {String} title - The title of the section.
 * @param {Boolean} decorate - Whether to decorate the section.
 * @param {React.ReactNode} children - The content of the section.
 * @returns {JSX.Element} The rendered component.
 */
const SectionLayout = ({
  title,
  decorate,
  children
}: TSectionLayoutProps): JSX.Element => {
  const SectionLayoutContent = useLazyLoading({
    importFunction: () => import('./Content')
  })

  return (
    <Suspense fallback={<Skeleton.SectionLayout />}>
      <SectionLayoutContent title={title} decorate={decorate}>
        {children}
      </SectionLayoutContent>
    </Suspense>
  )
}

export default SectionLayout
