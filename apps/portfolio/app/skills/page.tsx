import { Metadata } from 'next'

import SkillsApp from '@/components/app/Skills'

import SkillsData from '@/data/skills'

const data = SkillsData()

export const metadata: Metadata = {
  title: data?.meta?.title || '',
  description: data?.meta?.description || '',
  keywords: data?.meta?.keywords || ''
}

/**
 * Renders the about page.
 * @returns The about page component.
 */
const Page = async (): Promise<JSX.Element> => {
  return <SkillsApp {...data} />
}

export default Page
