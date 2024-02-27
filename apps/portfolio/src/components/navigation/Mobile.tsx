'use client'

import { FC, useId } from 'react'

import { Popover } from '@headlessui/react'

import ChevronDownSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/ChevronDown'
import CloseSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/Close'
import MobileNavItem from '@guy-romelle-magayano/portfolio/components/nav-item/Mobile'

import NavigationData from '@guy-romelle-magayano/portfolio/data/navigation'

import {
  isArrayType,
  isEmpty
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

import { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TMobileNavigationProps = TCommonComponentProps

/**
 * Renders the mobile navigation component.
 * @param rest - The rest of the mobile navigation props.
 * @returns The rendered mobile navigation component.
 */
const MobileNavigation: FC<TMobileNavigationProps> = ({ id, ...rest }) => {
  const { headerNav } = NavigationData(),
    customId = useId()

  return (
    <Popover id={id || customId} {...rest}>
      <Popover.Button className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        Menu
        <ChevronDownSvgImage className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </Popover.Button>

      <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />

      <Popover.Panel
        focus
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <Popover.Button aria-label="Close menu" className="-m-1 p-1">
            <CloseSvgImage className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          </Popover.Button>
          <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Navigation
          </h2>
        </div>
        {isArrayType(headerNav) && !isEmpty(headerNav) && (
          <nav className="mt-6">
            <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
              {headerNav.map(({ link, title }, index: number) => (
                <MobileNavItem key={index} href={link || '#'}>
                  {title || ''}
                </MobileNavItem>
              ))}
            </ul>
          </nav>
        )}
      </Popover.Panel>
    </Popover>
  )
}

export default MobileNavigation
