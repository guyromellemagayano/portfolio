'use client'

import Container from '@/components/Container'
import NavLink from '@/components/NavLink'

import type { TNavigationData } from '@/data/navigation'

/**
 * Render the footer layout component.
 * @returns {JSX.Element} The rendered component.
 */
const FooterLayout = ({
  footerNav,
  copyright
}: TNavigationData): JSX.Element => {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40 relative mx-4 sm:mx-8 lg:mx-12">
          <Container.Inner className="lg:px-6">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row text-center lg:text-left">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {footerNav?.map(item => (
                  <NavLink key={item.link} href={item.link}>
                    {item.title}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {copyright?.year} {copyright?.text}
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}

export default FooterLayout
