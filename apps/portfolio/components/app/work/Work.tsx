import { WorkList, WorkListCards } from '@components/List'
import { SimpleLayout } from '@components/layouts'
import { TBaseCommonAppComponentProps } from 'types/common'

/**
 * Renders the work page.
 * @param translations - The translations to use.
 * @returns The work page component.
 */
export default function WorkApp({
  translations,
  ...props
}: TBaseCommonAppComponentProps): JSX.Element {
  return (
    <SimpleLayout
      id="hero"
      title={props?.hero?.heading || ''}
      intro={props?.hero?.description || []}
    >
      <div className="grid gap-y-12">
        {props?.workExperiences?.map(item => (
          <WorkList key={item.duration} title={item.duration} {...item}>
            <WorkListCards {...item} />
          </WorkList>
        ))}
      </div>
    </SimpleLayout>
  )
}
