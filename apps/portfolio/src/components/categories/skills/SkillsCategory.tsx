'use client'

import { forwardRef, memo } from 'react'

import {
  CodeBracketIcon,
  LinkIcon,
  NewspaperIcon
} from '@heroicons/react/16/solid'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import { Div, Heading, Li, Span, Ul } from '@react-components'

import { cn } from '@react-utils'

import {
  // CategoryForm,
  ContentLayout,
  type TContentLayoutProps,
  type TContentLayoutRef
} from '@portfolio/components'
import type { TSkillsData } from '@portfolio/types'

export type SkillsCategoryRef = TContentLayoutRef
export type SkillsCategoryProps = TContentLayoutProps & {
  data?: TSkillsData
}

/**
 * Renders the skills category component.
 * @param {SkillsCategoryRef} props - The component props
 * @param {SkillsCategoryRef} ref - The component reference
 * @returns The rendered skills category component
 */
const SkillsCategory = memo(
  forwardRef<SkillsCategoryRef, SkillsCategoryProps>(
    ({ data, children, ...rest }, ref) => {
      const { resolvedTheme } = useTheme()

      if (!data) return null

      return (
        <ContentLayout.Simple
          ref={ref}
          intro={data.hero?.description}
          title={data.hero?.heading}
          {...rest}
        >
          {children}
          {/* <CategoryForm /> */}
          <Div className={cn('mx-auto max-w-7xl')}>
            <Div
              className={cn(
                'grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl bg-white shadow-md sm:mx-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 dark:bg-transparent'
              )}
            >
              {data.skills?.map(({ id, name, type, image }) => {
                const imgAlt =
                  resolvedTheme === 'dark' && image.dark?.alt
                    ? image.dark.alt
                    : image.default.alt
                const imgSrc =
                  resolvedTheme === 'dark' && image.dark?.src
                    ? image.dark.src
                    : image.default.src

                return (
                  <Div
                    key={id}
                    className={cn(
                      'h-full w-full cursor-pointer px-4 py-8 ring-1 ring-gray-100 transition hover:bg-gray-50 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-black dark:hover:bg-zinc-800'
                    )}
                  >
                    <Image
                      src={imgSrc}
                      alt={imgAlt}
                      height={80}
                      width={80}
                      className={cn('mx-auto h-20 w-20')}
                      priority
                    />
                    <Heading
                      as="h3"
                      className={cn(
                        'mt-4 text-center text-base font-semibold leading-5 tracking-tighter text-zinc-600 dark:text-zinc-400'
                      )}
                    >
                      {name}
                    </Heading>
                    <Ul
                      className={cn('mt-3 flex justify-center gap-x-3')}
                      role="list"
                    >
                      <Li>
                        <Span
                          className={cn(
                            'flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400'
                          )}
                        >
                          <NewspaperIcon className="h-4 w-4" />
                        </Span>
                      </Li>
                      <Li>
                        <Span
                          className={cn(
                            'flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400'
                          )}
                        >
                          <CodeBracketIcon className="h-4 w-4" />
                        </Span>
                      </Li>
                      <Li>
                        <Span
                          className={cn(
                            'flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400'
                          )}
                        >
                          <LinkIcon className="h-4 w-4" />
                        </Span>
                      </Li>
                    </Ul>
                  </Div>
                )
              })}
            </Div>
          </Div>
        </ContentLayout.Simple>
      )
    }
  )
)

SkillsCategory.displayName = 'SkillsCategory'

export default SkillsCategory
