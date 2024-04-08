import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  CardProps,
  CardRef
} from '@guy-romelle-magayano/portfolio/components/Card'
import { WorkExperienceData } from '@guy-romelle-magayano/portfolio/types'

// Dynamic imports
const Div = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Div)
)
const Heading = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(
    mod => mod.Heading
  )
)
const Li = dynamic(() =>
  import('@guy-romelle-magayano/react-components/server').then(mod => mod.Li)
)
const Card = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card
  )
)
const CardTitle = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Title
  )
)
const CardEyebrow = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Eyebrow
  )
)

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
const WorkCardsList = forwardRef<WorkCardsListRef, WorkCardsListProps>(
  ({ company, country, contributions, skills, ...rest }, ref) => {
    return (
      <Card ref={ref} {...rest} as="article">
        {company && country && (
          <CardTitle as="h3" title={company} className="!mb-2">
            {company}{' '}
            <Heading as="h5" className="mb-2 hidden text-sm md:block">
              {country}
            </Heading>
          </CardTitle>
        )}

        {contributions && (
          <Div className="my-2 flex flex-row items-start">
            <CardEyebrow
              as="ul"
              className="flex-wrap gap-y-4 text-zinc-400 dark:text-zinc-500"
            >
              {contributions?.map((item, index: number) => (
                <Li key={index}>{item}</Li>
              ))}
            </CardEyebrow>
          </Div>
        )}

        {skills && (
          <Div className="mb-2 mt-4 flex flex-row items-start gap-x-6">
            <CardEyebrow
              as="h4"
              className="text-base text-rose-400 dark:text-rose-500"
            >
              {strings.skills}
            </CardEyebrow>

            <CardEyebrow
              as="ul"
              className="flex-wrap gap-x-3 gap-y-1 text-zinc-400 dark:text-zinc-500"
            >
              {skills?.map((item, index: number) => (
                <Li key={index}>{item}</Li>
              ))}
            </CardEyebrow>
          </Div>
        )}
      </Card>
    )
  }
)

WorkCardsList.displayName = 'WorkCardsList'

export default WorkCardsList
