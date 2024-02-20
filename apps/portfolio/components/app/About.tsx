'use client'

import { FC, useId } from 'react'

import Container from '@/components/Container'
import ContentLayout from '@/components/layouts/Content'
import ImageLayout from '@/components/layouts/Image'
import SocialLinksList from '@/components/list/SocialLinks'

import SocialLinksData from '@/data/social-links'

import imagePortrait from '@/images/portrait.jpg'

import { isArrayType, isEmpty } from '@/utils/checkTypes'

import type { TCommonComponentProps, TCommonPageData } from '@/types/common'

export type TAboutDataProps = {
  data: TCommonPageData
}

export type TAboutAppProps = TCommonComponentProps & TAboutDataProps

/**
 * Renders the about page.
 * @param id The about page id.
 * @param data The about page data.
 * @param rest The about page props.
 * @returns The about page component.
 */
const AboutApp: FC<TAboutAppProps> = ({ id, data, ...rest }) => {
  const customId = useId()

  return (
    <Container id={id || customId} {...rest}>
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
        <div className="lg:pl-20">
          <div className="max-w-xs px-2.5 lg:max-w-none">
            {!isEmpty(imagePortrait) && (
              <ImageLayout
                src={imagePortrait}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl object-cover"
                priority
              />
            )}
          </div>
        </div>
        <div className="lg:order-first lg:row-span-2">
          <ContentLayout
            title={data.hero?.heading || ''}
            intro={data.hero?.description || []}
            layout="aside"
          />
        </div>
        <div className="lg:pl-20">
          {isArrayType(SocialLinksData) && !isEmpty(SocialLinksData) && (
            <SocialLinksList data={SocialLinksData} />
          )}
        </div>
      </div>
    </Container>
  )
}

export default AboutApp
