import { forwardRef } from 'react'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

import {
  Li,
  Span,
  type ListItemProps,
  type ListItemRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isEmpty } from '@guy-romelle-magayano/react-utils'

export type NavigationListItemRef = ListItemRef
export type NavigationListItemProps = ListItemProps & {
  href: LinkProps['href']
}

/**
 * Renders the navigation list component.
 * @param href - The URL to link to.
 * @param children - The content to render inside the link.
 * @param rest - The props object.
 * @returns The rendered navigation list component.
 */
const NavigationListItem = forwardRef<
  NavigationListItemRef,
  NavigationListItemProps
>(({ href, children, ...rest }, ref) => {
  const pathname = usePathname(),
    isActive = pathname === href

  return (
    !isEmpty(href) &&
    !isEmpty(children) && (
      <Li ref={ref} {...rest}>
        <Link
          href={href}
          className={cn(
            'relative block px-3 py-2 transition',
            isActive
              ? 'text-amber-500 dark:text-amber-400'
              : 'hover:text-amber-500 dark:hover:text-amber-400'
          )}
        >
          {children}

          {isActive && (
            <Span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 dark:from-amber-400/0 dark:via-amber-400/40 dark:to-amber-400/0" />
          )}
        </Link>
      </Li>
    )
  )
})

NavigationListItem.displayName = 'NavigationListItem'

export default NavigationListItem
