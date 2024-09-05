import React from 'react'

export type SvgRef = SVGSVGElement
export type SvgProps = React.SVGProps<SvgRef>

/**
 * Renders a SVG image.
 * @param {SvgProps} props - The SVG image properties
 * @param {SvgRef} ref - The SVG image reference
 * @returns The rendered SVG image
 */
export const Svg = React.forwardRef<SvgRef, SvgProps>(
  ({ children, ...rest }, ref) => {
    return (
      <svg ref={ref} {...rest}>
        {children}
      </svg>
    )
  }
)

Svg.displayName = 'SVG'

export type SvgPathRef = SVGPathElement
export type SvgPathProps = React.SVGProps<SvgPathRef>

/**
 * Renders a shared SVG path.
 * @param {SvgPathProps} props - The shared SVG path properties
 * @returns The rendered shared SVG path
 */
export const SvgPath = ({ ...rest }: SvgPathProps) => {
  return <path {...rest} />
}

SvgPath.displayName = 'SVGPath'
