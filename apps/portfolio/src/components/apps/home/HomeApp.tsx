import { forwardRef, memo } from 'react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

import { Div } from '@react-components'

import { cn } from '@react-utils'

import type {
  TContentLayoutProps,
  TContentLayoutRef
} from '@portfolio/components'
import { commonData } from '@portfolio/data'
import type { HomePageAppDataQuery } from '@portfolio/graphql'
import type { TCommonProps } from '@portfolio/types'

// Dynamic imports
const ContentSimpleLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ContentSimpleLayout)
)
const PhotoLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.PhotoLayout)
)
const ResumeLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.ResumeLayout)
)
const SkillsCategory = dynamic(() =>
  import('@portfolio/components').then(mod => mod.SkillsCategory)
)
const SocialLinksLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.SocialLinksLayout)
)
const NewsletterForm = dynamic(() =>
  import('@portfolio/components').then(mod => mod.NewsletterForm)
)
const HomeProjectsLayout = dynamic(() =>
  import('@portfolio/components').then(mod => mod.HomeProjectsLayout)
)

export type TIntroSectionRef = TContentLayoutRef
export type TIntroSectionProps = Omit<
  TContentLayoutProps,
  'heading' | 'description'
> &
  HomePageAppDataQuery['homePage']['hero'] &
  Pick<HomePageAppDataQuery, 'links' | 'common'>

/**
 * Render the intro section component.
 * @param {TIntroSectionProps} props - The component props
 * @param {TIntroSectionRef} ref - The component reference
 * @returns The rendered intro section component
 */
const IntroSection = memo(
  forwardRef<TIntroSectionRef, TIntroSectionProps>(
    ({ description, heading, cta, links, common, children, ...rest }, ref) => {
      if (!description && !heading && !cta && !links && !children) return null

      return (
        <ContentSimpleLayout
          ref={ref}
          heading={heading}
          description={description}
          className="mt-9 sm:mt-9"
          {...rest}
        >
          <SocialLinksLayout
            className="mt-6 flex w-full max-w-xl flex-wrap gap-6 md:max-w-3xl"
            data={links?.social}
          />

          {cta && (
            <Div className="mt-10 flex flex-row flex-wrap gap-3">
              {cta.map(({ id, slug, link, buttonType }) => {
                const label =
                  slug === 'contact'
                    ? common?.hireMe || commonData.hireMe
                    : slug === 'articles'
                      ? common?.readArticles || commonData.readArticles
                      : ''

                return (
                  <Link
                    key={id}
                    href={link || '#'}
                    className={cn(
                      `text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold outline-offset-2 transition active:transition-none`,
                      buttonType === 'primary'
                        ? 'bg-zinc-800 text-zinc-50 hover:bg-zinc-600 active:bg-zinc-600 dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300'
                        : 'border-2 border-zinc-800 bg-transparent text-zinc-800 hover:border-transparent active:bg-transparent dark:border-zinc-300 dark:text-zinc-300 dark:hover:border-transparent'
                    )}
                  >
                    {label}
                  </Link>
                )
              })}
            </Div>
          )}

          {children}
        </ContentSimpleLayout>
      )
    }
  )
)

IntroSection.displayName = 'IntroSection'

export type TAboutSectionRef = TContentLayoutRef
export type TAboutSectionProps = Pick<
  HomePageAppDataQuery['homePage']['sections'][1],
  'description' | 'heading' | 'cta'
> &
  TCommonProps

/**
 * Render the about section component.
 * @param {TAboutSectionProps} props - The component props
 * @returns The rendered about section component
 */
const AboutSection = memo(
  forwardRef<TAboutSectionRef, TAboutSectionProps>(
    ({ description, heading, cta, common }, ref) => {
      if (!description && !heading && !cta) return null

      return (
        <ContentSimpleLayout
          ref={ref}
          className="mt-20 sm:mt-32 md:mt-24"
          heading={heading}
          description={description}
        >
          {cta && (
            <Div className="mt-10 flex flex-row flex-wrap gap-3">
              {cta.map(({ id, slug, link, buttonType }) => {
                const label =
                  slug === 'about'
                    ? common?.learnMore || commonData.learnMore
                    : ''

                return (
                  <Link
                    key={id}
                    href={link!}
                    className={cn(
                      `text-md group inline-flex w-auto flex-none items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold outline-offset-2 transition active:transition-none`,
                      buttonType === 'primary'
                        ? 'bg-zinc-800 text-zinc-50 hover:bg-zinc-600 active:bg-zinc-600 dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300'
                        : 'border-2 border-zinc-800 bg-transparent text-zinc-800 hover:border-transparent active:bg-transparent dark:border-zinc-300 dark:text-zinc-300 dark:hover:border-transparent'
                    )}
                  >
                    {label}
                  </Link>
                )
              })}
            </Div>
          )}
        </ContentSimpleLayout>
      )
    }
  )
)

AboutSection.displayName = 'AboutSection'

export type THomeAppProps = {
  data: HomePageAppDataQuery
}

/**
 * Render the home app component.
 * @returns The rendered home app component
 */
const HomeApp = memo(({ data }: THomeAppProps) => {
  return (
    <>
      <IntroSection
        heading={data?.homePage?.hero?.heading}
        description={data?.homePage?.hero?.description}
        cta={data?.homePage?.hero?.cta}
        links={data?.links}
        common={data?.common}
      />

      {data?.homePage?.sections?.map(
        ({ id, contentType, heading, description, cta }) => {
          if (contentType === 'photo') {
            return (
              <PhotoLayout
                key={id}
                className="mt-20 sm:mt-32 md:mt-24"
                slideImages={data?.images?.slideImages}
                common={data?.common}
              />
            )
          }

          if (contentType === 'about') {
            return (
              <AboutSection
                key={id}
                heading={heading}
                description={description}
                cta={cta}
                common={data?.common}
              />
            )
          }

          if (contentType === 'work') {
            return (
              <ResumeLayout
                key={id}
                className="mt-20 sm:mt-32 md:mt-24"
                cvFile={data?.work?.cvFile}
                heading={heading}
                description={description}
                experiences={data?.work?.experiences}
                cta={cta}
                common={data?.common}
              />
            )
          }

          if (contentType === 'skills') {
            return (
              <SkillsCategory
                key={id}
                className="mt-20 sm:mt-32 md:mt-24"
                skills={data?.skills}
                heading={heading}
                description={description}
                cta={cta}
                common={data?.common}
                hasFeatured
              />
            )
          }

          if (contentType === 'newsletter') {
            return (
              <NewsletterForm
                key={id}
                className="mt-20 sm:mt-32 md:mt-24"
                heading={heading}
                description={description}
                common={data?.common}
              />
            )
          }

          if (contentType === 'projects') {
            return (
              <HomeProjectsLayout
                key={id}
                className="mt-20 sm:mt-32 md:mt-24"
                heading={heading}
                cta={cta}
                common={data?.common}
              />
            )
          }

          return null
        }
      )}
    </>
  )
})

HomeApp.displayName = 'HomeApp'

export default HomeApp
