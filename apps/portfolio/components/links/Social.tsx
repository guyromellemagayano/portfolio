'use client'

import { FunctionComponent, SVGProps } from 'react'

import clsx from 'clsx'

export type TSocialLinkProps<T = object> = T & {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>
  url?: string | null
  ariaLabel?: string | null
  showLabel?: boolean | null
}

/**
 * Renders a social link with an icon and an optional label.
 * @param icon - Icon component
 * @param url - Link URL
 * @param ariaLabel - Aria label
 * @param showLabel - Show label
 * @returns {JSX.Element} The rendered component.
 */
const SocialLink = ({
  icon: Icon,
  url,
  ariaLabel,
  showLabel = false
}: TSocialLinkProps): JSX.Element => {
  return (
    <a
      className={clsx(
        'group -m-1 p-1',
        showLabel &&
          'flex text-sm font-medium text-zinc-800 transition hover:text-amber-500 dark:text-zinc-200 dark:hover:text-amber-500'
      )}
      href={url || '#'}
      aria-label={ariaLabel || ''}
      target="_blank"
      rel="noreferrer"
    >
      <Icon className="h-6 w-6 fill-zinc-500 transition group-hover:fill-zinc-600 dark:fill-zinc-400 dark:group-hover:fill-zinc-300" />
      {showLabel && <span className="ml-4">{ariaLabel}</span>}
    </a>
  )
}

export default SocialLink
