import { forwardRef } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import {
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

import { SlidePhotosData } from '@guy-romelle-magayano/portfolio/types/data'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)

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
 * @param data - The photo layout data.
 * @param rest - The rest of the photo layout props.
 * @returns The rendered photo layout component.
 */
const PhotoLayout = forwardRef<PhotoLayoutRef, PhotoLayoutProps>(
  ({ data, ...rest }, ref) => {
    return (
      data && (
        <Div ref={ref} {...rest}>
          <Div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
            {data?.map(
              ({ src, alt }: SlidePhotosData, index: number) =>
                src && (
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
                      className="absolute inset-0 h-full w-full object-cover"
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
  }
)

PhotoLayout.displayName = 'PhotoLayout'

export default PhotoLayout
