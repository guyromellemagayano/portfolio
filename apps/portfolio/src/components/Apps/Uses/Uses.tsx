'use client'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  isArrayType,
  isEmpty,
  isStringType
} from '@guy-romelle-magayano/react-utils'

import { ContentLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Content'
import { ToolsList } from '@guy-romelle-magayano/portfolio/components/Lists/Tools'
import { ToolsCardsList } from '@guy-romelle-magayano/portfolio/components/Lists/ToolsCards'
import {
  ToolsData,
  ToolsItemsData,
  UsesPageData
} from '@guy-romelle-magayano/portfolio/types'

export type UsesAppProps = UsesPageData

/**
 * Renders the uses page.
 * @param id The uses page id.
 * @param data The uses page data.
 * @param rest The uses page props.
 * @returns The uses page component.
 */
const UsesApp = (props: UsesAppProps) => {
  const { hero, tools } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    !isEmpty(heading) &&
    isStringType(heading) &&
    !isEmpty(description) &&
    (isStringType(description) || isArrayType(description)) && (
      <ContentLayout.Simple title={heading} intro={description}>
        {!isEmpty(tools) && isArrayType(tools) && (
          <Div className="space-y-20">
            {tools?.map(({ name, items }: ToolsData, index: number) => (
              <ToolsList key={index} title={name}>
                {!isEmpty(items) &&
                  isArrayType(items) &&
                  items?.map(
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
