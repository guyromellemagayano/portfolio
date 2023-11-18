'use client'

/**
 * Render an SVG image of an arrow pointing down.
 * @param {React.SVGProps<SVGSVGElement>} rest - additional SVG props
 * @returns {JSX.Element} The rendered component.
 */
export default function ArrowDownSvgImage(
  rest: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...rest}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
