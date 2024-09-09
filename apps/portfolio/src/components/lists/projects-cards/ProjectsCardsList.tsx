import { forwardRef, memo } from 'react'

import Image from 'next/image'

import { Div, Heading, P, Span } from '@react-components'

import {
  Card,
  LinkSvg,
  type CardProps,
  type CardRef
} from '@portfolio/components'
import { CommonPhotosData, type ProjectsData } from '@portfolio/types'
import { cn } from '@react-utils'

export type ProjectsCardsListRef = CardRef
export type ProjectsCardsListProps = CardProps &
  Pick<
    ProjectsData,
    'slug' | 'title' | 'description' | 'link' | 'category' | 'logo'
  > &
  Pick<CommonPhotosData, 'alt'>

const imageDimensions = {
  width: 32,
  height: 32
}

/**
 * Renders the projects cards list component.
 * @param {ProjectsCardsListProps} props - The component props
 * @param {ProjectsCardsListRef} ref - The component reference
 * @returns The rendered projects cards list component
 */
const ProjectsCardsList = memo(
  forwardRef<ProjectsCardsListRef, ProjectsCardsListProps>(
    ({ slug, title, link, logo, alt = '', description, ...rest }, ref) => {
      // const href = `/projects/${slug}`

      if (!title && !link && !description) return null

      return (
        <Card ref={ref} {...rest} as="li">
          {logo && (
            <Div
              className={cn(
                'relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0'
              )}
            >
              <Span className={cn('h-8 w-8 overflow-hidden rounded-full')}>
                <Image
                  src={logo}
                  alt={alt}
                  width={imageDimensions.width}
                  height={imageDimensions.height}
                  priority
                  unoptimized
                />
              </Span>
            </Div>
          )}

          {link.url && title && (
            <Heading
              as="h2"
              className={cn(
                'mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100'
              )}
            >
              <Card.Link href={link.url} target="_blank">
                {title}
              </Card.Link>
            </Heading>
          )}

          {description && description?.length > 0 && (
            <Card.Description>{description}</Card.Description>
          )}

          {link?.text && link?.text?.length > 0 && (
            <P className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
              <LinkSvg className="h-6 w-6 flex-none" />
              <Span className="ml-2">{link.text}</Span>
            </P>
          )}
        </Card>
      )
    }
  )
)

ProjectsCardsList.displayName = 'ProjectsCardsList'

export default ProjectsCardsList
