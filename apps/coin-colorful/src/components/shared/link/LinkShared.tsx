import { ReactNode } from 'react'

import { isNotNullOrUndefined } from '@guy-romelle-magayano/react-utils'
import MuiButton from '@mui/material/Button'
import MuiLink from '@mui/material/Link'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import queryString from 'query-string'

const useStyles = makeStyles(() => ({
  baseAnchor: {
    display: 'block',
    color: 'inherit',
    textDecoration: 'none'
  }
}))

export type LinkSharedProps = {
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
 * Renders the shared link component for the `contentful` API to consume.
 * @param {LinkSharedProps} props - The properties to render the component with.
 * @returns The rendered component.
 */
const LinkShared = (props: LinkSharedProps) => {
  const {
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
  } = props

  let updatedHref = href,
    updatedAs = as

  const router = useRouter()

  if (!isNotNullOrUndefined(dropUrlParams) && dropUrlParams && router) {
    const urlQuerystring = router.asPath?.split('?')[1] || ''

    if (urlQuerystring && urlQuerystring?.length > 0) {
      updatedHref +=
        href.indexOf('?') < 0 ? `?${urlQuerystring}` : `&${urlQuerystring}`
    }
  }

  if (urlParams && urlParams?.length > 0) {
    const parsedUrlParams = queryString.parse(urlParams),
      parsedHref = queryString.parseUrl(href),
      mergedParsedHref = {
        ...parsedHref,
        query: {
          ...parsedHref.query,
          ...parsedUrlParams
        }
      }

    updatedHref = queryString.stringifyUrl(mergedParsedHref)

    if (as && as?.length > 0) {
      const parsedAs = queryString.parseUrl(as),
        mergedParsedAs = {
          ...parsedAs,
          query: {
            ...parsedAs.query,
            ...parsedUrlParams
          }
        }

      updatedAs = queryString.stringifyUrl(mergedParsedAs)
    }
  }

  const classes = useStyles()

  if (!href) return <>{children}</>

  const external = href.startsWith('http://') || href.startsWith('https://'),
    underlineStyle = underline ? 'always' : 'none'

  if (external || !href) {
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

  if (withoutMaterial) {
    return (
      <Link
        href={href}
        as={as}
        className={clsx(classes.baseAnchor, className)}
        title={title}
        passHref
      >
        {children}
      </Link>
    )
  }

  if (isButton) {
    return (
      <Link href={href} as={as} passHref>
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
      </Link>
    )
  }

  return (
    <Link href={href} as={as} passHref>
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
    </Link>
  )
}

LinkShared.displayName = 'LinkShared'

export default LinkShared
