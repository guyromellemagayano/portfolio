'use client'

import { TCommonSvgImageProps } from '@/types/common'

/**
 * Renders an SVG image of a chevron pointing right.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a chevron pointing right.
 */
const ChevronRightSvgImage: TCommonSvgImageProps = rest => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M6.75 5.75 9.25 8l-2.5 2.25"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronRightSvgImage
