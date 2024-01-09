'use client'

import { Suspense } from 'react'

import Skeleton from '@/components/Skeleton'

import { useLazyLoading } from '@/hooks'

import { TPhotoLayoutProps } from '@/types/components'

/**
 * Render the photos component.
 * @param data - The photos data.
 * @returns {JSX.Element} The rendered component.
 */
const PhotoLayout = ({ data }: TPhotoLayoutProps): JSX.Element => {
  const PhotoLayoutContent = useLazyLoading({
    importFunction: () => import('./Content')
  })

  return (
    <Suspense fallback={<Skeleton.PhotoLayout />}>
      <PhotoLayoutContent data={data} />
    </Suspense>
  )
}

export default PhotoLayout
