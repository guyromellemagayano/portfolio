'use client'

import { ReactNode } from 'react'

import NavItem from '@/components/NavItem'

import NavigationData from '@/data/navigation'

/**
 * Renders the desktop navigation component.
 * @param rest - The props object.
 * @returns The rendered desktop navigation component.
 */
const DesktopNavigation = (rest: any): ReactNode => {
  // Destructure the data from the FooterData function
  const { headerNav } = NavigationData()

  return (
    <nav {...rest}>
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {headerNav.map(item => (
          <NavItem key={item.link} href={item.link}>
            {item.title}
          </NavItem>
        ))}
      </ul>
    </nav>
  )
}

export default DesktopNavigation
