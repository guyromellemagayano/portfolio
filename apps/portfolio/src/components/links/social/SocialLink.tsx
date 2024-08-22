import { FC, forwardRef } from 'react'

import { SvgProps } from '@guy-romelle-magayano/react-components'
import {
  A,
  Span,
  type HyperlinkProps,
  type HyperlinkRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, convertStringToLowercase } from '@guy-romelle-magayano/react-utils'

import {
  BehanceSvg,
  DiscordSvg,
  FacebookSvg,
  GithubSvg,
  InstagramSvg,
  LinkedInSvg,
  MailSvg,
  MastodonSvg,
  MediumSvg,
  TwitterSvg
} from '@guy-romelle-magayano/portfolio/components'
import { type SocialLinksData } from '@guy-romelle-magayano/portfolio/types'

export type SocialLinkRef = HyperlinkRef
export type SocialLinkProps = HyperlinkProps &
  SocialLinksData & {
    showLabel?: boolean
  }

/**
 * Renders the social link component.
 * @param {SocialLinkProps} props - The component props
 * @param {SocialLinkRef} ref - The component reference
 * @returns The rendered JSX component
 */
const SocialLink = forwardRef<SocialLinkRef, SocialLinkProps>(
  ({ icon, href, label, showLabel = false, className, ...rest }, ref) => {
    // Define the Icon component based on the icon prop.
    const iconMap: Record<string, FC<SvgProps>> = {
      facebook: FacebookSvg,
      instagram: InstagramSvg,
      twitter: TwitterSvg,
      github: GithubSvg,
      linkedin: LinkedInSvg,
      mail: MailSvg,
      medium: MediumSvg,
      behance: BehanceSvg,
      discord: DiscordSvg,
      mastodon: MastodonSvg
    }

    const Icon = icon ? iconMap[convertStringToLowercase(icon)] : undefined

    if (!href || !Icon) return null

    return (
      <A
        ref={ref}
        className={cn(
          className,
          'group -m-1 p-1',
          showLabel &&
            'flex text-sm font-medium text-zinc-800 transition hover:text-zinc-500 dark:text-zinc-200 dark:hover:text-zinc-500'
        )}
        href={href}
        aria-label={label}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />

        {showLabel && label && <Span className="ml-4">{label}</Span>}
      </A>
    )
  }
)

SocialLink.displayName = 'SocialLink'

export default SocialLink
