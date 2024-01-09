'use client'

import { UsesData } from '@/data'

import { ContentLayout, ToolsList, ToolsListCards } from '@/components'

/**
 * Renders the uses page.
 * @returns The uses page component.
 */
const UsesApp = (): JSX.Element => {
  const { hero, tools } = UsesData()

  return (
    <ContentLayout
      id="hero"
      title={hero?.heading || ''}
      intro={hero?.description || []}
      className="sm:px-8 mt-16 sm:mt-32"
    >
      <div className="space-y-20">
        {tools?.map(tool => (
          <ToolsList key={tool.name} title={tool.name}>
            {tool.items?.map(item => (
              <ToolsListCards
                key={item.title}
                title={item.title}
                description={item.description}
              />
            ))}
          </ToolsList>
        ))}
      </div>
    </ContentLayout>
  )
}

export default UsesApp
