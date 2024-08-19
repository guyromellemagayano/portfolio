import {
  ContentLayout,
  PhotoLayout,
  SocialLinksLayout
} from '@guy-romelle-magayano/portfolio/components'
import type {
  BaseHeroData,
  HomePageData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'

export type JumbotronLayoutProps = BaseHeroData & {
  photos: HomePageData['slidePhotos']
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
  links,
  photos
}: JumbotronLayoutProps) => {
  if (!heading && !description) {
    return null
  }

  return (
    <>
      <ContentLayout.Simple title={heading} className="mt-20 md:mt-24" />
      <PhotoLayout className="mt-8 sm:mt-12 sm:px-8" data={photos} />
      <ContentLayout.Simple
        intro={description}
        className="mt-8 sm:mt-12 sm:px-8"
      >
        <SocialLinksLayout
          className="mt-6 flex w-full max-w-xl flex-wrap gap-6 md:max-w-3xl"
          data={links}
        />
      </ContentLayout.Simple>
    </>
  )
}

JumbotronLayout.displayName = 'JumbotronLayout'

export default JumbotronLayout
