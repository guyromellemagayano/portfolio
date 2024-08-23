import { forwardRef, memo } from 'react'

import Image from 'next/image'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isValidData } from '@guy-romelle-magayano/react-utils'

import type {
  CommonPhotosData,
  PhotosData
} from '@guy-romelle-magayano/portfolio/types'

export type PhotoLayoutRef = DivisionRef
export type PhotoLayoutProps = DivisionProps & {
  data?: PhotosData['slidePhotos']
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
 * Renders the photo layout component
 * @param {PhotoLayoutProps} props - The component props
 * @param {PhotoLayoutRef} ref - The component reference
 * @returns The rendered JSX component
 */
const PhotoLayout = memo(
  forwardRef<PhotoLayoutRef, PhotoLayoutProps>(({ data, ...rest }, ref) => {
    const validData =
      data?.filter((item): item is CommonPhotosData =>
        isValidData(item, 'object')
      ) || null

    if (!validData || validData?.length === 0) {
      return null
    }

    return (
      <Div ref={ref} {...rest}>
        <Div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
          {validData.map(({ id, src, alt }, index) => (
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
                className="absolute inset-0 h-auto w-full object-cover"
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
