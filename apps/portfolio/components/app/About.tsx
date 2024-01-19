'use client'

import Container from '@/components/Container'
import ContentLayout from '@/components/layouts/Content'
import ImageLayout from '@/components/layouts/Image'
import SocialLinksList from '@/components/list/SocialLinks'

import type { TAboutData } from '@/data/about'
import SocialLinksData from '@/data/social-links'

import imagePortrait from '@/images/portrait.jpg'

/**
 * Renders the about page.
 * @returns The about page component.
 */
const AboutApp = (data: TAboutData): JSX.Element => {
  const heading = data?.hero?.heading || ''
  const description = data?.hero?.description || []

  return (
    <Container id="hero" className="mt-16 sm:mt-32">
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            <ImageLayout
              src={imagePortrait}
              alt=""
              sizes="(min-width: 1024px) 32rem, 20rem"
              className="aspect-square rotate-3 rounded-2xl object-cover"
              priority
            />
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <ContentLayout
            title={heading}
            intro={description}
            layout="aside"
          />
        </div>
        <div className="lg:pl-20">
          <SocialLinksList data={SocialLinksData} />
        </div>
      </div>
    </Container>
  )
}

export default AboutApp
