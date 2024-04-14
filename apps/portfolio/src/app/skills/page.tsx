import { Metadata } from 'next'

import { SkillsApp } from '@guy-romelle-magayano/portfolio/components/Apps/Skills'
import {
  skillsAppData,
  skillsPageData
} from '@guy-romelle-magayano/portfolio/utils/server'

/**
 * Generates the metadata for the home page.
 * @returns The metadata for the home page.
 */
export const generateMetadata = async (): Promise<Metadata> => {
  const { meta } = await skillsPageData()

  return {
    title: meta?.title || '',
    description: meta?.description || '',
    keywords: meta?.keywords || ''
  }
}

/**
 * Renders the home page.
 * @returns The home page component.
 */
const Page = async () => {
  const data = await skillsAppData()

  return <SkillsApp {...data} />
}

export default Page
