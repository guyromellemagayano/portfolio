/* eslint-disable @next/next/no-img-element */
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
  JumbotronLayout,
  NewsletterForm,
  ResumeLayout,
  SkillsCategory
} from '@guy-romelle-magayano/portfolio/components'
import type {
  ArticlesData,
  HomePageData,
  ProjectsData,
  SocialLinksData
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
 * Render the home application component
 * @param {HomeAppProps} props - The component props
 * @returns The rendered JSX component
 */
const HomeApp = (props: HomeAppProps) => {
  const {
    hero,
    aboutMeInfo,
    skillsInfo,
    slidePhotos,
    cvFile,
    workExperiences,
    links,
    articles,
    projects
  } = props

  return (
    <>
      {/* Intro section */}
      <ContentLayout.Simple
        title={hero?.heading}
        intro={hero?.description}
        className="mt-20 md:mt-24"
      />

      {/* About me section */}
      <JumbotronLayout
        heading={aboutMeInfo?.heading}
        description={aboutMeInfo?.description}
        photos={slidePhotos}
        links={links}
      />

      {/* Skills section */}
      <SkillsCategory data={skillsInfo} />
      {/* <SkillsCategory data={skillsInfo}> */}
      {/* <CategoryForm /> */}
      {/* </SkillsCategory> */}

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
          {/* Articles section */}
          <Section>
            {articles && articles?.length > 0 && (
              <Article className="mb-6">
                <Heading
                  as="h3"
                  className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100"
                >
                  {strings.articles}
                </Heading>

                <ArticleLayout articles={articles} isHome />
              </Article>
            )}
          </Section>

          <Section className="space-y-10 lg:pl-16 xl:pl-24">
            {/* Newsletter form section */}
            <NewsletterForm />

            {/* Work experiences section */}
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
