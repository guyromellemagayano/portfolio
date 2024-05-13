import { ReactNode } from 'react'

import {
  LinkShared,
  LinkSharedProps,
  type PageLinkFieldsFragment
} from '@guy-romelle-magayano/coin-colorful/components'

export type PageLinkFeatureProps = Omit<LinkSharedProps, 'children'> & {
  page: PageLinkFieldsFragment
  render?: (pathname?: string) => ReactNode
  children?: ReactNode
}

/**
 * Renders the page link feature component.
 * @param {PageLinkFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageLinkFeature = (props: PageLinkFeatureProps) => {
  const {
    className,
    onClick,
    withoutMaterial,
    underline,
    isButton,
    variant,
    size,
    color,
    endIcon,
    urlParams,
    page,
    render,
    children
  } = props

  const pathname =
      page && page?.slug && page?.slug?.length > 0 ? `/${page.slug}` : ``,
    linkProps = {
      href: pathname,
      className,
      onClick,
      withoutMaterial,
      underline,
      isButton: isButton || false,
      variant,
      size,
      color,
      endIcon,
      urlParams
    }

  return (
    linkProps &&
    Object.keys(linkProps)?.length > 0 && (
      <LinkShared {...linkProps}>
        {render && pathname?.length > 0 ? render(pathname) : children}
      </LinkShared>
    )
  )
}

PageLinkFeature.displayName = 'PageLinkFeature'

export default PageLinkFeature
