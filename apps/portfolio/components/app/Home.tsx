'use client'

import { FC, useId } from 'react'

import Container from '@/components/Container'
import ContentLayout from '@/components/layouts/Content'
import NewsletterLayout from '@/components/layouts/Newsletter'
import PhotoLayout from '@/components/layouts/Photo'
import ResumeLayout from '@/components/layouts/Resume'
import SocialLink from '@/components/links/Social'

import type { THomeData } from '@/data/home'
import SocialLinksData from '@/data/social-links'

import type { TCommonComponentProps } from '@/types/common'

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
        title={data?.hero?.heading || ''}
        intro={data?.hero?.description || []}
        {...rest}
      >
        <div className="mt-6 flex gap-6">
          {SocialLinksData?.map((rest, index) => (
            <SocialLink key={index} {...rest} />
          ))}
        </div>
      </ContentLayout>
      <PhotoLayout className="mt-16 sm:mt-20" data={data?.slidePhotos || []} />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {/* {articles?.map((article, index) => (
              <Article key={index} {...article} />
            ))} */}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ResumeLayout
              workExperiences={data?.workExperiences || []}
              cvFile={data?.cvFile || ''}
            />
            <NewsletterLayout />
          </div>
        </div>
      </Container>
    </>
  )
}

export default HomeApp
