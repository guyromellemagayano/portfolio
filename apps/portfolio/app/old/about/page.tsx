import { AboutApp } from '@components/app/about'
import AboutData from '@data/about'
import { Metadata } from 'next'

const { meta, ...rest } = AboutData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders the about page
 * @param locale - The locale to use.
 * @returns The about page component
 */
export default async function AboutPage({
  params: { locale }
}): Promise<JSX.Element> {
  const translations = {}

  return <AboutApp translations={translations} {...rest} />
}
