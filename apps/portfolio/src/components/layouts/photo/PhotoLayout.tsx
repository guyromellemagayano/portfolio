import { forwardRef, memo } from 'react'

import Image from 'next/image'

import {
  Div,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

import { type SlidePhotosData } from '@guy-romelle-magayano/portfolio/types'

export type PhotoLayoutRef = DivisionRef
export type PhotoLayoutProps = DivisionProps & {
  data?: Array<SlidePhotosData>
}

/**
 * The rotations data.
 */
const RotationsData: Array<string> = [
  'rotate-2',
  '-rotate-2',
  'rotate-2',
  'rotate-2',
  '-rotate-2'
]

/**
 * Renders the photo layout component.
 * @param {PhotoLayoutProps} props - The props of the photo layout.
 * @param {PhotoLayoutRef} ref - The reference of the photo layout.
 * @returns The rendered photo layout component.
 */
const PhotoLayout = memo(
  forwardRef<PhotoLayoutRef, PhotoLayoutProps>(({ data, ...rest }, ref) => {
    return (
      data &&
      data?.length > 0 && (
        <Div {...rest} ref={ref}>
          <Div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
            {data.map(
              ({ src, alt }: SlidePhotosData, index: number) =>
                src &&
                src?.length > 0 && (
                  <Div
                    key={index}
                    className={cn(
                      'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                      RotationsData[index % RotationsData.length]
                    )}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      sizes="(min-width: 640px) 18rem, 11rem"
                      className="absolute inset-0 h-auto w-full object-cover"
                      fill
                      priority
                    />
                  </Div>
                )
            )}
          </Div>
        </Div>
      )
    )
  })
)

PhotoLayout.displayName = 'PhotoLayout'

export default PhotoLayout
