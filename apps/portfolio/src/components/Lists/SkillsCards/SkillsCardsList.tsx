import { forwardRef } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import {
  CardProps,
  CardRef
} from '@guy-romelle-magayano/portfolio/components/Card'
import { SkillsItemData } from '@guy-romelle-magayano/portfolio/types'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const Li = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Li)
)
const Span = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Span)
)
const Card = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card
  )
)
const CardCta = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Cta
  )
)
const CardDescription = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Description
  )
)
const CardEyebrow = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Eyebrow
  )
)
const CardTitle = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Title
  )
)

export type SkillsCardsListRef = CardRef
export type SkillsCardsListProps = CardProps &
  Pick<SkillsItemData, 'title' | 'description' | 'technologies'> & {
    cta?: Array<SkillsCardsListCtaData>
  }
export type SkillsCardsListCtaData = {
  projects: string[]
  text: string
}

const strings = {
  technologies: 'Technologies',
  projects: 'See projects'
}

/**
 * Renders the skills cards list component.
 * @param title - The title of the skill.
 * @param description - The description of the skill.
 * @param technologies - The technologies used in the skill.
 * @param cta - The call to action for the skill.
 * @param rest - The rest of the props.
 * @returns The rendered skills cards list component.
 */
const SkillsCardsList = forwardRef<SkillsCardsListRef, SkillsCardsListProps>(
  ({ title, description, technologies, cta, ...rest }, ref) => {
    return (
      <Card ref={ref} {...rest} as="article">
        {title && (
          <CardTitle as="h3" title={title}>
            {title}
          </CardTitle>
        )}

        {description &&
          description?.map((text, index) => (
            <CardDescription key={index}>{text}</CardDescription>
          ))}

        {technologies && (
          <Div className="my-2 flex flex-row items-start gap-x-6">
            <CardEyebrow
              as="h4"
              className="text-base text-rose-400 dark:text-rose-500"
            >
              {strings.technologies}
            </CardEyebrow>

            <CardEyebrow
              as="ul"
              className="flex-wrap gap-x-4 text-zinc-400 dark:text-zinc-500"
            >
              {technologies?.map(
                ({ name, link }, index) =>
                  link &&
                  name && (
                    <Li key={index}>
                      <Link
                        href={link}
                        className="transition hover:text-amber-500 dark:hover:text-amber-400"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {name}
                      </Link>
                    </Li>
                  )
              )}
            </CardEyebrow>
          </Div>
        )}

        {cta && (
          <Span className="flex items-start gap-x-4">
            {cta?.map(({ projects, text }, index: number) => {
              projects && (text = strings.projects)

              return (
                projects && (
                  <CardCta key={index} title={text}>
                    {text}
                  </CardCta>
                )
              )
            })}
          </Span>
        )}
      </Card>
    )
  }
)

SkillsCardsList.displayName = 'SkillsCardsList'

export default SkillsCardsList
