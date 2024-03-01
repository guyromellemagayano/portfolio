'use client'

import React from 'react'

type SharedContainerRef = HTMLDivElement

interface SharedContainerProps
  extends React.HTMLAttributes<SharedContainerRef> {
  as?: React.ElementType
}

/**
 * Render the shared container component.
 * @param children - The children of the shared container.
 * @param rest - The rest of the props of the shared container.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared container component.
 */
export const SharedContainer = React.forwardRef<
  SharedContainerRef,
  SharedContainerProps
>(
  (
    { as: Component = 'div', children, ...rest },
    ref: React.ForwardedRef<SharedContainerRef>
  ) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = React.useId()

    return (
      <Component ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </Component>
    )
  }
)

SharedContainer.displayName = 'SharedContainer'
