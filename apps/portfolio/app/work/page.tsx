import { WorkApp } from '@components/app/work'
import WorkData from '@data/work'
import { Metadata } from 'next'

const { meta, ...rest } = WorkData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders the work page
 * @param locale - The locale to use.
 * @returns The work page component
 */
export default async function WorkPage({
  params: { locale }
}): Promise<JSX.Element> {
  const translations = {}

  return <WorkApp translations={translations} {...rest} />
}
