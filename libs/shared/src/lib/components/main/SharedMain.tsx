'use client'

import { ForwardedRef, forwardRef, HTMLAttributes, useId } from 'react'

type SharedMainRef = HTMLElement

/* eslint-disable-next-line */
interface SharedMainProps extends HTMLAttributes<SharedMainRef> {}

/**
 * Render the shared main component.
 * @param children - The children of the shared main.
 * @param rest - The rest of the props of the shared main.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared main component.
 */
export const SharedMain = forwardRef<SharedMainRef, SharedMainProps>(
  ({ children, ...rest }, ref: ForwardedRef<SharedMainRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <main ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </main>
    )
  }
)

SharedMain.displayName = 'SharedMain'
