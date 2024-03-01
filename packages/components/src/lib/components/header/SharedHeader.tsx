'use client'

import React from 'react'

type SharedHeaderRef = HTMLElement

interface SharedHeaderProps extends React.HTMLAttributes<HTMLElement> {}

/**
 * Render the shared header component.
 * @param children - The children of the shared header.
 * @param rest - The rest of the props of the shared header.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared header component.
 */
export const SharedHeader = React.forwardRef<
  SharedHeaderRef,
  SharedHeaderProps
>(({ children, ...rest }, ref: React.ForwardedRef<SharedHeaderRef>) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = React.useId()

  return (
    <header ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </header>
  )
})

SharedHeader.displayName = 'SharedHeader'
