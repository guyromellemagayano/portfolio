'use client'

import { FC, useId } from 'react'

import clsx from 'clsx'

import SocialLink from '@/components/links/Social'

import type { TSocialLinksData } from '@/data/social-links'
import SocialLinksData from '@/data/social-links'

import { isArrayType, isEmpty } from '@/utils/checkTypes'

import { TCommonComponentProps } from '@/types/common'

export type TSocialLinksListProps = TCommonComponentProps & {
  data: TSocialLinksData[]
}

/**
 * Renders the social links list component.
 * @param id - The additional ID for the component.
 * @param data - The social links data.
 * @param rest - The rest of the props.
 * @returns The rendered social links list component.
 */
const SocialLinksList: FC<TSocialLinksListProps> = ({ id, data, ...rest }) => {
  const customId = useId()

  return (
    isArrayType(data) &&
    !isEmpty(data) && (
      <ul id={id || customId} {...rest}>
        {data.map((rest2, index) => {
          return (
            <li
              key={index}
              className={clsx(
                'flex',
                index > 0
                  ? index < SocialLinksData?.length - 1
                    ? 'mt-4'
                    : 'mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex'
                  : null
              )}
            >
              <SocialLink key={index} {...rest2} showLabel={true} />
            </li>
          )
        })}
      </ul>
    )
  )
}

export default SocialLinksList
