import { ForwardedRef, ReactNode, SVGProps, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/react-utils/server'

type TSharedSvgRef = SVGSVGElement

type TSharedSvgProps = SVGProps<TSharedSvgRef> &
  TCommonSharedComponentsProps & {
    children?: ReactNode
  }

/**
 * Renders a shared SVG.
 * @param children - The children to render within the SVG.
 * @param rest - Additional SVG props
 * @returns The rendered shared SVG.
 */
export const SharedSvg = forwardRef<TSharedSvgRef, TSharedSvgProps>(
  ({ children, ...rest }, ref: ForwardedRef<TSharedSvgRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <svg
        ref={ref}
        {...rest}
        id={rest.id ?? customId}
        className={cn(rest.className)}
      >
        {children}
      </svg>
    )
  }
)

SharedSvg.displayName = 'SharedSvg'

type TSharedSvgPathProps = SVGProps<SVGPathElement> &
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
