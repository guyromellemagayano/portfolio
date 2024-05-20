'use client'

import Image from 'next/image'

import { Div } from '@guy-romelle-magayano/react-components/server'

import {
  BaseContainer,
  ContentLayout
} from '@guy-romelle-magayano/portfolio/components'
import {
  type AboutPageData,
  type SocialLinksData
} from '@guy-romelle-magayano/portfolio/types'

export type AboutAppProps = AboutPageData & {
  social?: Array<SocialLinksData>
}

const imagePortrait = '/images/portrait.jpg'

/**
 * Renders the about page component.
 * @param {AboutAppProps} props - The props of the about page.
 * @returns The rendered about page component.
 */
const AboutApp = (props: AboutAppProps) => {
  const { hero, social } = props,
    heading = hero?.heading || undefined,
    description = hero?.description || undefined

  return (
    <BaseContainer className="mt-16 sm:mt-32">
      <Div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        {imagePortrait && imagePortrait?.length > 0 && (
          <Div className="flex w-full max-w-full justify-center lg:pl-20">
            <Div className="relative h-[32rem] w-full max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={imagePortrait}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
                fill
                priority
              />
            </Div>
          </Div>
        )}

        {heading &&
          heading?.length > 0 &&
          description &&
          ((typeof description === 'string' && description?.length > 0) ||
            (Array.isArray(description) && description?.length > 0)) && (
            <Div className="lg:order-first lg:row-span-2">
              <ContentLayout.Aside title={heading} intro={description} />
            </Div>
          )}

        {/* {Array.isArray(social) && social?.length > 0 && (
          <Div className="lg:pl-20">
            <SocialLinks data={social} />
          </Div>
        )} */}
      </Div>
    </BaseContainer>
  )
}

AboutApp.displayName = 'AboutApp'

export default AboutApp
