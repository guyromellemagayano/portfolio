'use client'

import {
  ElementType,
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  useId
} from 'react'

type SharedContainerRef = HTMLDivElement

/* eslint-disable-next-line */
interface SharedContainerProps extends HTMLAttributes<SharedContainerRef> {
  as?: ElementType
}

/**
 * Render the shared container component.
 * @param children - The children of the shared container.
 * @param rest - The rest of the props of the shared container.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared container component.
 */
export const SharedContainer = forwardRef<
  SharedContainerRef,
  SharedContainerProps
>(
  (
    { as: Component = 'div', children, ...rest },
    ref: ForwardedRef<SharedContainerRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Component ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </Component>
    )
  }
)

SharedContainer.displayName = 'SharedContainer'
