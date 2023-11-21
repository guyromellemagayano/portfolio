import { UsesApp } from '@components/app/uses'
import UsesData from '@data/uses'
import { Metadata } from 'next'

const { meta, ...rest } = UsesData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders the uses page
 * @param locale - The locale to use.
 * @returns The uses page component
 */
export default async function UsesPage({
  params: { locale }
}): Promise<JSX.Element> {
  const translations = {}

  return <UsesApp translations={translations} {...rest} />
}
