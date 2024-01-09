import { Metadata } from 'next'

import { NEXT_CMS_WORDPRESS_URL } from '@/configs/env'

import {
  AboutApp,
  ArticlesApp,
  ErrorApp,
  ProjectsApp,
  SkillsApp,
  UsesApp,
  WorkApp
} from '@/components'

import { arrayToUrlSlug } from '@/lib'

type Props = {
  params: { slug: string[] }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug

  const seo: {
    title: string
    metaDesc: string
    focuskw: string
  } = await fetch(NEXT_CMS_WORDPRESS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
        query fetchPage($slug: ID!) {
          page(id: $slug, idType: URI) {
            seo {
              canonical
              cornerstone
              metaDesc
              focuskw
              metaDesc
              metaKeywords
              metaRobotsNofollow
              metaRobotsNoindex
              opengraphAuthor
              opengraphDescription
              opengraphModifiedTime
              opengraphPublishedTime
              opengraphPublisher
              opengraphSiteName
              opengraphTitle
              opengraphType
              opengraphUrl
              readingTime
              title
              twitterDescription
              twitterTitle
              schema {
                articleType
                pageType
                raw
              }
            }
          }
        }
      `,
      variables: {
        slug: arrayToUrlSlug(slug)
      }
    })
  })
    .then(res => res.json())
    .then(res => res?.data?.page?.seo || {})

  return {
    title: seo.title || '',
    description: seo.metaDesc || '',
    keywords: seo.focuskw || ''
  }
}

/**
 * Renders a dynamic page
 * @param slug - The slug of the page to render
 * @returns A dynamic page component
 */
const Page = ({ params }: Props): JSX.Element => {
  switch (params.slug[0]) {
    case 'skills':
      return <SkillsApp />
    case 'work':
      return <WorkApp />
    case 'projects':
      return <ProjectsApp />
    case 'articles':
      return <ArticlesApp />
    case 'about':
      return <AboutApp />
    case 'uses':
      return <UsesApp />
    default:
      return (
        <ErrorApp
          statusCode={404}
          heading="Page not found"
          message="Sorry, we couldn’t find the page you’re looking for."
        />
      )
  }
}

export default Page
