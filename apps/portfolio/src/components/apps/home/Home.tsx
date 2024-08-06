/* eslint-disable @next/next/no-img-element */
'use client'

import {
  CodeBracketIcon,
  NewspaperIcon,
  UserIcon
} from '@heroicons/react/16/solid'
import { useTheme } from 'next-themes'

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
  PhotoLayout,
  ResumeLayout
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

  const { resolvedTheme } = useTheme()

  return (
    <>
      {/* Intro section */}
      <JumbotronLayout
        heading={hero?.heading}
        description={hero?.description}
        links={links}
      />

      {/* Slide photos sections */}
      <PhotoLayout className="mt-16 sm:mt-20" data={slidePhotos} />

      {/* About me section */}
      <ContentLayout.Simple
        title={aboutMeInfo?.heading}
        intro={aboutMeInfo?.description}
        className="mt-20 md:mt-24"
      />

      {/* Skills section */}
      <ContentLayout.Simple
        title={skillsInfo?.heading}
        intro={skillsInfo?.description}
        className="mt-20 md:mt-24"
      >
        {skillsInfo?.skills && skillsInfo?.skills?.length > 0 && (
          <div className="mx-auto max-w-7xl">
            <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-4 lg:grid-cols-5">
              {skillsInfo?.skills
                ?.map(skill => {
                  const imageAlt =
                    resolvedTheme === 'dark' &&
                    skill.image.dark &&
                    skill.image.dark?.alt?.length > 0 &&
                    skill.image.dark?.src !== '#'
                      ? skill.image.dark.alt
                      : skill.image.default.alt
                  const imageSrc =
                    resolvedTheme === 'dark' &&
                    skill.image.dark &&
                    skill.image.dark?.src?.length > 0 &&
                    skill.image.dark?.src !== '#'
                      ? skill.image.dark.src
                      : skill.image.default.src

                  return (
                    <div
                      key={skill.name}
                      className="h-full w-full cursor-pointer bg-neutral-200/45 px-4 py-8 ring-1 ring-neutral-950/10 transition hover:bg-neutral-200 dark:bg-white/5 dark:ring-neutral-950/5 dark:hover:bg-white/15"
                    >
                      <img
                        alt={imageAlt}
                        src={imageSrc}
                        className="mx-auto h-24 w-24"
                      />
                      <h3 className="mt-4 text-center text-base font-semibold leading-5 tracking-tighter text-zinc-600 dark:text-zinc-400">
                        {skill.name}
                      </h3>
                      <ul
                        role="list"
                        className="mt-3 flex justify-center gap-x-3"
                      >
                        <li>
                          <span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                            <NewspaperIcon className="h-4 w-4" />
                          </span>
                        </li>
                        <li>
                          <span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                            <CodeBracketIcon className="h-4 w-4" />
                          </span>
                        </li>
                        <li>
                          <span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-400">
                            <UserIcon className="h-4 w-4" />
                          </span>
                        </li>
                      </ul>
                    </div>
                  )
                })}
            </div>
          </div>
        )}
      </ContentLayout.Simple>

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
