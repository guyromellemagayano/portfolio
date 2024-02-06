'use client'

import Card from '@/components/Card'

export type TToolsCardsListProps<T = object> = T & {
  title?: string | null
  description?: string | null
}

/**
 * Renders the tools cards list component.
 * @param props - The props object.
 * @returns The rendered tools cards list component.
 */
const ToolsListCards = (props: TToolsCardsListProps): JSX.Element => {
  return (
    <Card as="li">
      <Card.Title as="h3">{props?.title || ''}</Card.Title>
      <Card.Description>{props?.description || ''}</Card.Description>
    </Card>
  )
}

export default ToolsListCards
