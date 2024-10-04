import { forwardRef, memo } from 'react'

import Image from 'next/image'

import { Div, type TDivisionProps, type TDivisionRef } from '@react-components'

import { cn } from '@react-utils'

import type { TPhotosData } from '@portfolio/types'

export type PhotoLayoutRef = TDivisionRef
export type PhotoLayoutProps = TDivisionProps & {
  data?: TPhotosData['slidePhotos']
}

// The rotations data.
const RotationsData = [
  'rotate-2',
  '-rotate-2',
  'rotate-2',
  'rotate-2',
  '-rotate-2'
]

const strings = {
  defaultImageAlt: 'Photo Layout Image'
}

/**
 * Renders the photo layout component.
 * @param {PhotoLayoutProps} props - The component props
 * @param {PhotoLayoutRef} ref - The component reference
 * @returns The rendered photo layout component
 */
const PhotoLayout = memo(
  forwardRef<PhotoLayoutRef, PhotoLayoutProps>(({ data, ...rest }, ref) => {
    if (!data) return null

    return (
      <Div ref={ref} {...rest}>
        <Div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {data.map(({ id, src, alt }, index) => (
            <Div
              key={id}
              className={cn(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                RotationsData[index % RotationsData.length]
              )}
            >
              <Image
                src={src}
                alt={alt || strings.defaultImageAlt}
                sizes="(min-width: 640px) 18rem, 11rem"
                className={cn('absolute inset-0 h-auto w-full object-cover')}
                fill
                priority
              />
            </Div>
          ))}
        </Div>
      </Div>
    )
  })
)

PhotoLayout.displayName = 'PhotoLayout'

export default PhotoLayout
