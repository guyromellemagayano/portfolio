import { forwardRef, memo } from 'react'

import { Div, Heading, Li } from '@guy-romelle-magayano/react-components/server'

import {
  Card,
  type CardProps,
  type CardRef
} from '@guy-romelle-magayano/portfolio/components'
import { type WorkExperienceData } from '@guy-romelle-magayano/portfolio/types'

export type WorkCardsListRef = CardRef
export type WorkCardsListProps = CardProps &
  Pick<WorkExperienceData, 'company' | 'country' | 'contributions' | 'skills'>

const strings = {
  skills: 'Skills'
}

/**
 * Renders the work list cards component.
 * @param {WorkCardsListProps} props - The properties to render the work list cards component.
 * @param {WorkCardsListRef} ref - The reference of the work list cards component.
 * @returns The rendered work list cards component.
 */
const WorkCardsList = memo(
  forwardRef<WorkCardsListRef, WorkCardsListProps>(
    ({ company, country, contributions, skills, ...rest }, ref) => {
      return (
        <Card {...rest} ref={ref} as="article">
          {company && company?.length > 0 && (
            <Card.Title as="h3" title={company} className="!mb-2">
              {company}{' '}
              {country && country?.length > 0 && (
                <Heading as="h5" className="mb-2 hidden text-sm md:block">
                  {country}
                </Heading>
              )}
            </Card.Title>
          )}

          {contributions && contributions?.length > 0 && (
            <Div className="my-2 flex flex-row items-start">
              <Card.Eyebrow
                as="ul"
                className="flex-wrap gap-y-4 text-zinc-400 dark:text-zinc-500"
              >
                {contributions.map(
                  (item, index: number) =>
                    item && item?.length > 0 && <Li key={index}>{item}</Li>
                )}
              </Card.Eyebrow>
            </Div>
          )}

          <Div className="mb-2 mt-4 flex flex-row items-start gap-x-6">
            <Card.Eyebrow
              as="h4"
              className="text-base text-rose-400 dark:text-rose-500"
            >
              {strings.skills}
            </Card.Eyebrow>

            {skills && skills?.length > 0 && (
              <Card.Eyebrow
                as="ul"
                className="flex-wrap gap-x-3 gap-y-1 text-zinc-400 dark:text-zinc-500"
              >
                {skills.map(
                  (item, index: number) =>
                    item && item?.length > 0 && <Li key={index}>{item}</Li>
                )}
              </Card.Eyebrow>
            )}
          </Div>
        </Card>
      )
    }
  )
)

WorkCardsList.displayName = 'WorkCardsList'

export default WorkCardsList
