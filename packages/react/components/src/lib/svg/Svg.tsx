'use client'

import { SVGProps, forwardRef } from 'react'

export type SvgRef = SVGSVGElement
export type SvgProps = SVGProps<SvgRef>

/**
 * Renders a SVG image.
 * @param children - The children to render within the SVG image.
 * @param rest - Additional SVG image props
 * @returns The rendered SVG image.
 */
export const Svg = forwardRef<SvgRef, SvgProps>(
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
export type SvgPathProps = SVGProps<SvgPathRef>

/**
 * Renders a shared SVG path.
 * @param rest - Additional SVG path props
 * @returns The rendered shared SVG path.
 */
export const SvgPath = ({ ...rest }: SvgPathProps) => {
  return <path {...rest} />
}

SvgPath.displayName = 'SVGPath'
