import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/components/server'

type SharedHeaderRef = HTMLElement

export type TSharedHeaderProps = HTMLAttributes<HTMLElement> &
  TCommonSharedComponentsProps & {}

/**
 * Render the shared header component.
 * @param children - The children of the shared header.
 * @param rest - The rest of the props of the shared header.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared header component.
 */
export const SharedHeader = forwardRef<SharedHeaderRef, TSharedHeaderProps>(
  ({ children, ...rest }, ref: ForwardedRef<SharedHeaderRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <header ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </header>
    )
  }
)

SharedHeader.displayName = 'SharedHeader'
