import Link, { LinkProps } from 'next/link'

import type { HyperlinkProps, HyperlinkRef } from '@react-components'

import { cn } from '@react-utils'
import { forwardRef, memo } from 'react'

export type NavigationLinkRef = HyperlinkRef
export type NavigationLinkProps = HyperlinkProps & LinkProps

/**
 * Renders the nav link component.
 * @param {NavigationLinkProps} props - The component props
 * @returns The rendered nav link component
 */
const NavigationLink = memo(
  forwardRef<NavigationLinkRef, NavigationLinkProps>(
    ({ href, className, children, ...rest }, ref) => {
      if (!href || !children) return null

      return (
        <Link
          ref={ref}
          href={href}
          className={cn(
            'transition hover:text-amber-500 dark:hover:text-amber-400',
            className
          )}
          {...rest}
        >
          {children}
        </Link>
      )
    }
  )
)

NavigationLink.displayName = 'NavigationLink'

export default NavigationLink
