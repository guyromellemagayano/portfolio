'use client'

import { Div, Heading } from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

import { BaseContainer } from '@guy-romelle-magayano/portfolio/components/Containers/Base'
import { ArticleLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Article'
import { ContentLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Content'
import { NewsletterLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Newsletter'
import { PhotoLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Photo'
import { ResumeLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/Resume'
import { SocialLinksLayout } from '@guy-romelle-magayano/portfolio/components/Layouts/SocialLinks'
import {
  ArticlesData,
  HomePageData,
  SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'

export type HomeAppProps = HomePageData & {
  links?: Array<SocialLinksData>
  articles?: Array<ArticlesData>
}

const strings = {
  articles: 'Articles'
}

/**
 * Render the home application component.
 * @param props - The props of the home application.
 * @returns The rendered home application component.
 */
const HomeApp = (props: HomeAppProps) => {
  const { hero, slidePhotos, cvFile, workExperiences, links, articles } = props

  const heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    <>
      <ContentLayout.Simple title={heading} intro={description}>
        <SocialLinksLayout className="mt-6 flex gap-6" data={links} />
      </ContentLayout.Simple>
      <PhotoLayout className="mt-16 sm:mt-20" data={slidePhotos} />
      <BaseContainer className="mt-20 md:mt-24">
        <Div
          className={cn(
            'mx-auto grid max-w-xl grid-cols-1 lg:max-w-none lg:grid-cols-2',
            articles && (cvFile || workExperiences) && 'gap-y-20'
          )}
        >
          <Div>
            <Heading
              as="h3"
              className="mb-6 text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100"
            >
              {strings.articles}
            </Heading>
            <ArticleLayout articles={articles} isHome />
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
