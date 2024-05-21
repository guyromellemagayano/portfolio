'use client'

export type GetLinkDisplayTextProps = {
  pageName?: string
  categoryName?: string
  postName?: string
  slug?: string
  sys?: GetLinkDisplayTextSysProps
}

export type GetLinkDisplayTextSysProps = {
  id: string
}

/**
 * Retrieves the display text for a link based on the provided props.
 * @param {GetLinkDisplayTextProps} props - The properties to retrieve the display text with.
 * @returns The display text for the link.
 */
export const getLinkDisplayText = (props: GetLinkDisplayTextProps): string => {
  if ('pageName' in props && props?.pageName && props?.pageName?.length > 0) {
    return props.pageName
  }

  if (
    'categoryName' in props &&
    props?.categoryName &&
    props?.categoryName?.length > 0
  ) {
    return props.categoryName
  }

  if ('postName' in props && props?.postName && props?.postName?.length > 0) {
    return props.postName
  }

  return 'slug' in props && props?.slug && props?.slug?.length > 0
    ? props.slug
    : ''
}

export type GetLinkHrefPrefixProps = GetLinkDisplayTextProps

/**
 * Returns the href prefix based on the provided props.
 * @param {GetLinkHrefPrefixProps} props - The properties to retrieve the href prefix with.
 * @returns The href prefix.
 */
export const getLinkHrefPrefix = (props: GetLinkHrefPrefixProps): string => {
  if (
    'pageName' in props &&
    props?.pageName &&
    props?.pageName?.length > 0 &&
    'slug' in props &&
    props?.slug &&
    props?.slug?.length > 0
  ) {
    return `/${props.slug}`
  }

  if (
    'categoryName' in props &&
    props?.categoryName &&
    props?.categoryName?.length > 0 &&
    'slug' in props &&
    props?.slug &&
    props?.slug?.length > 0
  ) {
    return `/category/${props.slug}`
  }

  if (
    'postName' in props &&
    props?.postName &&
    props?.postName?.length > 0 &&
    'slug' in props &&
    props?.slug &&
    props?.slug?.length > 0
  ) {
    return `/post/${props.slug}`
  }

  return 'slug' in props && props?.slug && props?.slug?.length > 0
    ? `/${props.slug}`
    : ''
}
