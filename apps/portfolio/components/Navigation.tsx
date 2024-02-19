'use client'

import { FC, useId } from 'react'

import NavItem from '@/components/NavItem'

import NavigationData from '@/data/navigation'

import { isArrayType, isEmpty } from '@/utils/checkTypes'

import { TCommonComponentProps } from '@/types/common'

export type TDesktopNavigationProps = TCommonComponentProps

/**
 * Renders the desktop navigation component.
 * @param rest - The rest of the desktop navigation props.
 * @returns The rendered desktop navigation component.
 */
const DesktopNavigation: FC<TCommonComponentProps> = ({ id, ...rest }) => {
  const { headerNav } = NavigationData(),
    customId = useId()

  return (
    isArrayType(headerNav) &&
    !isEmpty(headerNav) && (
      <nav id={id || customId} {...rest}>
        <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
          {headerNav.map(({ link, title }, index) => (
            <NavItem key={index} href={link || '#'}>
              {title || ''}
            </NavItem>
          ))}
        </ul>
      </nav>
    )
  )
}

export default DesktopNavigation
