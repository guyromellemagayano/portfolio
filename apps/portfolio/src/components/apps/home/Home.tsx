/* eslint-disable @next/next/no-img-element */
'use client'

import { Button, Dd, Div, Dl, Dt, Heading, Img, P } from '@react-components'

import { cn } from '@react-utils'

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon
} from '@heroicons/react/20/solid'
import {
  AboutLayout,
  ContentLayout,
  type ContentLayoutProps,
  NewsletterForm,
  PhotoLayout,
  ResumeLayout,
  SkillsCategory,
  SocialLinksLayout
} from '@portfolio/components'
import type {
  BasePageData,
  PhotosData,
  SkillsData,
  SocialLinksData,
  WorkData
} from '@portfolio/types'

export type HomeAppProps = BasePageData & {
  aboutInfo: Pick<BasePageData, 'hero'>
  workInfo: WorkData
  skillsInfo: SkillsData
  photos: PhotosData
  links?: SocialLinksData[]
  articles?: any
  projects?: any
}

const strings = {
  articles: 'Articles',
  projects: 'Projects',
  hireMe: 'Hire me',
  readArticle: 'Read the article',
  learnMore: 'Learn more about me',
  checkProject: 'Go to this project',
  goToProjects: 'See all my projects'
}

type IntroSectionProps = ContentLayoutProps & {
  socialLinks: HomeAppProps['links']
}

/**
 * Render the intro section component.
 * @param {IntroSectionProps} props - The component props
 * @returns The rendered component
 */
const IntroSection = ({
  title,
  intro,
  socialLinks,
  className,
  ...rest
}: IntroSectionProps) => {
  return (
    <ContentLayout.Simple
      className={cn('mt-9 sm:mt-9', className)}
      intro={intro}
      title={title}
      {...rest}
    >
      <SocialLinksLayout
        className="mt-6 flex w-full max-w-xl flex-wrap gap-6 md:max-w-3xl"
        data={socialLinks}
      />
      <Div className="mt-10 flex flex-row flex-wrap gap-3">
        <Button
          className="text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full bg-zinc-800 px-8 py-4 font-semibold text-zinc-50 outline-offset-2 transition hover:bg-zinc-600 active:bg-zinc-600 active:transition-none dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300"
          onClick={() => '#'}
        >
          {strings.hireMe}
        </Button>
        <Button
          className="text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full border-2 border-zinc-800 bg-transparent px-8 py-4 font-semibold text-zinc-800 outline-offset-2 transition hover:border-transparent active:bg-transparent active:transition-none dark:border-zinc-300 dark:text-zinc-300 dark:hover:border-transparent"
          onClick={() => '#'}
        >
          {strings.readArticle}
        </Button>
      </Div>
    </ContentLayout.Simple>
  )
}

IntroSection.displayName = 'IntroSection'

/**
 * Render the home application component.
 * @param {HomeAppProps} props - The component props
 * @returns The rendered component
 */
const HomeApp = ({
  hero,
  links,
  aboutInfo,
  workInfo,
  skillsInfo,
  photos
  // articles,
  // projects
}: HomeAppProps) => {
  const features = [
    {
      name: 'Push to deploy.',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
      icon: CloudArrowUpIcon
    },
    {
      name: 'SSL certificates.',
      description:
        'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
      icon: LockClosedIcon
    },
    {
      name: 'Simple queues.',
      description:
        'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.',
      icon: ArrowPathIcon
    },
    {
      name: 'Advanced security.',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.',
      icon: FingerPrintIcon
    },
    {
      name: 'Powerful API.',
      description:
        'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.',
      icon: Cog6ToothIcon
    },
    {
      name: 'Database backups.',
      description:
        'Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus. ',
      icon: ServerIcon
    }
  ]

  return (
    <>
      {/* Intro section */}
      <IntroSection
        intro={hero?.description}
        socialLinks={links}
        title={hero?.heading}
      />

      {/* Slide photos */}
      <PhotoLayout className="mt-20 md:mt-24" data={photos?.slidePhotos} />

      {/* About me section */}
      <AboutLayout
        className="mt-20 md:mt-24"
        intro={aboutInfo?.hero?.description}
        title={aboutInfo?.hero?.heading}
      >
        <Div className="mt-10 flex flex-row flex-wrap gap-3">
          <Button
            className="text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full bg-zinc-800 px-8 py-4 font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-600 active:bg-zinc-600 active:transition-none dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300"
            onClick={() => '#'}
          >
            {strings.learnMore}
          </Button>
        </Div>
      </AboutLayout>

      {/* Work experiences section */}
      <ResumeLayout
        className="mt-20 md:mt-24"
        cvFile={workInfo?.cvFile}
        intro={workInfo?.hero?.description}
        title={workInfo?.hero?.heading}
        workExperiences={workInfo?.workExperiences}
      />

      {/* Skills section */}
      <SkillsCategory className="mt-20 md:mt-24" data={skillsInfo} />

      {/* Projects section */}
      <Div className="mt-20 md:mt-24">
        <Div className="mx-auto flex max-w-7xl flex-col flex-wrap px-6 lg:px-8">
          <Div className="mx-auto max-w-2xl lg:text-center">
            <Heading
              as="h2"
              className="text-base font-semibold leading-7 text-indigo-600"
            >
              Deploy faster
            </Heading>
            <P className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to deploy your app
            </P>
            <P className="mt-6 text-lg leading-8 text-gray-600">
              Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
              Suspendisse eget egestas a elementum pulvinar et feugiat blandit
              at. In mi viverra elit nunc.
            </P>
          </Div>
          <Div className="relative overflow-hidden pt-12">
            <Div className="mx-auto max-w-7xl px-6 lg:px-8">
              <Img
                alt="App screenshot"
                src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
                width={2432}
                height={1442}
                className="rounded-2xl shadow-2xl ring-1 ring-gray-100 dark:ring-black"
              />
            </Div>
          </Div>
          <Div className="mx-auto mt-12 max-w-2xl sm:mt-16 lg:mt-20 lg:max-w-4xl">
            <Dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map(feature => (
                <Div key={feature.name} className="relative pl-16">
                  <Dt className="text-base font-semibold leading-7 text-gray-900">
                    <Div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </Div>
                    {feature.name}
                  </Dt>
                  <Dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </Dd>
                </Div>
              ))}
            </Dl>
          </Div>
          <Div className="mt-10 flex flex-row flex-wrap justify-center gap-3">
            <Button
              className="text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full bg-zinc-800 px-8 py-4 font-semibold text-zinc-50 outline-offset-2 transition hover:bg-zinc-600 active:bg-zinc-600 active:transition-none dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300"
              onClick={() => '#'}
            >
              {strings.checkProject}
            </Button>
            <Button
              className="text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full border-2 border-zinc-800 bg-transparent px-8 py-4 font-semibold text-zinc-800 outline-offset-2 transition hover:border-transparent active:bg-transparent active:transition-none dark:border-zinc-300 dark:text-zinc-300 dark:hover:border-transparent"
              onClick={() => '#'}
            >
              {strings.goToProjects}
            </Button>
          </Div>
        </Div>
      </Div>

      {/* Newsletter form section */}
      <NewsletterForm className="mt-20 sm:mt-32 md:mt-24" />
    </>
  )
}

HomeApp.displayName = 'HomeApp'

export default HomeApp
