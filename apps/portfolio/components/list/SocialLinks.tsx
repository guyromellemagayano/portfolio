'use client'

import { ReactNode } from 'react'

import clsx from 'clsx'

import SocialLink from '@/components/links/Social'

import type { TSocialLinksData } from '@/data/social-links'
import SocialLinksData from '@/data/social-links'

/**
 * Renders the social links list component.
 * @param data - The social links data.
 * @returns The rendered social links list component.
 */
const SocialLinksList = ({ data }: { data: TSocialLinksData[] }): ReactNode => {
  return (
    <ul>
      {data?.map((link, index) => {
        return (
          <li
            key={link?.url}
            className={clsx(
              'flex',
              index > 0
                ? index < SocialLinksData?.length - 1
                  ? 'mt-4'
                  : 'mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex'
                : null
            )}
          >
            <SocialLink key={link.url} {...link} showLabel={true} />
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinksList
