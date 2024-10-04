import Link, { LinkProps } from 'next/link'

import type { THyperlinkProps, THyperlinkRef } from '@react-components'

import { cn } from '@react-utils'
import { forwardRef, memo } from 'react'

export type NavigationLinkRef = THyperlinkRef
export type NavigationLinkProps = THyperlinkProps & LinkProps

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
            'transition hover:text-sky-500 dark:hover:text-sky-400',
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
