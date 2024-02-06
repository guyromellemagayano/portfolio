'use client'

import { ReactNode } from 'react'

import ContentLayout from '@/components/layouts/Content'
import ToolsList from '@/components/list/Tools'
import ToolsListCards from '@/components/list/ToolsCards'
import type { TUsesData } from '@/data/uses'

/**
 * Renders the uses page.
 * @returns The uses page component.
 */
const UsesApp = (data: TUsesData): ReactNode => {
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
