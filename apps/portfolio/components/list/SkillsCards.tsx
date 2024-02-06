'use client'

import Card from '@/components/Card'

import type { TSkillsItemsProps } from '@/data/skills'

import { isEmpty } from '@/utils/checkTypes'

import type { TWithChildren } from '@/types/common'
import { ReactNode } from 'react'

export type TSkillsCardsListProps<T = object> = T &
  TWithChildren<T> &
  Pick<TSkillsItemsProps, 'title' | 'description' | 'technologies'> & {
    cta?: Array<{
      projects: string[]
      text: string
    }> | null
  }

/**
 * Renders the skills cards list component.
 * @param props - The props object.
 * @returns The rendered skills cards list component.
 */
const SkillsCardsList = (props: TSkillsCardsListProps): ReactNode => {
  return (
    <Card as="article">
      <Card.Title as="h3" title={props?.title || ''}>
        {props?.title || ''}
      </Card.Title>

      {props?.description?.map(text => (
        <Card.Description key={text}>{text}</Card.Description>
      ))}

      {
        <div className="flex flex-row items-start gap-x-6 my-2">
          <Card.Eyebrow
            as="h4"
            className="text-rose-400 dark:text-rose-500 text-base"
          >
            Technologies
          </Card.Eyebrow>

          <Card.Eyebrow
            as="ul"
            className="flex-wrap gap-x-4 text-zinc-400 dark:text-zinc-500"
          >
            {props?.technologies?.map(({ name, link }) => (
              <li key={name}>
                <a
                  href={link}
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </li>
            ))}
          </Card.Eyebrow>
        </div>
      }

      {!isEmpty(props?.cta) && (
        <span className="flex items-start gap-x-4">
          {props?.cta?.map(item => {
            const projectCtaText = 'See projects'

            !isEmpty(item.projects) && (item.text = projectCtaText)

            return (
              !isEmpty(item.projects) && (
                <Card.Cta key={item.text} title={item.text}>
                  {item.text}
                </Card.Cta>
              )
            )
          })}
        </span>
      )}
    </Card>
  )
}

export default SkillsCardsList
