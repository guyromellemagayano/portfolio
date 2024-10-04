import { Fragment, forwardRef, memo } from 'react'

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild
} from '@headlessui/react'
import Link from 'next/link'

import {
  Div,
  Heading,
  Nav,
  type TNavigationProps,
  type TNavigationRef
} from '@react-components'

import { ChevronDownSvg, CloseSvg } from '@portfolio/components'
import type { PagesData } from '@portfolio/types'

export type MobileNavigationRef = TNavigationRef
export type MobileNavigationProps = TNavigationProps & {
  data: PagesData[]
}

const strings = {
  menu: 'Menu',
  closeMenu: 'Close menu',
  navigation: 'Navigation'
}

/**
 * Renders the mobile navigation component.
 * @param {MobileNavigationProps} props - The component props
 * @param {MobileNavigationRef} ref - The component reference
 * @returns The rendered mobile navigation component
 */
const MobileNavigation = memo(
  forwardRef<MobileNavigationRef, MobileNavigationProps>(
    ({ data, ...rest }, ref) => {
      if (!data) return null

      return (
        <Popover ref={ref} {...rest}>
          <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
            {strings.menu}
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
                focus
                className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-zinc-800"
              >
                <Div className="flex flex-row-reverse items-center justify-between">
                  <PopoverButton
                    aria-label={strings.closeMenu}
                    className="-m-1 p-1"
                  >
                    <CloseSvg className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
                  </PopoverButton>

                  <Heading
                    as="h2"
                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                  >
                    {strings.navigation}
                  </Heading>
                </Div>
                <Nav className="-my-2 mt-6 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                  {data.map(({ id, link, title }) => {
                    return (
                      <PopoverButton
                        as={Link}
                        className="block py-2"
                        href={link}
                        key={id}
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

export default MobileNavigation
