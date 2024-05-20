'use client'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  ContentLayout,
  ToolsCardsList,
  ToolsList
} from '@guy-romelle-magayano/portfolio/components'
import {
  type ToolsData,
  type ToolsItemsData,
  type UsesPageData
} from '@guy-romelle-magayano/portfolio/types'

export type UsesAppProps = UsesPageData

/**
 * Renders the uses page.
 * @param {UsesAppProps} props - The props of the uses page.
 * @returns The rendered uses page.
 */
const UsesApp = (props: UsesAppProps) => {
  const { hero, tools } = props,
    heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    heading &&
    heading?.length > 0 &&
    description &&
    ((typeof description === 'string' && description?.length > 0) ||
      (Array.isArray(description) && description?.length > 0)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {tools && tools?.length > 0 && (
          <Div className="space-y-20">
            {tools.map(({ name, items }: ToolsData, index: number) => (
              <ToolsList key={index} title={name}>
                {items &&
                  items?.length > 0 &&
                  items.map(
                    ({ title, description }: ToolsItemsData, index2) => (
                      <ToolsCardsList
                        key={index2}
                        title={title}
                        description={description}
                      />
                    )
                  )}
              </ToolsList>
            ))}
          </Div>
        )}
      </ContentLayout.Simple>
    )
  )
}

UsesApp.displayName = 'UsesApp'

export default UsesApp
