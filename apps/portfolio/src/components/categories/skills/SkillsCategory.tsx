/* eslint-disable @next/next/no-img-element */
'use client'

import { forwardRef } from 'react'

import {
  CodeBracketIcon,
  NewspaperIcon,
  UserIcon
} from '@heroicons/react/16/solid'
import { useTheme } from 'next-themes'

import {
  ContentLayout,
  type ContentLayoutProps,
  type ContentLayoutRef
} from '@guy-romelle-magayano/portfolio/components'
import { SkillsInfoData } from '@guy-romelle-magayano/portfolio/types'
import { isEmpty } from '@guy-romelle-magayano/react-utils'

export type SkillsCategoryRef = ContentLayoutRef
export type SkillsCategoryProps = ContentLayoutProps & {
  data?: SkillsInfoData
}

/**
 * Renders the skills category component.
 * @param {SkillsCategoryRef} props - The component props
 * @param {SkillsCategoryRef} ref - The component reference
 * @returns The rendered JSX component
 */
const SkillsCategory = forwardRef<SkillsCategoryRef, SkillsCategoryProps>(
  ({ data, children, ...rest }, ref) => {
    const { resolvedTheme } = useTheme()

    return (
      <>
        <ContentLayout.Simple
          ref={ref}
          title={data?.heading}
          intro={data?.description}
          className="mt-20 md:mt-24"
          {...rest}
        >
          {children}
          {!isEmpty(data?.skills) && (
            <div className="mx-auto max-w-7xl">
              <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-4 lg:grid-cols-5">
                {data?.skills?.map(skill => {
                  const imageAlt =
                    resolvedTheme === 'dark' &&
                    skill.image.dark &&
                    skill.image.dark?.alt?.length > 0 &&
                    skill.image.dark?.src !== '#'
                      ? skill.image.dark.alt
                      : skill.image.default.alt
                  const imageSrc =
                    resolvedTheme === 'dark' &&
                    skill.image.dark &&
                    skill.image.dark?.src?.length > 0 &&
                    skill.image.dark?.src !== '#'
                      ? skill.image.dark.src
                      : skill.image.default.src

                  return (
                    <div
                      key={skill.name}
                      className="h-full w-full cursor-pointer bg-neutral-200/45 px-4 py-8 ring-1 ring-neutral-950/10 transition hover:bg-neutral-200 dark:bg-white/5 dark:ring-neutral-950/5 dark:hover:bg-white/15"
                    >
                      <img
                        alt={imageAlt}
                        src={imageSrc}
                        className="mx-auto h-20 w-20"
                      />
                      <h3 className="mt-4 text-center text-base font-semibold leading-5 tracking-tighter text-zinc-600 dark:text-zinc-400">
                        {skill.name}
                      </h3>
                      <ul
                        role="list"
                        className="mt-3 flex justify-center gap-x-3"
                      >
                        <li>
                          <span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                            <NewspaperIcon className="h-4 w-4" />
                          </span>
                        </li>
                        <li>
                          <span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                            <CodeBracketIcon className="h-4 w-4" />
                          </span>
                        </li>
                        <li>
                          <span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                            <UserIcon className="h-4 w-4" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </ContentLayout.Simple>
      </>
    )
  }
)

SkillsCategory.displayName = 'SkillsCategory'

export default SkillsCategory
