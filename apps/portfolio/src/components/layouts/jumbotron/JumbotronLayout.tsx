import {
  ContentLayout,
  SocialLinksLayout
} from '@guy-romelle-magayano/portfolio/components'
import type {
  BaseHeroData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'

export type JumbotronLayoutProps = BaseHeroData & {
  links?: Array<SocialLinksData>
}

/**
 * Render the jumbotron layout component
 * @param {JumbotronProps} props - The component props
 * @returns The rendered JSX component
 */
const JumbotronLayout = ({
  heading = '',
  description = '',
  links = []
}: JumbotronLayoutProps) => {
  if (!heading && !description) {
    return null
  }

  return (
    <ContentLayout.Simple
      title={heading}
      intro={description}
      className="mt-9 sm:mt-9"
    >
      {links.length > 0 && (
        <SocialLinksLayout className="mt-6 flex gap-6" data={links} />
      )}
    </ContentLayout.Simple>
  )
}

JumbotronLayout.displayName = 'JumbotronLayout'

export default JumbotronLayout
