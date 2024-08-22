'use client'

import { forwardRef } from 'react'

import {
  CodeBracketIcon,
  NewspaperIcon,
  UserIcon
} from '@heroicons/react/16/solid'
import { useTheme } from 'next-themes'
import Image from 'next/image'

import {
  Div,
  Heading,
  Li,
  Span,
  Ul
} from '@guy-romelle-magayano/react-components/server'
import { isValidData } from '@guy-romelle-magayano/react-utils'

import {
  // CategoryForm,
  ContentLayout,
  type ContentLayoutProps,
  type ContentLayoutRef
} from '@guy-romelle-magayano/portfolio/components'
import type { SkillsData } from '@guy-romelle-magayano/portfolio/types'

export type SkillsCategoryRef = ContentLayoutRef
export type SkillsCategoryProps = ContentLayoutProps & {
  data?: SkillsData
}

/**
 * Renders the skills category component.
 * @param {SkillsCategoryRef} props - The component props
 * @param {SkillsCategoryRef} ref - The component reference
 * @returns The rendered JSX component.
 */
const SkillsCategory = forwardRef<SkillsCategoryRef, SkillsCategoryProps>(
  ({ data, children, ...rest }, ref) => {
    const { resolvedTheme } = useTheme()

    const validData = isValidData(data, 'object') ? data : null

    if (!validData || Object.keys(validData)?.length === 0) {
      return null
    }

    return (
      <ContentLayout.Simple
        ref={ref}
        title={validData?.hero?.heading}
        intro={validData?.hero?.description}
        className="mt-20"
        {...rest}
      >
        {children}

        {/* <CategoryForm className="my-9" /> */}
        <Div className="mx-auto mt-20 max-w-7xl md:!mt-9">
          <Div className="grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:grid-cols-3 sm:rounded-2xl md:grid-cols-4 lg:grid-cols-5">
            {validData?.skills?.map(({ id, name, type, image }) => {
              const imgAlt =
                resolvedTheme === 'dark' &&
                image.dark?.alt &&
                image.dark?.alt?.length > 0
                  ? image.dark.alt
                  : image.default.alt
              const imgSrc =
                resolvedTheme === 'dark' &&
                image.dark?.src &&
                image.dark?.src?.length > 0
                  ? image.dark.src
                  : image.default.src

              return (
                <Div
                  key={id}
                  className="h-full w-full cursor-pointer bg-neutral-200/45 px-4 py-8 ring-1 ring-neutral-950/10 transition hover:bg-neutral-200 dark:bg-white/5 dark:ring-neutral-950/5 dark:hover:bg-white/15"
                >
                  <Image
                    width={80}
                    height={80}
                    alt={imgAlt}
                    src={imgSrc}
                    className="mx-auto h-20 w-20"
                    priority
                  />
                  <Heading
                    as="h3"
                    className="mt-4 text-center text-base font-semibold leading-5 tracking-tighter text-zinc-600 dark:text-zinc-400"
                  >
                    {name}
                  </Heading>
                  <Ul role="list" className="mt-3 flex justify-center gap-x-3">
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
                        <UserIcon className="h-4 w-4" />
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

SkillsCategory.displayName = 'SkillsCategory'

export default SkillsCategory
