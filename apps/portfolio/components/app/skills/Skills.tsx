import { SkillsList, SkillsListCards } from '@components/List'
import { SimpleLayout } from '@components/layouts'
import { TBaseCommonAppComponentProps } from 'types/common'

/**
 * Renders the skills page.
 * @param translations - The translations to use.
 * @returns The skills page component.
 */
export default function SkillsApp({
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
        {props?.skills?.map(skill => {
          return (
            <SkillsList key={skill.name} title={skill.name}>
              {skill.items?.map(({ skillLevel, ...rest }) => (
                <SkillsListCards key={rest.title} {...rest} />
              ))}
            </SkillsList>
          )
        })}
      </div>
    </SimpleLayout>
  )
}
