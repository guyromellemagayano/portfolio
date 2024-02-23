'use client'

import { FC, useId } from 'react'

import { useRouter } from 'next/navigation'

import Button from '@guy-romelle-magayano/portfolio/components/Button'
import ArrowDownSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/ArrowDown'
import BriefcaseSvgImage from '@guy-romelle-magayano/portfolio/components/images/svg/Briefcase'
import ImageLayout from '@guy-romelle-magayano/portfolio/components/layouts/Image'

import type { THomeData } from '@guy-romelle-magayano/portfolio/data/home'
import type { TWorkExperiences } from '@guy-romelle-magayano/portfolio/data/work'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

import { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TResumeLayoutProps = TCommonComponentProps & THomeData

/**
 * Renders the resume layout component.
 * @param workExperiences - The work experiences data.
 * @param cvFile - The CV file.
 * @param id - The additional ID for the component.
 * @param rest - The rest of the props.
 * @returns The rendered resume layout component.
 */
const ResumeLayout: FC<TResumeLayoutProps> = ({
  workExperiences,
  cvFile,
  id,
  ...rest
}) => {
  const router = useRouter(),
    customId = useId()

  return (
    isArrayType(workExperiences) &&
    !isEmpty(workExperiences) && (
      <div id={id || customId} {...rest}>
        <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          <BriefcaseSvgImage className="h-6 w-6 flex-none" />
          <span className="ml-3">Work</span>
        </h2>

        <ol className="mt-6 space-y-4">
          {workExperiences.map(
            (
              { company, title, logo, start, end }: TWorkExperiences,
              index: number
            ) => (
              <li key={index} className="flex gap-4">
                <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 rounded-full">
                  {!isEmpty(logo) ? (
                    <ImageLayout
                      src={logo}
                      alt=""
                      className="h-7 w-7 rounded-full"
                      unoptimized
                      priority
                    />
                  ) : (
                    <BriefcaseSvgImage className="h-6 w-6 text-white" />
                  )}
                </div>
                <dl className="flex flex-auto flex-wrap gap-x-2">
                  {isStringType(company) && !isEmpty(company) && (
                    <>
                      <dt className="sr-only">Company</dt>
                      <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                        {company}
                      </dd>
                    </>
                  )}

                  {isStringType(title) && !isEmpty(title) && (
                    <>
                      <dt className="sr-only">Role</dt>
                      <dd className="text-xs text-zinc-500 dark:text-zinc-400">
                        {title}
                      </dd>
                    </>
                  )}

                  {isStringType(start) &&
                    !isEmpty(start) &&
                    isStringType(end) &&
                    !isEmpty(end) && (
                      <>
                        <dt className="sr-only">Date</dt>
                        <dd
                          className="block w-full text-xs text-zinc-400 dark:text-zinc-500"
                          aria-label={`${start} until ${end}`}
                        >
                          <time dateTime={start}>{start}</time>{' '}
                          <span aria-hidden="true">—</span>{' '}
                          <time dateTime={end}>{end}</time>
                        </dd>
                      </>
                    )}
                </dl>
              </li>
            )
          )}
        </ol>

        {isStringType(cvFile) && !isEmpty(cvFile) && (
          <Button
            onClick={() => router.push(cvFile || '#')}
            variant="secondary"
            className="group mt-6 w-full"
          >
            Download CV
            <ArrowDownSvgImage className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
          </Button>
        )}
      </div>
    )
  )
}

export default ResumeLayout
