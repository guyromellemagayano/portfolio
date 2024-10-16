import { Fragment, forwardRef, memo } from 'react'

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild
} from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  Div,
  Heading,
  Nav,
  type TNavigationProps,
  type TNavigationRef
} from '@react-components'

import {
  pageFilterMap,
  type TDesktopNavigationProps
} from '@portfolio/components'
import { commonData } from '@portfolio/data'
import type { TCommonProps } from '@portfolio/types'

// Dynamic imports
const ChevronDownSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ChevronDownSvg)
)
const CloseSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.CloseSvg)
)

export type MobileNavigationRef = TNavigationRef
export type MobileNavigationProps = TNavigationProps &
  TDesktopNavigationProps &
  TCommonProps

/**
 * Renders the mobile navigation component.
 * @param {MobileNavigationProps} props - The component props
 * @param {MobileNavigationRef} ref - The component reference
 * @returns The rendered mobile navigation component
 */
const MobileNavigation = memo(
  forwardRef<MobileNavigationRef, MobileNavigationProps>(
    ({ pageFilter, pages, common, ...rest }, ref) => {
      if (!pages && !pageFilter) return null

      return (
        <Popover ref={ref} {...rest}>
          <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
            {common.menu || commonData.menu}
            <ChevronDownSvg className="group-hover:stroke-zinc-400:is(.dark *) ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700" />
          </PopoverButton>

          <Transition>
            <TransitionChild
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <PopoverBackdrop className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-sm dark:bg-black/80" />
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-150 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <PopoverPanel
                className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
                focus
              >
                <Div className="flex flex-row-reverse items-center justify-between">
                  <PopoverButton
                    aria-label={common.closeMenu || commonData.closeMenu}
                    className="-m-1 p-1"
                  >
                    <CloseSvg className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                  </PopoverButton>

                  <Heading
                    as="h2"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {common.navigation || commonData.navigation}
                  </Heading>
                </Div>
                <Nav className="-my-2 mt-6 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                  {pages
                    .filter(({ slug }) => pageFilter.includes(slug))
                    .sort((a, b) => pageFilterMap(pageFilter, a, b))
                    .map(({ id, link, title }) => {
                      return (
                        <PopoverButton
                          key={id}
                          as={Link}
                          className="block py-2"
                          href={link}
                        >
                          {title}
                        </PopoverButton>
                      )
                    })}
                </Nav>
              </PopoverPanel>
            </TransitionChild>
          </Transition>
        </Popover>
      )
    }
  )
)

MobileNavigation.displayName = 'MobileNavigation'

export default MobileNavigation
