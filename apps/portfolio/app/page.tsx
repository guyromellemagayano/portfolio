import HomeApp from '@components/app/home/Home'
import HomeData from '@data/home'
import { getAllArticles } from '@lib/articles'
import { Metadata } from 'next'

const { meta } = HomeData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders the Home page
 * @param locale - The locale to use.
 * @returns The Home page component
 */
export default async function HomePage({
  params: { locale }
}): Promise<JSX.Element> {
  // const { t } = await translate(locale, ['home'])

  // const translations = {
  //   title: t('title'),
  //   description: t('description')
  // }

  const articles = await getAllArticles()
  const translations = {}

  return <HomeApp translations={translations} articles={articles} />
}
