'use client'

/**
 * Render an SVG image of an arrow pointing left.
 * @param {React.SVGProps<SVGSVGElement>} rest - additional SVG props
 * @returns {JSX.Element} The rendered component.
 */
export default function ArrowLeftSvgImage(
  rest: React.SVGProps<SVGSVGElement>
): JSX.Element {
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
