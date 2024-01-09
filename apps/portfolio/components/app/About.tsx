import { AboutData, SocialLinksData } from '@/data'

import { Container, ContentLayout, ImageLayout, SocialList } from '@/components'

import { imagePortrait } from '@/images'

/**
 * Renders the about page.
 * @returns The about page component.
 */
const AboutApp = (): JSX.Element => {
  const { hero } = AboutData()

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
            title={hero?.heading || ''}
            intro={hero?.description || []}
            layout="aside"
          />
        </div>
        <div className="lg:pl-20">
          <SocialList data={SocialLinksData} />
        </div>
      </div>
    </Container>
  )
}

export default AboutApp
