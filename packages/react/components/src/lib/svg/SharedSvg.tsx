import { ReactNode, SVGProps, useId } from 'react'

import { TCommonSharedComponentsProps } from '../../components'

export type TSharedSvgProps = SVGProps<SVGSVGElement> &
  TCommonSharedComponentsProps & {
    children?: ReactNode
  }

/**
 * Renders a shared SVG.
 * @param children - The children to render within the SVG.
 * @param rest - Additional SVG props
 * @returns The rendered shared SVG.
 */
export const SharedSvg = ({ children, ...rest }: TSharedSvgProps) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = useId()

  return (
    <svg id={customId} {...rest}>
      {children}
    </svg>
  )
}

SharedSvg.displayName = 'SharedSvg'

export type TSharedSvgPathProps = SVGProps<SVGPathElement> &
  TCommonSharedComponentsProps & {}

/**
 * Renders a shared SVG path.
 * @param rest - Additional SVG path props
 * @returns The rendered shared SVG path.
 */
export const SharedSvgPath = ({ ...rest }: TSharedSvgPathProps) => {
  return <path {...rest} />
}

SharedSvgPath.displayName = 'SharedSvgPath'
