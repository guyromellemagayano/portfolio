'use client'

import { FC, FunctionComponent, SVGProps } from 'react'

import clsx from 'clsx'

import { TCommonComponentProps } from '@/types/common'
import { isEmpty, isStringType } from '@/utils/checkTypes'

export type TSocialLinkProps = TCommonComponentProps & {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
  url?: string
  ariaLabel?: string
  showLabel?: boolean
}

/**
 * Renders the social link component.
 * @param icon - The icon component.
 * @param url - The url of the social link.
 * @param ariaLabel - The aria label of the social link.
 * @param [showLabel=false] - The show label of the social link.
 * @returns The rendered social link component.
 */
const SocialLink: FC<TSocialLinkProps> = ({
  icon: Icon,
  url,
  ariaLabel,
  showLabel = false,
  ...rest
}) => {
  return (
    isStringType(url) &&
    !isEmpty(url) &&
    Icon && (
      <a
        className={clsx(
          'group -m-1 p-1',
          showLabel &&
            'flex text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500'
        )}
        href={url}
        aria-label={ariaLabel || ''}
        target="_blank"
        rel="noreferrer"
        {...rest}
      >
        <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
        {showLabel && <span className="ml-4">{ariaLabel}</span>}
      </a>
    )
  )
}

export default SocialLink
