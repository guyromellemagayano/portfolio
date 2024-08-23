/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@guy-romelle-magayano/react-components'
import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  AboutLayout,
  ContentLayout,
  ContentLayoutProps,
  NewsletterForm,
  PhotoLayout,
  ResumeLayout,
  SkillsCategory,
  SocialLinksLayout
} from '@guy-romelle-magayano/portfolio/components'
import type {
  BasePageData,
  PhotosData,
  SkillsData,
  SocialLinksData,
  WorkData
} from '@guy-romelle-magayano/portfolio/types'
import { cn } from '@guy-romelle-magayano/react-utils'

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
  readBlog: 'Read the blog'
}

type IntroSectionProps = ContentLayoutProps & {
  socialLinks: HomeAppProps['links']
}

/**
 * Render the intro section component
 * @param {IntroSectionProps} props - The component props
 * @returns The rendered JSX component.
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
      title={title}
      intro={intro}
      className={cn('mt-9 sm:mt-9', className)}
      {...rest}
    >
      <SocialLinksLayout
        className="mt-6 flex w-full max-w-xl flex-wrap gap-6 md:max-w-3xl"
        data={socialLinks}
      />
      <Div className="mt-10 flex flex-row flex-wrap gap-3">
        <Button
          className="text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full bg-zinc-800 px-8 py-4 font-semibold text-zinc-100 outline-offset-2 transition hover:bg-zinc-600 active:bg-zinc-600 active:transition-none dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300"
          onClick={() => '#'}
        >
          {strings.hireMe}
        </Button>
        <Button
          className="text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full border-2 border-zinc-800 bg-transparent px-8 py-4 font-semibold text-zinc-600 outline-offset-2 transition hover:border-transparent active:bg-transparent active:transition-none dark:border-white dark:text-zinc-100 dark:hover:border-transparent"
          onClick={() => '#'}
        >
          {strings.readBlog}
        </Button>
      </Div>
    </ContentLayout.Simple>
  )
}

IntroSection.displayName = 'IntroSection'

/**
 * Render the home application component.
 * @param {HomeAppProps} props - The component props
 * @returns The rendered JSX component.
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
  return (
    <>
      {/* Intro section */}
      <IntroSection
        title={hero?.heading}
        intro={hero?.description}
        socialLinks={links}
      />

      {/* Slide photos */}
      <PhotoLayout data={photos?.slidePhotos} className="mt-20 md:mt-24" />

      {/* About me section */}
      <AboutLayout
        title={aboutInfo?.hero?.heading}
        intro={aboutInfo?.hero?.description}
        className="mt-20 md:mt-24"
      />

      {/* Work experiences section */}
      <ResumeLayout
        title={workInfo?.hero?.heading}
        intro={workInfo?.hero?.description}
        cvFile={workInfo?.cvFile}
        workExperiences={workInfo?.workExperiences}
        className="mt-20 md:mt-24"
      />

      {/* Skills section */}
      <SkillsCategory data={skillsInfo} className="mt-20 md:mt-24" />

      {/* Newsletter form section */}
      <NewsletterForm className="mt-20 sm:mt-32 md:mt-24" />
    </>
  )
}

HomeApp.displayName = 'HomeApp'

export default HomeApp
