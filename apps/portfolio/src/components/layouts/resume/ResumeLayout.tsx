'use client'

import { forwardRef, memo } from 'react'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
  Button,
  ButtonProps,
  ButtonRef,
  Dd,
  Div,
  Dl,
  Dt,
  Li,
  Span,
  Time,
  Ul,
  UnorderedListProps,
  UnorderedListRef
} from '@react-components'

import { cn } from '@react-utils'

import {
  BriefcaseSvg,
  ContentLayout,
  ContentLayoutProps,
  ContentLayoutRef
} from '@portfolio/components'
import type { WorkData, WorkExperiencesData } from '@portfolio/types'

const strings = {
  work: 'Work',
  company: 'Company',
  role: 'Role',
  date: 'Date',
  downloadCV: 'Download CV'
}

type WorkExperiencesRef = UnorderedListRef
type WorkExperiencesProps = UnorderedListProps & {
  data?: WorkExperiencesData[]
}

/**
 * Render the work experiences component.
 * @param {WorkExperiencesProps} props - The component props
 * @param {WorkExperiencesRef} ref - The component reference
 * @returns The rendered work experiences component
 */
const WorkExperiences = memo(
  forwardRef<WorkExperiencesRef, WorkExperiencesProps>(
    ({ data, className, ...rest }, ref) => {
      if (!data) return null

      return (
        <Ul
          ref={ref}
          className={cn(
            'divide-y divide-gray-100 overflow-hidden rounded-2xl bg-white shadow-md dark:divide-transparent dark:bg-transparent',
            className
          )}
          role="list"
          {...rest}
        >
          {data.map(
            ({
              id,
              company,
              title,
              src,
              alt,
              start,
              end,
              country,
              contributions,
              skills
            }) => {
              return (
                <Li
                  className="relative flex cursor-pointer justify-between gap-x-6 px-4 py-5 ring-1 ring-gray-100 transition hover:bg-gray-50 sm:px-6 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-black dark:hover:bg-zinc-800"
                  key={id}
                >
                  <Div className="flex min-w-0 gap-x-4">
                    <Span className="flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-full bg-gray-100">
                      {src ? (
                        <Image
                          priority
                          alt={alt}
                          className="h-full w-full"
                          height={48}
                          sizes="(min-width: 640px) 2.5rem, 1.5rem"
                          src={src}
                          width={48}
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
                        aria-label={`
                      ${start} until ${end}
                    `}
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
      )
    }
  )
)

type CvFileRef = ButtonRef
type CvFileProps = ButtonProps & {
  data?: WorkData['cvFile']
}

/**
 * Render the cv file component.
 * @param {CvFileProps} props - The component props
 * @param {CvFileRef} ref - The component reference
 * @returns The rendered cv file component
 */
const CvFile = memo(
  forwardRef<CvFileRef, CvFileProps>(({ data, className, ...rest }, ref) => {
    const router = useRouter()

    if (!data) return null

    return (
      <Button
        ref={ref}
        className={cn(
          'text-md text-md text-md group mt-9 inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full border-2 border-zinc-800 bg-transparent bg-zinc-900 px-8 py-4 font-semibold text-zinc-50 outline-offset-2 transition hover:border-transparent hover:bg-zinc-600 active:bg-transparent active:bg-zinc-600 dark:border-white dark:bg-white dark:text-black dark:hover:border-transparent dark:hover:bg-zinc-300 dark:active:bg-zinc-300',
          className
        )}
        onClick={() => router.push(data)}
        {...rest}
      >
        {strings.downloadCV}
      </Button>
    )
  })
)

export type ResumeLayoutRef = ContentLayoutRef
export type ResumeLayoutProps = ContentLayoutProps & {
  cvFile?: WorkData['cvFile']
  workExperiences?: WorkData['workExperiences']
}

/**
 * Renders the resume layout component.
 * @param {ResumeLayoutProps} props - The component props
 * @param {ResumeLayoutRef} ref - The component reference
 * @returns The rendered resume layout component
 */
const ResumeLayout = memo(
  forwardRef<ResumeLayoutRef, ResumeLayoutProps>(
    ({ title, intro, cvFile, workExperiences, ...rest }, ref) => {
      return (
        <ContentLayout.Simple ref={ref} intro={intro} title={title} {...rest}>
          <WorkExperiences data={workExperiences} />
          <CvFile data={cvFile} />
        </ContentLayout.Simple>
      )
    }
  )
)

ResumeLayout.displayName = 'ResumeLayout'

export default ResumeLayout
