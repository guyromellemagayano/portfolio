import { forwardRef } from 'react'

import {
  Card,
  CardProps,
  CardRef
} from '@guy-romelle-magayano/portfolio/components/card'
import { ToolsItemsData } from '@guy-romelle-magayano/portfolio/types'

export type ToolsCardsListRef = CardRef
export type ToolsCardsListProps = CardProps & ToolsItemsData

/**
 * Renders the tools cards list component.
 * @param [title=""] - The title of the tool.
 * @param [description=""] - The description of the tool.
 * @param rest - The rest of the props.
 * @returns The rendered tools cards list component.
 */
const ToolsCardsList = forwardRef<ToolsCardsListRef, ToolsCardsListProps>(
  ({ title, description, ...rest }, ref) => {
    return (
      title &&
      description && (
        <Card ref={ref} {...rest} as="li">
          <Card.Title as="h3">{title}</Card.Title>
          <Card.Description>{description}</Card.Description>
        </Card>
      )
    )
  }
)

ToolsCardsList.displayName = 'ToolsCardsList'

export default ToolsCardsList
