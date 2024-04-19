import { forwardRef } from 'react'

import dynamic from 'next/dynamic'

import {
  CardProps,
  CardRef
} from '@guy-romelle-magayano/portfolio/components/Card'
import { ToolsItemsData } from '@guy-romelle-magayano/portfolio/types'

// Dynamic imports
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
const CardDescription = dynamic(() =>
  import('@guy-romelle-magayano/portfolio/components/Card').then(
    mod => mod.Card.Description
  )
)

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
          <CardTitle as="h3">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </Card>
      )
    )
  }
)

ToolsCardsList.displayName = 'ToolsCardsList'

export default ToolsCardsList
