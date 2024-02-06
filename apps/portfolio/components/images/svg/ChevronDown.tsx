'use client'

import { ReactNode } from 'react'

/**
 * Rendersan SVG image of a chevron pointing down.
 * @param rest - Additional SVG props
 * @returns The rendered SVG image of a chevron pointing down.
 */
const ChevronDownSvgImage = (
  rest: React.SVGProps<SVGSVGElement>
): ReactNode => {
  return (
    <svg viewBox="0 0 8 6" aria-hidden="true" {...rest}>
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ChevronDownSvgImage
