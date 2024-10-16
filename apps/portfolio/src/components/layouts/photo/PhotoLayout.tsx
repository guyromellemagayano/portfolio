import { forwardRef, memo } from 'react'

import Image from 'next/image'

import { Div, type TDivisionProps, type TDivisionRef } from '@react-components'

import { cn } from '@react-utils'

import type { HomePageAppDataQuery } from '@portfolio/graphql'
import type { TCommonProps } from '@portfolio/types'

export type TPhotoLayoutRef = TDivisionRef
export type TPhotoLayoutProps = TDivisionProps &
  TCommonProps &
  Pick<HomePageAppDataQuery['images'], 'slideImages'>

// The rotations data
export const rotationsData = [
  'rotate-2',
  '-rotate-2',
  'rotate-2',
  'rotate-2',
  '-rotate-2'
]

/**
 * Renders the photo layout component.
 * @param {TPhotoLayoutProps} props - The component props
 * @param {TPhotoLayoutRef} ref - The component reference
 * @returns The rendered photo layout component
 */
const PhotoLayout = memo(
  forwardRef<TPhotoLayoutRef, TPhotoLayoutProps>(
    ({ slideImages, common, ...rest }, ref) => {
      if (!slideImages) return null

      return (
        slideImages && (
          <Div ref={ref} {...rest}>
            <Div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
              {slideImages?.map(({ id, src, alt }, index) => (
                <Div
                  key={id}
                  className={cn(
                    'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                    rotationsData[index % rotationsData.length]
                  )}
                >
                  <Image
                    src={src}
                    alt={alt || common.defaultImageAlt}
                    sizes="(min-width: 640px) 18rem, 11rem"
                    className="absolute inset-0 h-auto w-full object-cover"
                    fill
                  />
                </Div>
              ))}
            </Div>
          </Div>
        )
      )
    }
  )
)

PhotoLayout.displayName = 'PhotoLayout'

export default PhotoLayout
