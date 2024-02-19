'use client'

import { FC } from 'react'

import { StaticImport } from 'next/dist/shared/lib/get-img-props'

import Card from '@/components/Card'
import LinkSvgImage from '@/components/images/svg/Link'
import ImageLayout from '@/components/layouts/Image'

import { isEmpty, isStringType } from '@/utils/checkTypes'

import type { TCommonComponentProps } from '@/types/common'

export type TProjectsCardsListLink = {
  url: string
  text: string
}

export type TProjectsCardsListProps = TCommonComponentProps & {
  name: string
  link: TProjectsCardsListLink
  logo?: StaticImport | string | undefined
  alt?: string
  description: string
}

/**
 * Renders the projects cards list component.
 * @param [name=""] - The name of the project.
 * @param link - The link to the project.
 * @param [logo="#"] - The logo of the project.
 * @param [alt=""] - The alternative text for the logo.
 * @param description - The description of the project.
 * @param rest - The rest of the props.
 * @returns The rendered projects cards list component.
 */
const ProjectsCardsList: FC<TProjectsCardsListProps> = ({
  name = '',
  link,
  logo = '#',
  alt = '',
  description,
  ...rest
}) => {
  return (
    <Card as="li" {...rest}>
      {isStringType(logo) && !isEmpty(logo) && (
        <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <span className="h-8 w-8 overflow-hidden rounded-full">
            <ImageLayout
              src={logo}
              alt={alt}
              className="h-full w-full"
              unoptimized
              priority
            />
          </span>
        </div>
      )}

      {isStringType(link.url) &&
        !isEmpty(link.url) &&
        isStringType(name) &&
        !isEmpty(name) && (
          <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <Card.Link href={link.url} target="_blank">
              {name}
            </Card.Link>
          </h2>
        )}

      {isStringType(description) && !isEmpty(description) && (
        <Card.Description>{description}</Card.Description>
      )}

      {isStringType(link.text) && !isEmpty(link.text) && (
        <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
          <LinkSvgImage className="h-6 w-6 flex-none" />
          <span className="ml-2">{link.text}</span>
        </p>
      )}
    </Card>
  )
}

export default ProjectsCardsList
