'use client'

import { Div } from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

import { BaseContainer } from '@guy-romelle-magayano/portfolio/components/Containers/Base'
import { ContentLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Content'
import { NewsletterLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Newsletter'
import { PhotoLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Photo'
import { ResumeLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Resume'
import { SocialLinksLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/SocialLinks'
import {
  HomePageData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types/data'

export type HomeAppProps = HomePageData & {
  links?: Array<SocialLinksData>
}

/**
 * Render the home application component.
 * @param props - The props of the home application.
 * @returns The rendered home application component.
 */
const HomeApp = (props: HomeAppProps) => {
  const { hero, slidePhotos, cvFile, workExperiences, links } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined,
    articles: Array<unknown> = []

  return (
    <>
      <ContentLayout.Simple title={heading} intro={description}>
        <SocialLinksLayout className="mt-6 flex gap-6" data={links} />
      </ContentLayout.Simple>
      <PhotoLayout className="mt-16 sm:mt-20" data={slidePhotos} />
      <BaseContainer className="mt-24 md:mt-28">
        <Div
          className={cn(
            'mx-auto grid max-w-xl grid-cols-1 lg:max-w-none lg:grid-cols-2',
            articles && (cvFile || workExperiences) && 'gap-y-20'
          )}
        >
          <Div className="flex flex-col gap-16">
            {/* {articles?.map((article, index: number) => (
              <Article key={index} {...article} />
            ))} */}
          </Div>

          <Div className="space-y-10 lg:pl-16 xl:pl-24">
            <NewsletterLayout />
            <ResumeLayout
              cvFile={cvFile}
              workExperiences={workExperiences}
              className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
            />
          </Div>
        </Div>
      </BaseContainer>
    </>
  )
}

HomeApp.displayName = 'HomeApp'

export default HomeApp
