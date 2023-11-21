import { SkillsApp } from '@components/app/skills'
import SkillsData from '@data/skills'
import { Metadata } from 'next'

const { meta, ...rest } = SkillsData()

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: meta.keywords
}

/**
 * Renders the skills page
 * @param locale - The locale to use.
 * @returns The skills page component
 */
export default async function SkillsPage({
  params: { locale }
}): Promise<JSX.Element> {
  const translations = {}

  return <SkillsApp translations={translations} {...rest} />
}
