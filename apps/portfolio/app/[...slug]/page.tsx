import { AboutApp } from '@components/app/about'
import { ArticlesApp } from '@components/app/articles'
import HomeApp from '@components/app/home/Home'
import { ProjectsApp } from '@components/app/projects'
import { SkillsApp } from '@components/app/skills'
import { UsesApp } from '@components/app/uses'
import { WorkApp } from '@components/app/work'
import { NEXT_CMS_WORDPRESS_URL } from '@configs/env'
import AboutData from '@data/about'
import ArticlesData from '@data/articles'
import ProjectsData from '@data/projects'
import SkillsData from '@data/skills'
import UsesData from '@data/uses'
import WorkData from '@data/work'
import { Metadata } from 'next'

type Props = {
  params: { slug: string[] }
  searchParams: { [key: string]: string | string[] | undefined }
}

function arrayToUrlSlug(array: string[]): string {
  const slugArray = array.map(item =>
    item.toLowerCase().replace(/[\s\W-]+/g, '/')
  )

  return slugArray.join('-')
}

export async function generateMetadata({
  params,
  searchParams
}: Props): Promise<Metadata> {
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
    .then(res => res.data.page.seo)

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
export default function Page({ params, searchParams }: Props): JSX.Element {
  let pageComponent: JSX.Element

  const articles = []
  const translations = {}

  switch (params.slug[0]) {
    case 'skills': {
      const { ...rest } = SkillsData()
      pageComponent = <SkillsApp {...rest} />
      return pageComponent
    }

    case 'work': {
      const { ...rest } = WorkData()
      pageComponent = <WorkApp {...rest} />
      return pageComponent
    }

    case 'projects': {
      const { ...rest } = ProjectsData()
      pageComponent = <ProjectsApp {...rest} />
      return pageComponent
    }

    case 'articles': {
      const { ...rest } = ArticlesData()
      pageComponent = <ArticlesApp {...rest} />
      return pageComponent
    }

    case 'about': {
      const { ...rest } = AboutData()
      pageComponent = <AboutApp {...rest} />
      return pageComponent
    }

    case 'uses': {
      const { ...rest } = UsesData()
      pageComponent = <UsesApp {...rest} />
      return pageComponent
    }

    default:
      break
  }

  return <HomeApp translations={translations} articles={articles} />
}
