import { ForwardedRef, HTMLAttributes, forwardRef, useId } from 'react'

import Link from 'next/link'

import { TCommonSharedComponentsProps } from '@guy-romelle-magayano/react-components/server'
import { cn } from '@guy-romelle-magayano/react-utils/server'

type SharedLinkRef = HTMLAnchorElement

type TSharedLinkProps = HTMLAttributes<SharedLinkRef> &
  TCommonSharedComponentsProps & {
    href?: string
  }

/**
 * Render the shared link component.
 * @param href - The URL of the shared link.
 * @param children - The children of the shared link.
 * @param rest - The rest of the props of the shared link.
 * @param ref - Ref forwarding from parent component.
 * @returns The rendered shared link component.
 */
export const SharedLink = forwardRef<SharedLinkRef, TSharedLinkProps>(
  ({ href = '#', children, ...rest }, ref: ForwardedRef<SharedLinkRef>) => {
    // Generates a unique ID that can be used for accessibility attributes
    const customId = useId()

    return (
      <Link
        ref={ref}
        href={href}
        {...rest}
        id={rest.id ?? customId}
        className={cn(rest.className)}
      >
        {children}
      </Link>
    )
  }
)

SharedLink.displayName = 'SharedLink'
