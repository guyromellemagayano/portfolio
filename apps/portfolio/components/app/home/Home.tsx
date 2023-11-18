'use client'

import Article from '@components/Article'
import Container from '@components/Container'
import {
  NewsLetterLayout,
  PhotoLayout,
  ResumeLayout
} from '@components/layouts'
import SocialLink from '@components/links/Social'
import HomeData from '@data/home'
import socialLinksData from '@data/social-links'
import { TBaseCommonAppComponentProps } from 'types/common'

const { hero, slidePhotos, cvFile, workExperiences } = HomeData()
const resumeData = {
  work: workExperiences,
  file: cvFile
}

/**
 * Renders the home page.
 * @param translations - The translations to use.
 * @param articles - The articles to display.
 * @returns The home page component.
 */
export default function HomeApp({
  translations,
  articles
}: TBaseCommonAppComponentProps): JSX.Element {
  return (
    <>
      <Container id="hero" className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {hero.heading}
          </h1>
          <p className="mt-6 text-base space-y-7 text-zinc-600 dark:text-zinc-400">
            {hero.description.map((paragraph, index) => {
              return (
                <span key={index} className="space-y-7">
                  {paragraph}
                </span>
              )
            })}
          </p>
          <div className="mt-6 flex gap-6">
            {socialLinksData.map(link => {
              return <SocialLink key={link.url} {...link} />
            })}
          </div>
        </div>
      </Container>

      <PhotoLayout data={slidePhotos} />

      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles?.map(article => (
              <Article key={article.slug} {...article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <ResumeLayout data={resumeData} />
            <NewsLetterLayout />
          </div>
        </div>
      </Container>
    </>
  )
}
