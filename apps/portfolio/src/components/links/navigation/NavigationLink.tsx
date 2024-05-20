import Link, { LinkProps } from 'next/link'

import { HyperlinkProps } from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

export type NavigationLinkProps = LinkProps & HyperlinkProps

/**
 * Renders the nav link component.
 * @param {NavigationLinkProps} props - The properties to render the nav link component.
 * @returns The rendered nav link component.
 */
const NavigationLink = ({
  href,
  className,
  children,
  ...rest
}: NavigationLinkProps) => {
  return (
    href && (
      <Link
        {...rest}
        href={href}
        className={cn(
          'transition hover:text-amber-500 dark:hover:text-amber-400',
          className
        )}
      >
        {children}
      </Link>
    )
  )
}

NavigationLink.displayName = 'NavigationLink'

export default NavigationLink
