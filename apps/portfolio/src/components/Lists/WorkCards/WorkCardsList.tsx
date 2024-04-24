import { forwardRef, memo } from 'react'

import { Div, Heading, Li } from '@guy-romelle-magayano/react-components/server'

import {
  Card,
  type CardProps,
  type CardRef
} from '@guy-romelle-magayano/portfolio/components/Card'
import { WorkExperienceData } from '@guy-romelle-magayano/portfolio/types'
import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

export type WorkCardsListRef = CardRef
export type WorkCardsListProps = CardProps &
  Pick<WorkExperienceData, 'company' | 'country' | 'contributions' | 'skills'>

const strings = {
  skills: 'Skills'
}

/**
 * Renders the work list cards component.
 * @param company - The company of the work.
 * @param country - The country of the work.
 * @param contributions - The contributions of the work.
 * @param skills - The skills of the work.
 * @param rest - The rest of the props.
 * @returns The rendered work list cards component.
 */
const WorkCardsList = memo(
  forwardRef<WorkCardsListRef, WorkCardsListProps>(
    ({ company, country, contributions, skills, ...rest }, ref) => {
      return (
        !isEmpty(company) &&
        isStringType(company) &&
        !isEmpty(country) &&
        isStringType(country) &&
        !isEmpty(contributions) &&
        isArrayType(contributions) &&
        !isEmpty(skills) &&
        isArrayType(skills) && (
          <Card ref={ref} {...rest} as="article">
            <Card.Title as="h3" title={company} className="!mb-2">
              {company}{' '}
              <Heading as="h5" className="mb-2 hidden text-sm md:block">
                {country}
              </Heading>
            </Card.Title>

            <Div className="my-2 flex flex-row items-start">
              <Card.Eyebrow
                as="ul"
                className="flex-wrap gap-y-4 text-zinc-400 dark:text-zinc-500"
              >
                {contributions?.map(
                  (item, index: number) =>
                    !isEmpty(item) &&
                    isStringType(item) && <Li key={index}>{item}</Li>
                )}
              </Card.Eyebrow>
            </Div>

            <Div className="mb-2 mt-4 flex flex-row items-start gap-x-6">
              <Card.Eyebrow
                as="h4"
                className="text-base text-rose-400 dark:text-rose-500"
              >
                {strings.skills}
              </Card.Eyebrow>
              <Card.Eyebrow
                as="ul"
                className="flex-wrap gap-x-3 gap-y-1 text-zinc-400 dark:text-zinc-500"
              >
                {skills?.map(
                  (item, index: number) =>
                    !isEmpty(item) &&
                    isStringType(item) && <Li key={index}>{item}</Li>
                )}
              </Card.Eyebrow>
            </Div>
          </Card>
        )
      )
    }
  )
)

WorkCardsList.displayName = 'WorkCardsList'

export default WorkCardsList
