'use client'

import Card from "@/components/Card"

export type TToolsCardsListProps<T = object> = T & {
  title?: string | null
  description?: string | null
}

/**
 * Renders a list of tools cards.
 * @param {Object} props - The props object.
 * @param {String} props.title - The title of the card.
 * @param {Array} props.description - The description of the card.
 * @returns {JSX.Element} The rendered component.
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
