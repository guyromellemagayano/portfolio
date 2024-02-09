'use client'

import { ReactNode } from 'react'

import Article, { TArticleProps } from '@/components/Article'
import Container from '@/components/Container'
import ContentLayout from '@/components/layouts/Content'
import NewsletterLayout from '@/components/layouts/Newsletter'
import PhotoLayout from '@/components/layouts/Photo'
import ResumeLayout from '@/components/layouts/Resume'
import SocialLink from '@/components/links/Social'

import type { THomeData } from '@/data/home'
import SocialLinksData from '@/data/social-links'

import type { TWithClassName } from '@/types/common'

type THomeApp = (data: THomeData) => ReactNode

/**
 * Renders the home page.
 * @param data The home page data.
 * @returns The home page component.
 */
const HomeApp: THomeApp = data => {
  const hero = data?.hero || {},
    slidePhotos = data?.slidePhotos || [],
    articles = []

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
            const url = link?.url || ''

            return <SocialLink key={url} {...link} />
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
                  object & { children?: ReactNode } & TWithClassName &
                  TArticleProps & {
                    slug: string
                  }
              ) => <Article key={article.slug} {...article} />
            )}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ResumeLayout {...data} />
            <NewsletterLayout />
          </div>
        </div>
      </Container>
    </>
  )
}

export default HomeApp
