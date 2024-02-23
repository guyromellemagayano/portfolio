'use client'

import { TCommonSvgImageProps } from '@guy-romelle-magayano/portfolio/types/common'

/**
 * Renders an SVG image of an arrow pointing left.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of an arrow pointing left.
 */
const ArrowLeftSvgImage: TCommonSvgImageProps = rest => {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowLeftSvgImage
