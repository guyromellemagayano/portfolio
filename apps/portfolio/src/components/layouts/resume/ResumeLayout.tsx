'use client'

import { forwardRef, memo } from 'react'

import { useRouter } from 'next/navigation'

import {
  Button,
  ButtonProps,
  ButtonRef
} from '@guy-romelle-magayano/react-components'
import {
  Div,
  DivisionProps,
  DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, isValidData } from '@guy-romelle-magayano/react-utils'

import {
  ArrowDownSvg,
  ContentLayout,
  ContentLayoutProps,
  ContentLayoutRef,
  WorkCardsList,
  WorkList
} from '@guy-romelle-magayano/portfolio/components'
import type {
  WorkData,
  WorkExperiencesData
} from '@guy-romelle-magayano/portfolio/types'

const strings = {
  work: 'Work',
  company: 'Company',
  role: 'Role',
  date: 'Date',
  downloadCV: 'Download CV'
}

type WorkExperiencesRef = DivisionRef
type WorkExperiencesProps = DivisionProps & {
  data?: WorkExperiencesData[]
}

/**
 * Render the work experiences component.
 * @param {WorkExperiencesProps} props - The component props
 * @param {WorkExperiencesRef} ref - The component reference
 * @returns The rendered JSX component.
 */
const WorkExperiences = forwardRef<WorkExperiencesRef, WorkExperiencesProps>(
  ({ data, className, ...rest }, ref) => {
    const validData =
      data?.filter((item): item is WorkExperiencesData =>
        isValidData(item, 'object')
      ) || null

    if (!validData || validData?.length === 0) {
      return null
    }

    return (
      <Div ref={ref} className={cn('grid gap-y-12', className)} {...rest}>
        {validData.map(({ id, ...rest }) => {
          return (
            <WorkList key={id}>
              <WorkCardsList {...rest} />
            </WorkList>
          )
        })}
      </Div>
    )
  }
)

WorkExperiences.displayName = 'WorkExperiences'

type CvFileRef = ButtonRef
type CvFileProps = ButtonProps & {
  data?: WorkData['cvFile']
}

/**
 * Render the cv file component.
 * @param {CvFileProps} props - The component props
 * @param {CvFileRef} ref - The component reference
 * @returns The rendered JSX component.
 */
const CvFile = forwardRef<CvFileRef, CvFileProps>(
  ({ data, className, ...rest }, ref) => {
    const router = useRouter()
    const validData = isValidData(data, 'string') ? data : null

    if (!validData || validData?.length === 0) {
      return null
    }

    return (
      <Button
        ref={ref}
        className={cn(
          'group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 outline-offset-2 transition hover:bg-zinc-100 active:bg-zinc-100 active:text-zinc-900/60 active:transition-none dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:active:bg-zinc-800/50 dark:active:text-zinc-50/70',
          className
        )}
        onClick={() => router.push(validData!)}
        {...rest}
      >
        {strings.downloadCV}
        <ArrowDownSvg className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" />
      </Button>
    )
  }
)

CvFile.displayName = 'CvFile'

export type ResumeLayoutRef = ContentLayoutRef
export type ResumeLayoutProps = ContentLayoutProps & {
  cvFile?: WorkData['cvFile']
  workExperiences?: WorkData['workExperiences']
}

/**
 * Renders the resume layout component.
 * @param {ResumeLayoutProps} props - The component props
 * @param {ResumeLayoutRef} ref - The component reference
 * @returns The rendered JSX component.
 */
const ResumeLayout = memo(
  forwardRef<ResumeLayoutRef, ResumeLayoutProps>(
    ({ title, intro, cvFile, workExperiences, ...rest }, ref) => {
      return (
        <ContentLayout.Simple ref={ref} title={title} intro={intro} {...rest}>
          <WorkExperiences data={workExperiences} />
          <CvFile data={cvFile} />
        </ContentLayout.Simple>
      )
    }
  )
)

ResumeLayout.displayName = 'ResumeLayout'

export default ResumeLayout
