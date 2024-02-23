'use client'

import { FC } from 'react'

import Card from '@guy-romelle-magayano/portfolio/components/Card'

import type { TWorkExperiences } from '@guy-romelle-magayano/portfolio/data/work'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/portfolio/utils/checkTypes'

import type { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'

export type TWorkListCardProps = TCommonComponentProps &
  Pick<TWorkExperiences, 'company' | 'country' | 'contributions' | 'skills'>

/**
 * Renders the work list cards component.
 * @param company - The company of the work.
 * @param country - The country of the work.
 * @param contributions - The contributions of the work.
 * @param skills - The skills of the work.
 * @param rest - The rest of the props.
 * @returns The rendered work list cards component.
 */
const WorkCardsList: FC<TWorkListCardProps> = ({
  company,
  country,
  contributions,
  skills,
  ...rest
}) => {
  return (
    <Card as="article" {...rest}>
      {isStringType(company) &&
        !isEmpty(company) &&
        isStringType(country) &&
        !isEmpty(country) && (
          <Card.Title as="h3" title={company} className="!mb-2">
            {company}{' '}
            <h5 className="mb-2 hidden md:block text-sm">{country}</h5>
          </Card.Title>
        )}

      {isArrayType(contributions) && !isEmpty(contributions) && (
        <div className="flex flex-row items-start my-2">
          <Card.Eyebrow
            as="ul"
            className="flex-wrap gap-y-4 text-zinc-400 dark:text-zinc-500"
          >
            {contributions.map((item, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </Card.Eyebrow>
        </div>
      )}

      <div className="flex flex-row items-start gap-x-6 mt-4 mb-2">
        <Card.Eyebrow
          as="h4"
          className="text-rose-400 dark:text-rose-500 text-base"
        >
          Skills
        </Card.Eyebrow>

        {isArrayType(skills) && !isEmpty(skills) && (
          <Card.Eyebrow
            as="ul"
            className="flex-wrap gap-x-3 gap-y-1 text-zinc-400 dark:text-zinc-500"
          >
            {skills.map((item, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </Card.Eyebrow>
        )}
      </div>
    </Card>
  )
}

export default WorkCardsList
