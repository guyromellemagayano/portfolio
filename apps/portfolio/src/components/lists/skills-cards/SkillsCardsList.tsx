import { forwardRef, memo } from 'react'

import Link from 'next/link'

import { Div, Li, Span } from '@guy-romelle-magayano/react-components/server'

import { isStringType } from '@guy-romelle-magayano/react-utils'

import {
  Card,
  type CardProps,
  type CardRef
} from '@guy-romelle-magayano/portfolio/components'
import { type SkillsItemData } from '@guy-romelle-magayano/portfolio/types'

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
 * @param {SkillsCardsListProps} props - The properties to render the skills cards list component.
 * @param {SkillsCardsListRef} ref - The reference of the skills cards list component.
 * @returns The rendered skills cards list component.
 */
const SkillsCardsList = memo(
  forwardRef<SkillsCardsListRef, SkillsCardsListProps>(
    ({ title, description, technologies, cta, ...rest }, ref) => {
      return (
        <Card ref={ref} {...rest} as="article">
          {title && title?.length > 0 && (
            <Card.Title as="h3" title={title}>
              {title}
            </Card.Title>
          )}

          {description &&
            description?.length > 0 &&
            description.map(
              (text, index) =>
                text &&
                isStringType(text) && (
                  <Card.Description key={index}>{text}</Card.Description>
                )
            )}

          {technologies && technologies?.length > 0 && (
            <Div className="my-2 flex flex-row items-start gap-x-6">
              <Card.Eyebrow
                as="h4"
                className="text-base text-rose-400 dark:text-rose-500"
              >
                {strings.technologies}
              </Card.Eyebrow>

              <Card.Eyebrow
                as="ul"
                className="flex-wrap gap-x-4 text-zinc-400 dark:text-zinc-500"
              >
                {technologies.map(
                  ({ name, link }, index) =>
                    link &&
                    link?.length > 0 &&
                    name &&
                    name?.length > 0 && (
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
              </Card.Eyebrow>
            </Div>
          )}

          {cta && cta?.length > 0 && (
            <Span className="flex items-start gap-x-4">
              {cta.map(({ projects, text }, index: number) => {
                projects && projects?.length > 0 && (text = strings.projects)

                return (
                  projects &&
                  projects?.length > 0 && (
                    <Card.Cta key={index} title={text}>
                      {text}
                    </Card.Cta>
                  )
                )
              })}
            </Span>
          )}
        </Card>
      )
    }
  )
)

SkillsCardsList.displayName = 'SkillsCardsList'

export default SkillsCardsList
