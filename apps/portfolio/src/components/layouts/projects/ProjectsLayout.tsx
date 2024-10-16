import { forwardRef, memo } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  Div,
  Heading,
  Img,
  P,
  type TDivisionProps,
  type TDivisionRef
} from '@react-components'

import { cn } from '@react-utils'

import { commonData } from '@portfolio/data'
import type { HomePageAppDataQuery } from '@portfolio/graphql'
import type { TCommonProps } from '@portfolio/types'

export type THomeProjectsLayoutRef = TDivisionRef
export type THomeProjectsLayoutProps = TDivisionProps &
  Pick<HomePageAppDataQuery['homePage']['sections'][4], 'heading' | 'cta'> &
  TCommonProps

// Dynamic imports
const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)

/**
 * Renders the home projects layout component.
 * @param {THomeProjectsLayoutProps} props - The component props
 * @param {THomeProjectsLayoutRef} ref - The component reference
 * @returns The rendered home projects layout component
 */
export const HomeProjectsLayout = memo(
  forwardRef<THomeProjectsLayoutRef, THomeProjectsLayoutProps>(
    ({ common, heading, cta, children, ...rest }, ref) => {
      if (!heading && !cta) return null

      return (
        <ContentSimpleLayout ref={ref} heading={heading} {...rest}>
          <Div className="flex flex-col flex-wrap">
            <Div className="relative pb-10">
              <Div className="w-full overflow-hidden rounded-2xl shadow-md">
                <Img
                  alt="App screenshot"
                  src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png"
                  width={2432}
                  height={1442}
                  className="ring-1 ring-gray-100 dark:ring-black"
                />
              </Div>
            </Div>
            <Div>
              <Heading
                as="h2"
                className="text-base font-semibold leading-7 text-zinc-600 dark:text-zinc-400"
              >
                Sitecrawler
              </Heading>
              <Div>
                <P className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-100">
                  Custom web crawler to help solve site SEO issues
                </P>
                <P className="mt-6 w-full max-w-3xl text-base leading-7 text-gray-600 dark:text-zinc-400">
                  Developed a comprehensive brand identity for a tech startup,
                  Tech Innovators, specializing in disruptive innovations. The
                  goal was to convey a modern yet approachable image that
                  resonated with both corporate clients and tech enthusiasts.
                </P>
              </Div>
            </Div>

            {cta && (
              <Div className="mt-10 flex flex-row flex-wrap gap-3">
                {cta.map(({ id, slug, link, buttonType }) => {
                  const label =
                    slug === 'go-to-project'
                      ? common?.checkProject || commonData.checkProject
                      : slug === 'projects'
                        ? common?.goToProjects || commonData.goToProjects
                        : ''

                  return (
                    <Link
                      key={id}
                      href={link || '#'}
                      className={cn(
                        `text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold outline-offset-2 transition active:transition-none`,
                        buttonType === 'primary'
                          ? 'bg-zinc-800 text-zinc-50 hover:bg-zinc-600 active:bg-zinc-600 dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300'
                          : 'border-2 border-zinc-800 bg-transparent text-zinc-800 hover:border-transparent active:bg-transparent dark:border-zinc-300 dark:text-zinc-300 dark:hover:border-transparent'
                      )}
                    >
                      {label}
                    </Link>
                  )
                })}
              </Div>
            )}
          </Div>

          {children}
        </ContentSimpleLayout>
      )
    }
  )
)

HomeProjectsLayout.displayName = 'HomeProjectsLayout'
