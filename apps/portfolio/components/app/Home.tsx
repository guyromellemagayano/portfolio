'use client'

import { ReactNode } from 'react'

import { HomeData, SocialLinksData } from '@/data'

import {
  Article,
  Container,
  ContentLayout,
  PhotoLayout,
  ResumeLayout,
  SocialLink
} from '@/components'

/**
 * Renders the home page.
 * @returns The home page component.
 */
const HomeApp = (): JSX.Element => {
  const { hero, workExperiences, cvFile, slidePhotos } = HomeData()
  const workData = {
    work: workExperiences,
    file: cvFile
  }
  const articles = []

  return (
    <>
      <ContentLayout
        id="hero"
        title={hero?.heading || ''}
        intro={hero?.description || []}
        className="mt-9 sm:mt-9"
      >
        <div className="mt-6 flex gap-6">
          {SocialLinksData?.map(link => {
            return <SocialLink key={link.url} {...link} />
          })}
        </div>
      </ContentLayout>

      <PhotoLayout data={slidePhotos} />

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles?.map(
              (
                article: JSX.IntrinsicAttributes &
                  object & { children?: ReactNode } & {
                    className?: string | undefined
                  } & { title: string; description: string; date: string } & {
                    slug: string
                  }
              ) => <Article key={article.slug} {...article} />
            )}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ResumeLayout data={workData} />
            {/* <NewsLetterLayout /> */}
          </div>
        </div>
      </Container>
    </>
  )
}

export default HomeApp
