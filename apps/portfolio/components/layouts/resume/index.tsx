'use client'

import { Suspense } from 'react'

import { Skeleton } from '@/components'

import { useLazyLoading } from '@/hooks'

import { TResumeProps } from '@/types/components'

/**
 * Render the resume component.
 * @param data - The resume data.
 * @returns {JSX.Element} The rendered component.
 */
const Resume = ({ data }: TResumeProps): JSX.Element => {
  const ResumeLayoutContent = useLazyLoading({
    importFunction: () => import('./Content')
  })

  return (
    <Suspense fallback={<Skeleton.ResumeLayout />}>
      <ResumeLayoutContent data={data} />
    </Suspense>
  )
}

export default Resume
