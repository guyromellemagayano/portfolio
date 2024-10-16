'use client'

import { type ComponentType, forwardRef, memo, useMemo } from 'react'

import dynamic from 'next/dynamic'

import {
  A,
  Span,
  type THyperlinkProps,
  type THyperlinkRef,
  type TSvgProps
} from '@react-components'

import { cn, convertStringToLowercase } from '@react-utils'

import type { HomePageAppDataQuery } from '@portfolio/graphql'

// Dynamic imports
const BehanceSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.BehanceSvg)
)
const DiscordSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.DiscordSvg)
)
const FacebookSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.FacebookSvg)
)
const GithubSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.GithubSvg)
)
const InstagramSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.InstagramSvg)
)
const LinkedInSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.LinkedInSvg)
)
const MailSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.MailSvg)
)
const MastodonSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.MastodonSvg)
)
const MediumSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.MediumSvg)
)
const TwitterSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.TwitterSvg)
)

export type SocialLinkRef = THyperlinkRef
export type SocialLinkProps = THyperlinkProps &
  Pick<
    HomePageAppDataQuery['links']['social'][0],
    'icon' | 'href' | 'label'
  > & {
    showLabel?: boolean
  }

/**
 * Renders the social link component.
 * @param {SocialLinkProps} props - The component props
 * @param {SocialLinkRef} ref - The component reference
 * @returns The rendered social link component
 */
const SocialLink = memo(
  forwardRef<SocialLinkRef, SocialLinkProps>(
    ({ icon, href, label, showLabel = false, className, ...rest }, ref) => {
      // Define the Icon component based on the icon prop.
      const iconMap: Record<string, ComponentType<TSvgProps>> = useMemo(
        () => ({
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
        }),
        []
      )

      const Icon = useMemo(() => {
        return icon ? iconMap[convertStringToLowercase(icon)] : undefined
      }, [icon, iconMap])

      if (!href || !Icon) return null

      return (
        <A
          ref={ref}
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            className,
            'group -m-1 p-1',
            showLabel &&
              'flex text-sm font-medium text-zinc-800 transition hover:text-zinc-500 dark:text-zinc-200 dark:hover:text-zinc-500'
          )}
          aria-label={label}
          {...rest}
        >
          <Icon
            className={cn(
              'group-hover:fill-zinc-300:is(.dark *) h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400'
            )}
          />
          {showLabel && label && <Span className="ml-4">{label}</Span>}
        </A>
      )
    }
  )
)

SocialLink.displayName = 'SocialLink'

export default SocialLink
