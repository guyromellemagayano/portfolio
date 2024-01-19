'use client'

import clsx from 'clsx'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import RotationsData from '@/data/rotations'

import type { TWithChildren } from '@/types/common'

export type TPhotoLayoutData<T = object> = T & {
  alt: string
  src: StaticImport | string | null
  [key: string]: any
}

export type TPhotoLayoutProps<T = object> = T &
  TWithChildren<T> & {
    data?: Array<TPhotoLayoutData> | null
  }

/**
 * Render the photos component.
 * @param data - The photos data.
 * @returns {JSX.Element} The rendered component.
 */
const PhotoLayout = ({ data }: TPhotoLayoutProps): JSX.Element => {
  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {data?.map((image, index) => (
          <div
            key={index}
            className={clsx(
              'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
              RotationsData[index % RotationsData.length]
            )}
          >
            <Image
              src={image.src || '#'}
              alt={image.alt || ''}
              sizes="(min-width: 640px) 18rem, 11rem"
              className="absolute inset-0 h-full w-full object-cover"
              unoptimized
              priority
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PhotoLayout
