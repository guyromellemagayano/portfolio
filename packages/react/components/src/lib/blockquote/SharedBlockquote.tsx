import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/react-utils/server'

type SharedBlockquoteRef = HTMLQuoteElement

type TSharedBlockquoteProps = HTMLAttributes<SharedBlockquoteRef> &
  TCommonSharedComponentsProps & {}

/**
 * Render the shared blockquote component.
 * @param children - The children of the shared blockquote.
 * @param rest - The rest of the props of the shared blockquote.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared blockquote component.
 */
export const SharedBlockquote = forwardRef<
  SharedBlockquoteRef,
  TSharedBlockquoteProps
>(({ children, ...rest }, ref: ForwardedRef<SharedBlockquoteRef>) => {
  // Generates a unique ID that can be used for accessibility attributes
  const customId = useId()

  return (
    <blockquote
      ref={ref}
      {...rest}
      id={rest.id ?? customId}
      className={cn(rest.className)}
    >
      {children}
    </blockquote>
  )
})

SharedBlockquote.displayName = 'SharedBlockquote'
