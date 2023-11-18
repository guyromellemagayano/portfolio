import { ToolsList, ToolsListCards } from '@components/List'
import { SimpleLayout } from '@components/layouts'
import { TBaseCommonAppComponentProps } from 'types/common'

/**
 * Renders the uses page.
 * @param translations - The translations to use.
 * @returns The uses page component.
 */
export default function UsesApp({
  translations,
  ...props
}: TBaseCommonAppComponentProps): JSX.Element {
  return (
    <SimpleLayout
      id="hero"
      title={props?.hero?.heading || ''}
      intro={props?.hero?.description || []}
    >
      <div className="space-y-20">
        {props?.tools?.map(tool => (
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
    </SimpleLayout>
  )
}
