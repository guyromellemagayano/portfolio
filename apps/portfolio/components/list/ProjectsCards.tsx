'use client'

import { ReactNode } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import Card from '@/components/Card'
import LinkSvgImage from '@/components/images/svg/Link'
import ImageLayout from '@/components/layouts/Image'

import type { TWithChildren } from '@/types/common'

export type TProjectsCardsListProps<T = object> = T &
  TWithChildren<T> & {
    name: string | null
    link: {
      url: string | null
      text: string | null
    }
    logo: StaticImport | string | null
    description: string | null
  }

/**
 * Renders the projects cards list component.
 * @param props - The props object.
 * @returns The rendered projects cards list component.
 */
const ProjectsCardsList = (props: TProjectsCardsListProps): ReactNode => {
  return (
    <Card as="li" key={props.name}>
      <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <span className="h-8 w-8 overflow-hidden rounded-full">
          <ImageLayout
            src={props.logo}
            alt=""
            className="h-full w-full"
            unoptimized
            priority
          />
        </span>
      </div>

      <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
        <Card.Link href={props?.link?.url || '#'} target="_blank">
          {props?.name || ''}
        </Card.Link>
      </h2>
      <Card.Description>{props?.description || ''}</Card.Description>
      <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
        <LinkSvgImage className="h-6 w-6 flex-none" />
        <span className="ml-2">{props?.link?.text || ''}</span>
      </p>
    </Card>
  )
}

export default ProjectsCardsList
