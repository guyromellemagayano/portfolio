import React from 'react'

export type TSvgRef = SVGSVGElement
export type TSvgProps = React.SVGProps<TSvgRef>

/**
 * Renders a SVG image.
 * @param {TSvgProps} props - The SVG image properties
 * @param {TSvgRef} ref - The SVG image reference
 * @returns The rendered SVG image
 */
export const Svg = React.forwardRef<TSvgRef, TSvgProps>(
  ({ children, ...rest }, ref) => {
    return (
      <svg ref={ref} {...rest}>
        {children}
      </svg>
    )
  }
)

Svg.displayName = 'SVG'

export type TSvgPathRef = SVGPathElement
export type TSvgPathProps = React.SVGProps<TSvgPathRef>

/**
 * Renders a shared SVG path.
 * @param {TSvgPathProps} props - The shared SVG path properties
 * @returns The rendered shared SVG path
 */
export const SvgPath = ({ ...rest }: TSvgPathProps) => {
  return <path {...rest} />
}

SvgPath.displayName = 'SVGPath'
