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
 * @param {SocialLinkProps} props - The properties to render the social link component.
 * @param {SocialLinkRef} ref - The reference of the social link component.
 * @returns The rendered social link component.
 */
const SocialLink = forwardRef<SocialLinkRef, SocialLinkProps>(
  ({ icon, href, label, showLabel = false, id, className, ...rest }, ref) => {
    let Icon: FC<SvgProps> | undefined = () => undefined

    const loweredIcon: string = icon ? convertStringToLowercase(icon) : ''

    // Set the Icon value based on the icon prop.
    if (loweredIcon) {
      switch (loweredIcon) {
        case 'facebook':
          Icon = FacebookSvg
          break
        case 'instagram':
          Icon = InstagramSvg
          break
        case 'twitter':
          Icon = TwitterSvg
          break
        case 'github':
          Icon = GithubSvg
          break
        case 'linkedin':
          Icon = LinkedInSvg
          break
        case 'mail':
          Icon = MailSvg
          break
        case 'medium':
          Icon = MediumSvg
          break
        case 'behance':
          Icon = BehanceSvg
          break
        case 'discord':
          Icon = DiscordSvg
          break
        case 'mastodon':
          Icon = MastodonSvg
          break
        default:
          break
      }
    }

    return (
      href &&
      href?.length > 0 && (
        <A
          ref={ref}
          {...rest}
          className={cn(
            className,
            'group -m-1 p-1',
            showLabel &&
              'flex text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500'
          )}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
        >
          <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />

          {showLabel && label && label?.length > 0 && (
            <Span className="ml-4">{label}</Span>
          )}
        </A>
      )
    )
  }
)

SocialLink.displayName = 'SocialLink'

export default SocialLink
