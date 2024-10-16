'use client'

import { forwardRef, memo } from 'react'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
  Button,
  Dd,
  Div,
  Dl,
  Dt,
  Li,
  Span,
  Time,
  Ul,
  type TButtonProps,
  type TButtonRef,
  type TCommonComponentExtensionProps,
  type TUnorderedListProps,
  type TUnorderedListRef
} from '@react-components'

import { cn } from '@react-utils'

import type {
  TContentLayoutProps,
  TContentLayoutRef
} from '@portfolio/components'
import { commonData } from '@portfolio/data'
import type { HomePageAppDataQuery } from '@portfolio/graphql'
import type { TCommonProps } from '@portfolio/types'

// Dynamic imports
const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)
const BriefcaseSvg = dynamic(() =>
  import('@portfolio/components').then(mod => mod.BriefcaseSvg)
)

export type TWorkExperiencesRef = TUnorderedListRef
export type TWorkExperiencesProps = TUnorderedListProps & {
  data?: HomePageAppDataQuery['work']['experiences']
}

/**
 * Render the work experiences component.
 * @param {TWorkExperiencesProps} props - The component props
 * @param {TWorkExperiencesRef} ref - The component reference
 * @returns The rendered work experiences component
 */
const WorkExperiences = memo(
  forwardRef<TWorkExperiencesRef, TWorkExperiencesProps>(
    ({ data, className, children, ...rest }, ref) => {
      if (!data) return null

      return (
        <>
          <Ul
            ref={ref}
            role="list"
            className={cn(
              'divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-md dark:divide-transparent dark:bg-transparent',
              className
            )}
            {...rest}
          >
            {data?.map(
              ({ id, company, title, src, alt, start, end, country }) => {
                return (
                  <Li
                    key={id}
                    className="relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 ring-1 ring-gray-100 transition hover:bg-gray-50 sm:px-6 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-black dark:hover:bg-zinc-800"
                  >
                    <Div className="flex min-w-0 gap-x-4">
                      <Span className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-gray-100">
                        {src ? (
                          <Image
                            src={src}
                            alt={alt!}
                            width={48}
                            height={48}
                            sizes="(min-width: 640px) 2.5rem, 1.5rem"
                            className="h-full w-full"
                          />
                        ) : (
                          <BriefcaseSvg className="h-7 w-7 text-gray-700" />
                        )}
                      </Span>

                      <Dl className="min-w-0 flex-auto">
                        <Dt className="sr-only">{company}</Dt>
                        <Dd className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100">
                          <Span className="absolute inset-x-0 -top-px bottom-0" />
                          {company}
                        </Dd>
                        <Dt className="sr-only">{country}</Dt>
                        <Dd className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                          {country}
                        </Dd>
                      </Dl>
                    </Div>
                    <Div className="flex shrink-0 items-center gap-x-4">
                      <Dl className="hidden sm:flex sm:flex-col sm:items-end">
                        <Dt className="sr-only">{title}</Dt>
                        <Dd className="text-sm leading-6 text-gray-900 dark:text-gray-100">
                          {title}
                        </Dd>
                        <Dt className="sr-only">{start + ' - ' + end}</Dt>
                        <Dd
                          aria-label={`${start} until ${end}`}
                          className="mt-1 flex text-xs leading-5 text-gray-500 dark:text-gray-400"
                        >
                          <Span className="relative truncate">
                            <Time dateTime={start}>{start}</Time>
                            <Span aria-hidden="true"> — </Span>
                            <Time dateTime={end}>{end}</Time>
                          </Span>
                        </Dd>
                      </Dl>
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-gray-400"
                      />
                    </Div>
                  </Li>
                )
              }
            )}
          </Ul>

          {children}
        </>
      )
    }
  )
)

export type TCvFileRef = TButtonRef
export type TCvFileProps = TButtonProps &
  Pick<HomePageAppDataQuery['homePage']['sections'][0], 'cta'> &
  Pick<HomePageAppDataQuery['work'], 'cvFile'> &
  TCommonProps

/**
 * Render the cv file component.
 * @param {TCvFileProps} props - The component props
 * @param {TCvFileRef} ref - The component reference
 * @returns The rendered cv file component
 */
const CvFile = memo(
  forwardRef<TCvFileRef, TCvFileProps>(
    ({ cvFile, common, cta, className, ...rest }, ref) => {
      const router = useRouter()

      if (!cvFile && !cta) return null

      return (
        cta &&
        cvFile &&
        cta.map(({ id, slug, buttonType }) => {
          const label =
            slug === 'download-cv'
              ? common.downloadCv || commonData.downloadCv
              : ''

          return (
            <Button
              key={id}
              ref={ref}
              className={cn(
                buttonType === 'primary' &&
                  'text-md text-md text-md group mt-9 inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full border-2 border-zinc-800 bg-transparent bg-zinc-900 px-8 py-4 font-semibold text-zinc-50 outline-offset-2 transition hover:border-transparent hover:bg-zinc-600 active:bg-transparent active:bg-zinc-600 dark:border-white dark:bg-white dark:text-black dark:hover:border-transparent dark:hover:bg-zinc-300 dark:active:bg-zinc-300',
                className
              )}
              onClick={() => router.push(cvFile)}
              {...rest}
            >
              {label}
            </Button>
          )
        })
      )
    }
  )
)

export type TResumeLayoutRef = TContentLayoutRef
export type TResumeLayoutProps = TContentLayoutProps &
  HomePageAppDataQuery['work'] & {
    cta?: HomePageAppDataQuery['homePage']['sections'][0]['cta']
    common: TCommonComponentExtensionProps
  }

/**
 * Renders the resume layout component.
 * @param {TResumeLayoutProps} props - The component props
 * @param {TResumeLayoutRef} ref - The component reference
 * @returns The rendered resume layout component
 */
const ResumeLayout = memo(
  forwardRef<TResumeLayoutRef, TResumeLayoutProps>(
    (
      {
        heading,
        description,
        cvFile,
        experiences,
        cta,
        common,
        children,
        ...rest
      },
      ref
    ) => {
      return (
        <ContentSimpleLayout
          ref={ref}
          description={description}
          heading={heading}
          {...rest}
        >
          <WorkExperiences data={experiences} />
          <CvFile cvFile={cvFile} cta={cta} common={common} />
          {children}
        </ContentSimpleLayout>
      )
    }
  )
)

ResumeLayout.displayName = 'ResumeLayout'

export default ResumeLayout
