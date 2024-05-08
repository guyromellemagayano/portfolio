import { ReactNode } from 'react'

import MuiButton from '@mui/material/Button'
import MuiLink from '@mui/material/Link'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import queryString from 'query-string'

import {
  isEmpty,
  isNotNullOrUndefined,
  isStringType
} from '@guy-romelle-magayano/react-utils'

const useStyles = makeStyles(() => ({
  baseAnchor: {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none'
  }
}))

export type LinkProps = {
  children: ReactNode
  href?: string
  as?: string
  target?: string
  dropUrlParams?: boolean
  className?: string
  withoutMaterial?: boolean
  underline?: boolean
  onClick?: () => any
  isButton?: boolean
  variant?: 'text' | 'outlined' | 'contained' | undefined
  size?: 'small' | 'medium' | 'large' | undefined
  color?: any
  startIcon?: any
  endIcon?: any
  urlParams?: string
  title?: string
}

/**
 * Render a link with optional URL parameters.
 * @param dropUrlParams - Whether to drop URL parameters or not.
 * @param className - The CSS class name for the link.
 * @param children - The content of the link.
 * @param withoutMaterial - Whether to render the link without Material-UI styles.
 * @param underline - Whether to underline the link.
 * @param onClick - The click event handler for the link.
 * @param isButton - Whether the link should be rendered as a button.
 * @param variant - The variant of the link.
 * @param size - The size of the link.
 * @param color - The color of the link.
 * @param startIcon - The start icon of the link.
 * @param endIcon - The end icon of the link.
 * @param urlParams - The URL parameters for the link.
 * @param title - The title attribute of the link.
 * @param target - The target attribute of the link.
 * @param as - The URL for the link.
 * @param href - The href attribute of the link.
 * @returns The rendered link.
 */
const Link = ({
  dropUrlParams,
  className,
  children,
  withoutMaterial,
  underline,
  onClick,
  isButton = false,
  variant,
  size,
  color,
  startIcon,
  endIcon,
  urlParams = '',
  title,
  target = '_self',
  as,
  href = ''
}: LinkProps) => {
  const router = useRouter()

  if (!isNotNullOrUndefined(dropUrlParams) && router) {
    const urlQuerystring = router.asPath.split('?')[1]

    if (!isEmpty(urlQuerystring) && isStringType(urlQuerystring)) {
      href +=
        href.indexOf('?') < 0 ? `?${urlQuerystring}` : `&${urlQuerystring}`
    }
  }

  if (!isEmpty(urlParams) && isStringType(urlParams)) {
    const parsedUrlParams = queryString.parse(urlParams),
      parsedHref = queryString.parseUrl(href),
      mergedParsedHref = {
        ...parsedHref,
        query: {
          ...parsedHref.query,
          ...parsedUrlParams
        }
      }

    href = queryString.stringifyUrl(mergedParsedHref)

    if (isNotNullOrUndefined(as) && isStringType(as)) {
      const parsedAs = queryString.parseUrl(as),
        mergedParsedAs = {
          ...parsedAs,
          query: {
            ...parsedAs.query,
            ...parsedUrlParams
          }
        }

      as = queryString.stringifyUrl(mergedParsedAs)
    }
  }

  const classes = useStyles()

  if (!isNotNullOrUndefined(href) || !isNotNullOrUndefined(href))
    return <>{children}</>

  const external = href.startsWith('http://') || href.startsWith('https://'),
    underlineStyle = underline ? 'always' : 'none'

  if (external === true || !href) {
    return isButton ? (
      <MuiButton
        href={href}
        className={className}
        color={color}
        onClick={() => onClick && onClick()}
        variant={variant}
        size={size}
        startIcon={startIcon}
        endIcon={endIcon}
        title={title}
      >
        {children}
      </MuiButton>
    ) : (
      <MuiLink
        className={className}
        underline={underlineStyle}
        color={color}
        href={href}
        target={target}
        rel="noopener noreferrer"
        onClick={() => onClick && onClick()}
        title={title}
      >
        {children}
      </MuiLink>
    )
  }

  if (withoutMaterial === true) {
    return (
      <NextLink href={href} as={as} passHref>
        <a className={clsx(classes.baseAnchor, className)} title={title}>
          {children}
        </a>
      </NextLink>
    )
  }

  if (isButton === true) {
    return (
      <NextLink href={href} as={as} passHref>
        <MuiButton
          href={as}
          className={className}
          color={color}
          onClick={() => onClick && onClick()}
          variant={variant}
          size={size}
          startIcon={startIcon}
          endIcon={endIcon}
          title={title}
        >
          {children}
        </MuiButton>
      </NextLink>
    )
  }

  return (
    <NextLink href={href} as={as} passHref>
      <MuiLink
        href={as}
        className={className}
        underline={underlineStyle}
        color={color}
        onClick={() => onClick && onClick()}
        title={title}
      >
        {children}
      </MuiLink>
    </NextLink>
  )
}

Link.displayName = 'Link'

export default Link
