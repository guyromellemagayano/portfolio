'use client'

import { forwardRef, memo } from 'react'

import {
  CodeBracketIcon,
  LinkIcon,
  NewspaperIcon
} from '@heroicons/react/16/solid'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { Div, Heading, Li, Span, Ul } from '@react-components'

import { cn } from '@react-utils'

import type {
  TContentLayoutProps,
  TContentLayoutRef
} from '@portfolio/components'
import { commonData } from '@portfolio/data'
import type { HomePageAppDataQuery } from '@portfolio/graphql'

// Dynamic imports
const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)
const CategoryForm = dynamic(() =>
  import('@portfolio/components').then(mod => mod.CategoryForm)
)

export type SkillsCategoryRef = TContentLayoutRef
export type SkillsCategoryProps = TContentLayoutProps &
  Pick<HomePageAppDataQuery, 'common' | 'skills'> &
  Pick<HomePageAppDataQuery['homePage']['sections'][3], 'cta'> & {
    withSearchFilter?: boolean
    hasFeatured?: boolean
  }

/**
 * Renders the skills category component.
 * @param {SkillsCategoryProps} props - The component props
 * @param {SkillsCategoryRef} ref - The component reference
 * @returns The rendered skills category component
 */
const SkillsCategory = memo(
  forwardRef<SkillsCategoryRef, SkillsCategoryProps>(
    (
      {
        skills,
        withSearchFilter = false,
        hasFeatured = false,
        title,
        description,
        common,
        children,
        cta,
        ...rest
      },
      ref
    ) => {
      const { resolvedTheme } = useTheme()

      if (!skills) return null

      const getImageData = (
        image: HomePageAppDataQuery['skills'][0]['image'],
        resolvedTheme: string | undefined
      ) => {
        const imgAlt =
          resolvedTheme === 'dark' && image.dark?.alt
            ? image.dark.alt
            : image.default.alt
        const imgSrc =
          resolvedTheme === 'dark' && image.dark?.src
            ? image.dark.src
            : image.default.src

        return { imgAlt, imgSrc }
      }

      const renderItem = (
        { id, name, image }: HomePageAppDataQuery['skills'][0],
        resolvedTheme: string | undefined
      ) => {
        const { imgAlt, imgSrc } = getImageData(image, resolvedTheme)
        const imageDimensions = {
          width: 80,
          height: 80
        }

        return (
          <Div
            key={id}
            className="h-full w-full cursor-pointer px-4 py-8 ring-1 ring-gray-100 transition hover:bg-gray-50 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-black dark:hover:bg-zinc-800"
          >
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={imageDimensions.width}
              height={imageDimensions.height}
              className="mx-auto h-20 w-20"
            />
            <Heading
              as="h3"
              className="mt-4 text-center text-base font-semibold leading-5 tracking-tighter text-zinc-600 dark:text-zinc-400"
            >
              {name}
            </Heading>
            <Ul className="mt-3 flex justify-center gap-x-3" role="list">
              <Li>
                <Span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                  <NewspaperIcon className="h-4 w-4" />
                </Span>
              </Li>
              <Li>
                <Span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                  <CodeBracketIcon className="h-4 w-4" />
                </Span>
              </Li>
              <Li>
                <Span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                  <LinkIcon className="h-4 w-4" />
                </Span>
              </Li>
            </Ul>
          </Div>
        )
      }

      const filteredData = hasFeatured
        ? skills.filter(({ isFeatured }) => isFeatured)
        : skills

      const featuredData = filteredData.map(item =>
        renderItem(item, resolvedTheme)
      )

      return (
        <ContentSimpleLayout
          ref={ref}
          heading={title}
          description={description}
          {...rest}
        >
          {withSearchFilter && <CategoryForm />}

          <Div className="mx-auto max-w-7xl">
            <Div className="grid grid-cols-2 gap-0.5 overflow-hidden rounded-2xl bg-white shadow-md sm:mx-0 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 dark:bg-transparent">
              {featuredData}
            </Div>
          </Div>

          {cta && (
            <Div className="mt-10 flex flex-row flex-wrap gap-3">
              {cta?.map(({ id, slug, link, buttonType }) => {
                const label =
                  slug === 'skills'
                    ? common.checkSkills || commonData.checkSkills
                    : ''

                return (
                  <Link
                    key={id}
                    href={link || '#'}
                    className={cn(
                      `text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold outline-offset-2 transition active:transition-none`,
                      buttonType === 'primary' &&
                        'bg-zinc-800 text-zinc-50 hover:bg-zinc-600 active:bg-zinc-600 dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300'
                    )}
                  >
                    {label}
                  </Link>
                )
              })}
            </Div>
          )}

          {children}
        </ContentSimpleLayout>
      )
    }
  )
)

SkillsCategory.displayName = 'SkillsCategory'

export default SkillsCategory
