'use client'

/**
 * Render an SVG image of a chevron pointing down.
 * @param {React.SVGProps<SVGSVGElement>} rest - additional SVG props
 * @returns {JSX.Element} The rendered component.
 */
export default function ChevronDownSvgImage(
  rest: React.SVGProps<SVGSVGElement>
): JSX.Element {
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
