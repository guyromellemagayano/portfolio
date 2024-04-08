import { forwardRef } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'

import {
  CardProps,
  CardRef
} from '@guy-romelle-magayano/portfolio/components/Card'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const Span = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Span)
)
const Heading = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Heading
  )
)
const P = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.P)
)
const Card = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card
  )
)
const CardLink = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Link
  )
)
const CardDescription = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Description
  )
)
const LinkSvg = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/SVG').then(
    mod => mod.LinkSvg
  )
)

export type ProjectsCardsListRef = CardRef
export type ProjectsCardsListProps = CardProps & {
  name: string
  link: ProjectsCardsListLink
  logo: string
  alt?: string
  description: string
}
export type ProjectsCardsListLink = {
  url: string
  text: string
}

/**
 * Renders the projects cards list component.
 * @param name - The name of the project.
 * @param link - The link to the project.
 * @param logo - The logo of the project.
 * @param [alt=""] - The alternative text for the logo.
 * @param description - The description of the project.
 * @param rest - The rest of the props.
 * @returns The rendered projects cards list component.
 */
const ProjectsCardsList = forwardRef<
  ProjectsCardsListRef,
  ProjectsCardsListProps
>(({ name, link, logo, alt = '', description, ...rest }, ref) => {
  return (
    <Card ref={ref} {...rest} as="li">
      {logo && (
        <Div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Span className="h-8 w-8 overflow-hidden rounded-full">
            <Image
              src={logo}
              alt={alt}
              className="h-full w-full"
              unoptimized
              priority
            />
          </Span>
        </Div>
      )}

      {link?.url && name && (
        <Heading
          as="h2"
          className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100"
        >
          <CardLink href={link.url} target="_blank">
            {name}
          </CardLink>
        </Heading>
      )}

      {description && <CardDescription>{description}</CardDescription>}

      {link?.text && (
        <P className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
          <LinkSvg className="h-6 w-6 flex-none" />
          <Span className="ml-2">{link.text}</Span>
        </P>
      )}
    </Card>
  )
})

ProjectsCardsList.displayName = 'ProjectsCardsList'

export default ProjectsCardsList
