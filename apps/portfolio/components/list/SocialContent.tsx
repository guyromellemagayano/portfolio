'use client'

import clsx from 'clsx'

import { SocialLink } from '@/components'

import { SocialLinksData } from '@/data'

import { TSocialLinksData } from '@/types/data'

/**
 * Renders a list of social links.
 * @param props - The props object.
 * @param props.url - The url of the social link.
 * @param props.icon - The icon of the social link.
 * @param props.ariaLabel - The aria label of the social link.
 * @returns {JSX.Element} The rendered component.
 */
const SocialLinksList = ({
  data
}: {
  data: TSocialLinksData[]
}): JSX.Element => {
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
