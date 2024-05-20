'use client'

import { forwardRef, memo } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Button } from '@guy-romelle-magayano/react-components'
import {
  Div,
  Dl,
  Heading,
  Li,
  Ol,
  Span,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import {
  ArrowDownSvg,
  BriefcaseSvg
} from '@guy-romelle-magayano/portfolio/components'
import {
  type HomePageData,
  type WorkExperienceData
} from '@guy-romelle-magayano/portfolio/types'

export type ResumeLayoutRef = DivisionRef
export type ResumeLayoutProps = DivisionProps & {
  cvFile?: Pick<HomePageData, 'cvFile'>['cvFile']
  workExperiences?: Pick<HomePageData, 'workExperiences'>['workExperiences']
}

const strings = {
  work: 'Work',
  company: 'Company',
  role: 'Role',
  date: 'Date',
  downloadCV: 'Download CV'
}

/**
 * Renders the resume layout component.
 * @param {ResumeLayoutProps} props - The props of the resume layout.
 * @param {ResumeLayoutRef} ref - The reference of the resume layout.
 * @returns The rendered resume layout component.
 */
const ResumeLayout = memo(
  forwardRef<ResumeLayoutRef, ResumeLayoutProps>(
    ({ cvFile, workExperiences, ...rest }, ref) => {
      const router = useRouter()

      return (
        ((workExperiences && workExperiences?.length > 0) ||
          (cvFile && cvFile?.length > 0)) && (
          <Div {...rest} ref={ref}>
            <Heading
              as="h2"
              className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
            >
              <BriefcaseSvg className="h-6 w-6 flex-none" />
              <Span className="ml-3">{strings.work}</Span>
            </Heading>

            {workExperiences && workExperiences?.length > 0 && (
              <Ol className="mt-6 space-y-4">
                {workExperiences?.map(
                  (
                    {
                      company,
                      title,
                      logo,
                      alt,
                      start,
                      end
                    }: WorkExperienceData,
                    index: number
                  ) =>
                    company &&
                    company?.length > 0 &&
                    title &&
                    title?.length > 0 &&
                    start &&
                    start?.length > 0 &&
                    end &&
                    end?.length > 0 && (
                      <Li key={index} className="flex gap-4">
                        <Div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                          {logo ? (
                            <Image
                              src={logo}
                              alt={alt}
                              sizes="(min-width: 640px) 2.5rem, 1.5rem"
                              className="h-7 w-7 rounded-full"
                              fill
                              priority
                            />
                          ) : (
                            <BriefcaseSvg className="h-6 w-6 text-white" />
                          )}
                        </Div>

                        <Dl className="flex flex-auto flex-wrap gap-x-2">
                          <dt className="sr-only">{strings.company}</dt>
                          <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {company}
                          </dd>

                          <dt className="sr-only">{strings.role}</dt>
                          <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                            {title}
                          </dd>

                          <dt className="sr-only">{strings.date}</dt>
                          <dd
                            className="block w-full text-xs text-zinc-400 dark:text-zinc-500"
                            aria-label={`${start} until ${end}`}
                          >
                            <time dateTime={start}>{start}</time>{' '}
                            <span aria-hidden="true">—</span>{' '}
                            <time dateTime={end}>{end}</time>
                          </dd>
                        </Dl>
                      </Li>
                    )
                )}
              </Ol>
            )}

            {cvFile && cvFile?.length > 0 && (
              <Button
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70"
                onClick={() => router.push(cvFile)}
              >
                {strings.downloadCV}
                <ArrowDownSvg className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
              </Button>
            )}
          </Div>
        )
      )
    }
  )
)

ResumeLayout.displayName = 'ResumeLayout'

export default ResumeLayout
