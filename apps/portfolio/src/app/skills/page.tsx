import { FC } from 'react'

import { Metadata } from 'next'

import SkillsApp from '@guy-romelle-magayano/portfolio/components/app/Skills'

import SkillsData from '@guy-romelle-magayano/portfolio/data/skills'

const data = SkillsData()

export const metadata: Metadata = {
  title: data.meta?.title || '',
  description: data.meta?.description || '',
  keywords: data.meta?.keywords || ''
}

/**
 * Renders the about page.
 * @returns The about page component.
 */
const Page: FC = async () => {
  return <SkillsApp className="mt-16 sm:mt-32" data={data} />
}

export default Page
