import HomeApp from '@components/app/home/Home'
import HomeData from '@data/home'
// import { getAllArticles } from '@lib/articles'
import { Metadata } from 'next'

const { meta } = HomeData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders a dynamic page
 * @param slug - The slug of the page to render
 * @returns A dynamic page component
 */
export default async function Page({
  params
}: {
  params: { slug: string }
}): Promise<JSX.Element> {
  const articles = []
  const translations = {}

  return <HomeApp translations={translations} articles={articles} />
}
