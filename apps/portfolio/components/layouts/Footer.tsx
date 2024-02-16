'use client'

import { FC, useId } from 'react'

import Container from '@/components/Container'
import NavLink from '@/components/NavLink'

import type { TNavigationData } from '@/data/navigation'
import { TPagesPages } from '@/data/pages'

import { isArrayType, isEmpty } from '@/utils/checkTypes'

import { TContainerProps } from '@/types/common'

export type TFooterLayoutProps = TContainerProps & TNavigationData

/**
 * Renders the footer layout component.
 * @param id - The id of the footer.
 * @param footerNav - The footer navigation data.
 * @param copyright - The copyright data.
 * @param rest - The rest of the props of the footer.
 * @returns The rendered footer layout component.
 */
const FooterLayout: FC<TFooterLayoutProps> = ({
  id,
  footerNav,
  copyright,
  ...rest
}) => {
  const customId = useId(),
    yearNow = new Date().getFullYear(),
    copyrightText = `Guy Romelle Magayano. All rights reserved.`

  return (
    <footer id={id || customId} {...rest}>
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40 relative mx-4 sm:mx-8 lg:mx-12">
          <Container.Inner className="lg:px-6">
            <div className="flex flex-col items-center justify-between gap-6 lg:flex-row text-center lg:text-left">
              {isArrayType(footerNav) && !isEmpty(footerNav) && (
                <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {footerNav?.map(
                    (
                      item: {
                        link: TPagesPages['link']
                        title: TPagesPages['title']
                      },
                      index
                    ) => (
                      <NavLink key={index} href={item.link}>
                        {item.title}
                      </NavLink>
                    )
                  )}
                </div>
              )}

              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {copyright?.year || yearNow}{' '}
                {copyright?.text || copyrightText}
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}

export default FooterLayout
