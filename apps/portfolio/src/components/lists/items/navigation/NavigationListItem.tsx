'use client'

import { forwardRef, memo, useMemo } from 'react'

import Link, { type LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Li,
  Span,
  type TListItemProps,
  type TListItemRef
} from '@react-components'

import { cn } from '@react-utils'

export type NavigationListItemRef = TListItemRef
export type NavigationListItemProps = TListItemProps & Pick<LinkProps, 'href'>

/**
 * Renders the navigation list component.
 * @param {NavigationListItemProps} props - The component props
 * @param {NavigationListItemRef} ref - The component reference
 * @returns The rendered navigation list component
 */
const NavigationListItem = memo(
  forwardRef<NavigationListItemRef, NavigationListItemProps>(
    ({ href, children, ...rest }, ref) => {
      const pathname = usePathname()
      const isActive = pathname === href

      const classNames = useMemo(
        () =>
          cn(
            'relative block px-3 py-2 transition',
            isActive
              ? 'text-sky-500 dark:text-sky-400'
              : 'hover:text-sky-500 dark:hover:text-sky-400'
          ),
        [isActive]
      )

      if (!href || !children) return null

      return (
        <Li ref={ref} {...rest}>
          <Link href={href} className={classNames}>
            {children}
            {isActive && (
              <Span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-sky-500/0 via-sky-500/40 to-sky-500/0 dark:from-sky-400/0 dark:via-sky-400/40 dark:to-sky-400/0" />
            )}
          </Link>
        </Li>
      )
    }
  )
)

NavigationListItem.displayName = 'NavigationListItem'

export default NavigationListItem
