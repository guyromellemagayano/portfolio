'use client'

import { useContentfulLiveUpdates } from '@contentful/live-preview/react'
import Head from 'next/head'

import { Meta, Title } from '@guy-romelle-magayano/react-components/server'

import {
  PageCtfComponentFeature,
  PageErrorFeature,
  useCtfPageQuery
} from '@guy-romelle-magayano/coin-colorful/components'
import { CONTENTFUL_CONFIG } from '@guy-romelle-magayano/coin-colorful/configs'
import { useContentfulContext } from '@guy-romelle-magayano/coin-colorful/hooks'
import { tryGet } from '@guy-romelle-magayano/coin-colorful/libs'

export type PageGqlCtfComponentFeatureProps = {
  topic?: string
  slug: string
}

/**
 * Renders the page `graphql` feature component for the `contentful` API to consume.
 * @param {PageGqlCtfComponentFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const PageGqlCtfComponentFeature = (props: PageGqlCtfComponentFeatureProps) => {
  const { slug: slugFromProps } = props

  const slug = !slugFromProps || slugFromProps === '/' ? 'home' : slugFromProps

  const { previewActive, locale } = useContentfulContext(),
    { isLoading, data } = useCtfPageQuery({
      slug,
      locale,
      preview: previewActive
    }),
    page = useContentfulLiveUpdates(
      data?.pageCollection?.items && data?.pageCollection?.items?.length > 0
        ? tryGet(() => data?.pageCollection!.items[0])
        : null
    )

  if (isLoading) return <></>

  if (!page) {
    const error = {
      code: 404,
      message:
        'We were not able to locate the content you were looking for, please check the url for possible typos'
    }

    return <PageErrorFeature error={error} />
  }

  const { seo } = page || {},
    metaTags = {
      title: seo?.title ?? page?.pageName,
      description: seo?.description,
      image: seo?.image,
      no_index: seo?.noIndex,
      no_follow: seo?.noFollow
    },
    robots = [
      metaTags.no_index === true ? 'noindex' : undefined,
      metaTags.no_follow === true ? 'nofollow' : undefined
    ].filter((x): x is string => x !== undefined)

  return (
    <>
      <Head>
        {metaTags.title && metaTags.title?.length > 0 && (
          <>
            <Title key="title">{metaTags.title}</Title>
            <Meta key="og:title" property="og:title" content={metaTags.title} />
          </>
        )}

        {metaTags.description && metaTags.description?.length > 0 && (
          <>
            <Meta
              key="description"
              name="description"
              content={metaTags.description}
            />
            <Meta
              key="og:description"
              property="og:description"
              content={metaTags.description}
            />
          </>
        )}

        {robots && robots?.length > 0 && (
          <Meta key="robots" name="robots" content={robots.join(', ')} />
        )}

        {metaTags.image && Object.keys(metaTags.image)?.length > 0 && (
          <Meta
            key="og:image"
            property="og:image"
            content={`${metaTags.image.url}?w=1200&h=630&f=faces&fit=fill`}
          />
        )}

        {page?.slug && page?.slug?.length > 0 && (
          <Meta
            key="og:url"
            property="og:url"
            content={`${CONTENTFUL_CONFIG.meta.url}/${page.slug === 'home' ? '' : `/${page.slug}`}`}
          />
        )}

        <Meta key="og:locale" property="og:locale" content={locale} />
      </Head>

      {page && Object.keys(page)?.length > 0 && (
        <PageCtfComponentFeature {...page} />
      )}
    </>
  )
}

PageGqlCtfComponentFeature.displayName = 'PageGqlCtfComponentFeature'

export default PageGqlCtfComponentFeature
