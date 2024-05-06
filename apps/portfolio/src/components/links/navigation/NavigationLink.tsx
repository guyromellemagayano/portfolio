import Link, { LinkProps } from 'next/link'

import { HyperlinkProps } from '@guy-romelle-magayano/react-components/server'

import {
  cn,
  isEmpty,
  isObjectType,
  isStringType
} from '@guy-romelle-magayano/react-utils'

export type NavigationLinkProps = LinkProps & HyperlinkProps

/**
 * Renders the nav link component.
 * @param href - The URL to link to.
 * @param className - The class name to apply to the link.
 * @param children - The content to render inside the link.
 * @param rest - The rest of the props.
 * @returns The rendered nav link component.
 */
const NavigationLink = ({
  href,
  className,
  children,
  ...rest
}: NavigationLinkProps) => {
  return (
    !isEmpty(href) &&
    (isStringType(href) || isObjectType(href)) && (
      <Link
        href={href}
        {...rest}
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
