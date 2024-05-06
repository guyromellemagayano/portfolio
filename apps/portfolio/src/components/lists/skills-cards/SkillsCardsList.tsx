import { forwardRef, memo } from 'react'

import Link from 'next/link'

import { Div, Li, Span } from '@guy-romelle-magayano/react-components/server'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import {
  Card,
  type CardProps,
  type CardRef
} from '@guy-romelle-magayano/portfolio/components/card'
import { SkillsItemData } from '@guy-romelle-magayano/portfolio/types'

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
const SkillsCardsList = memo(
  forwardRef<SkillsCardsListRef, SkillsCardsListProps>(
    ({ title, description, technologies, cta, ...rest }, ref) => {
      return (
        !isEmpty(title) &&
        isStringType(title) &&
        !isEmpty(description) &&
        isArrayType(description) && (
          <Card ref={ref} {...rest} as="article">
            <Card.Title as="h3" title={title}>
              {title}
            </Card.Title>

            {description?.map(
              (text, index) =>
                !isEmpty(text) &&
                isStringType(text) && (
                  <Card.Description key={index}>{text}</Card.Description>
                )
            )}

            {!isEmpty(technologies) && isArrayType(technologies) && (
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
                  {technologies?.map(
                    ({ name, link }, index) =>
                      !isEmpty(link) &&
                      isStringType(link) &&
                      !isEmpty(name) &&
                      isStringType(name) && (
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

            {!isEmpty(cta) && isArrayType(cta) && (
              <Span className="flex items-start gap-x-4">
                {cta?.map(({ projects, text }, index: number) => {
                  !isEmpty(projects) &&
                    isArrayType(projects) &&
                    (text = strings.projects)

                  return (
                    !isEmpty(projects) &&
                    isArrayType(projects) && (
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
      )
    }
  )
)

SkillsCardsList.displayName = 'SkillsCardsList'

export default SkillsCardsList
