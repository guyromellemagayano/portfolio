'use client'

import {
  Article,
  Div,
  Heading,
  Section
} from '@guy-romelle-magayano/react-components/server'

import { cn } from '@guy-romelle-magayano/react-utils'

import {
  ArticleLayout,
  BaseContainer,
  ContentLayout,
  NewsletterLayout,
  PhotoLayout,
  ResumeLayout,
  SocialLinksLayout
} from '@guy-romelle-magayano/portfolio/components'
import {
  type ArticlesData,
  type HomePageData,
  type ProjectsData,
  type SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'

export type HomeAppProps = HomePageData & {
  links?: Array<SocialLinksData>
  articles?: Array<ArticlesData>
  projects?: Array<ProjectsData>
}

const strings = {
  articles: 'Articles',
  projects: 'Projects'
}

/**
 * Render the home application component.
 * @param {HomeAppProps} props - The props of the home application.
 * @returns The rendered home application component.
 */
const HomeApp = (props: HomeAppProps) => {
  const {
      hero,
      slidePhotos,
      cvFile,
      workExperiences,
      links,
      articles,
      projects
    } = props,
    heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    <>
      {heading &&
        heading?.length > 0 &&
        description &&
        ((typeof description === 'string' && description?.length > 0) ||
          (Array.isArray(description) && description?.length > 0)) && (
          <ContentLayout.Simple
            title={heading}
            intro={description}
            className="mt-9 sm:mt-9"
          >
            {links && links?.length > 0 && (
              <SocialLinksLayout className="mt-6 flex gap-6" data={links} />
            )}
          </ContentLayout.Simple>
        )}

      {slidePhotos && slidePhotos?.length > 0 && (
        <PhotoLayout className="mt-16 sm:mt-20" data={slidePhotos} />
      )}

      <BaseContainer className="mt-20 md:mt-24">
        <Div
          className={cn(
            'mx-auto grid w-full max-w-xl grid-cols-1 lg:max-w-none lg:grid-cols-2',
            articles &&
              articles?.length > 0 &&
              ((cvFile && cvFile?.length > 0) ||
                (workExperiences && workExperiences?.length > 0)) &&
              'gap-y-20'
          )}
        >
          <Section>
            {articles && articles?.length > 0 && (
              <Article className="mb-6">
                <Heading
                  as="h3"
                  className=" text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100"
                >
                  {strings.articles}
                </Heading>

                <ArticleLayout articles={articles} isHome />
              </Article>
            )}
          </Section>

          <Section className="space-y-10 lg:pl-16 xl:pl-24">
            <NewsletterLayout />

            {((workExperiences && workExperiences?.length > 0) ||
              (cvFile && cvFile?.length > 0)) && (
              <ResumeLayout
                cvFile={cvFile}
                workExperiences={workExperiences}
                className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
              />
            )}
          </Section>
        </Div>
      </BaseContainer>
    </>
  )
}

HomeApp.displayName = 'HomeApp'

export default HomeApp
