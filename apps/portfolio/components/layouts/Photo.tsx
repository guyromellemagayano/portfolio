'use client'

import { FC, useId } from 'react'

import clsx from 'clsx'

import ImageLayout from '@/components/layouts/Image'

import { THomePageSlidePhotos } from '@/data/home'
import RotationsData from '@/data/rotations'

import { isArrayType, isEmpty } from '@/utils/checkTypes'

import type {
  TCommonAdditionalProps,
  TWithClassName,
  TWithID
} from '@/types/common'

export type TPhotoLayoutData = TCommonAdditionalProps & THomePageSlidePhotos

export type TPhotoLayoutProps = TWithClassName &
  TWithID &
  TCommonAdditionalProps & {
    data?: Array<TPhotoLayoutData>
  }

/**
 * Renders the photos component.
 * @param data - The photos data.
 * @param id - The photos ID.
 * @param rest - The rest of the photos props.
 * @returns The rendered photos component.
 */
const PhotoLayout: FC<TPhotoLayoutProps> = ({ data, id, ...rest }) => {
  const customId = useId()

  return (
    isArrayType(data) &&
    !isEmpty(data) && (
      <div id={id || customId} {...rest}>
        <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {data.map(({ src, alt }, index: number) => (
            <div
              key={index}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl',
                RotationsData[index % RotationsData.length]
              )}
            >
              <ImageLayout
                src={src}
                alt={alt}
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
  )
}

export default PhotoLayout
