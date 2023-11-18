'use client'

/**
 * Render an SVG image of a close icon.
 * @param {React.SVGProps<SVGSVGElement>} rest - additional SVG props
 * @returns {JSX.Element} The rendered component.
 */
export default function CloseSvgImage(
  rest: React.SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...rest}>
      <path
        d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
