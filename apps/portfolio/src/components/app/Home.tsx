'use client'

import { FC, useId } from 'react'

import Container from '@guy-romelle-magayano/portfolio/components/Container'
import ContentLayout from '@guy-romelle-magayano/portfolio/components/layouts/Content'
import NewsletterLayout from '@guy-romelle-magayano/portfolio/components/layouts/Newsletter'
import PhotoLayout from '@guy-romelle-magayano/portfolio/components/layouts/Photo'
import ResumeLayout from '@guy-romelle-magayano/portfolio/components/layouts/Resume'
import SocialLink from '@guy-romelle-magayano/portfolio/components/links/Social'

import type { THomeData } from '@guy-romelle-magayano/portfolio/data/home'
import SocialLinksData from '@guy-romelle-magayano/portfolio/data/social-links'

import type { TCommonComponentProps } from '@guy-romelle-magayano/portfolio/types/common'
import { SharedUi } from '@guy-romelle-magayano/shared-ui'

export type THomeAppDataProps = {
  data: THomeData
}

export type THomeAppProps = TCommonComponentProps & THomeAppDataProps

/**
 * Renders the home page.
 * @param id The home page id.
 * @param data The home page data.
 * @param rest The home page props.
 * @returns The home page component.
 */
const HomeApp: FC<THomeAppProps> = ({ id, data, ...rest }) => {
  const customId = useId()
  // articles = []

  return (
    <>
      <ContentLayout
        id={id || customId}
        title={data.hero?.heading || ''}
        intro={data.hero?.description || []}
        {...rest}
      >
        <div className="mt-6 flex gap-6">
          {SocialLinksData.map((rest, index: number) => (
            <SocialLink key={index} {...rest} />
          ))}
        </div>
      </ContentLayout>
      <SharedUi />
      <PhotoLayout className="mt-16 sm:mt-20" data={data.slidePhotos || []} />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {/* {articles?.map((article, index: number) => (
              <Article key={index} {...article} />
            ))} */}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ResumeLayout
              workExperiences={data.workExperiences || []}
              cvFile={data.cvFile || ''}
              className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
            />
            <NewsletterLayout />
          </div>
        </div>
      </Container>
    </>
  )
}

export default HomeApp
