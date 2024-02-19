'use client'

import { FC } from 'react'

import Card from '@/components/Card'

import { isEmpty, isStringType } from '@/utils/checkTypes'

import { TCommonComponentProps } from '@/types/common'

export type TToolsCardsListProps = TCommonComponentProps & {
  title?: string
  description?: string
}

/**
 * Renders the tools cards list component.
 * @param [title=""] - The title of the tool.
 * @param [description=""] - The description of the tool.
 * @param rest - The rest of the props.
 * @returns The rendered tools cards list component.
 */
const ToolsListCards: FC<TToolsCardsListProps> = ({
  title = '',
  description = '',
  ...rest
}) => {
  return (
    isStringType(title) &&
    !isEmpty(title) &&
    isStringType(description) &&
    !isEmpty(description) && (
      <Card as="li" {...rest}>
        <Card.Title as="h3">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card>
    )
  )
}

export default ToolsListCards
