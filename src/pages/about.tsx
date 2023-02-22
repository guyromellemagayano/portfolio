import Container from '@/components/Container'
import SocialLink from '@/components/links/Social'
import Seo from '@/components/Seo'
import AboutData from '@/data/about'
import socialLinksData from '@/data/social-links'
import portraitImage from '@/images/portrait.jpg'
import { convertStringToHTML } from '@/lib/convertValues'
import clsx from 'clsx'
import type { NextPage } from 'next'
import Image from 'next/image'

// About page
const About: NextPage = (): JSX.Element => {
  // Destrucutre the data from the AboutData function
  const { meta, hero } = AboutData()

  return (
    <>
      <Seo meta={meta} />

      <Container id="hero" className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                unoptimized
                priority
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {hero.heading}
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              {hero.description.map((paragraph, index) => {
                return (
                  <p key={index} className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
                    {convertStringToHTML(paragraph)}
                  </p>
                )
              })}
            </div>
          </div>
          <div className="lg:pl-20">
            <ul>
              {socialLinksData.map((link, index) => {
                return (
                  <li
                    key={link.url}
                    className={clsx(
                      'flex',
                      index > 0
                        ? index < socialLinksData?.length - 1
                          ? 'mt-4'
                          : 'mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40 flex'
                        : null
                    )}
                  >
                    <SocialLink key={link.url} {...link} showLabel={true} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export default About
