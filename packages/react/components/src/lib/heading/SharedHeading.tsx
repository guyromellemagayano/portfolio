import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/react-utils/server'

type SharedHeadingRef = HTMLHeadingElement

type TSharedHeadingProps = HTMLAttributes<SharedHeadingRef> &
  TCommonSharedComponentsProps & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }

/**
 * Render the shared heading component.
 * @param as - The tag of the shared heading.
 * @param children - The children of the shared heading.
 * @param rest - The rest of the props of the shared heading.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared heading component.
 */
export const SharedHeading = forwardRef<SharedHeadingRef, TSharedHeadingProps>(
  (
    { as: Component = 'h1', children, ...rest },
    ref: ForwardedRef<SharedHeadingRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Component
        ref={ref}
        {...rest}
        id={rest.id ?? customId}
        className={cn(rest.className)}
      >
        {children}
      </Component>
    )
  }
)

SharedHeading.displayName = 'SharedHeading'
