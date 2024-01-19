'use client'

import type { TUsesData } from '@/data/uses'
import ContentLayout from '../layouts/Content'
import ToolsList from '../list/Tools'
import ToolsListCards from '../list/ToolsCards'

/**
 * Renders the uses page.
 * @returns The uses page component.
 */
const UsesApp = (data: TUsesData): JSX.Element => {
  const heading = data?.hero?.heading || ''
  const description = data?.hero?.description || []
  const tools = data?.tools || []

  return (
    <ContentLayout
      id="hero"
      title={heading}
      intro={description}
      className="sm:px-8 mt-16 sm:mt-32"
    >
      <div className="space-y-20">
        {tools?.map(tool => {
          const name = tool?.name || ''
          const items = tool?.items || []

          return (
            <ToolsList key={name} title={name}>
              {items?.map(item => {
                const title = item?.title || ''
                const description = item?.description || ''

                return (
                  <ToolsListCards
                    key={title}
                    title={title}
                    description={description}
                  />
                )
              })}
            </ToolsList>
          )
        })}
      </div>
    </ContentLayout>
  )
}

export default UsesApp
