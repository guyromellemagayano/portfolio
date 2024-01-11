import { Metadata } from 'next'

import {
  AboutApp,
  ArticlesApp,
  ErrorApp,
  ProjectsApp,
  SkillsApp,
  UsesApp,
  WorkApp
} from '@/components'

import {
  AboutData,
  ArticlesData,
  ProjectsData,
  SkillsData,
  UsesData,
  WorkData
} from '@/data'

type Props = {
  params: { slug: string }
}

const { meta: skillsMeta } = SkillsData()
const { meta: workMeta } = WorkData()
const { meta: projectsMeta } = ProjectsData()
const { meta: articlesMeta } = ArticlesData()
const { meta: aboutMeta } = AboutData()
const { meta: usesMeta } = UsesData()

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug?.[0]

  switch (slug) {
    case 'skills':
      return {
        title: skillsMeta.title,
        description: skillsMeta.description,
        keywords: 'skills'
      }
    case 'work':
      return {
        title: workMeta.title,
        description: workMeta.description,
        keywords: 'work'
      }
    case 'projects':
      return {
        title: projectsMeta.title,
        description: projectsMeta.description,
        keywords: 'projects'
      }
    case 'articles':
      return {
        title: articlesMeta.title,
        description: articlesMeta.description,
        keywords: 'articles'
      }
    case 'about':
      return {
        title: aboutMeta.title,
        description: aboutMeta.description,
        keywords: 'about'
      }
    case 'uses':
      return {
        title: usesMeta.title,
        description: usesMeta.description,
        keywords: 'uses'
      }
    default:
      return {
        title: '404 Error - Page Not Found',
        description: "Sorry we couldn't find the page you're looking for.",
        keywords: ''
      }
  }
}

/**
 * Renders a dynamic page
 * @param slug - The slug of the page to render
 * @returns A dynamic page component
 */
const Page = ({ params }: Props): JSX.Element => {
  const slug = params.slug?.[0] || ''

  switch (slug) {
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
