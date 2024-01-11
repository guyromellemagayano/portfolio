'use client'

import { Suspense } from 'react'

import { Skeleton } from '@/components'

import { useLazyLoading } from '@/hooks'

import { TPhotoLayoutData } from '@/types/components'

/**
 * Render the image component.
 * @param data - The image data.
 * @returns {JSX.Element} The rendered component.
 */
const ImageLayout = (data: TPhotoLayoutData): JSX.Element => {
  const ImageLayoutContent = useLazyLoading({
    importFunction: () => import('./Content')
  })

  return (
    <Suspense fallback={<Skeleton.ImageLayout />}>
      <ImageLayoutContent {...data} />
    </Suspense>
  )
}

export default ImageLayout
