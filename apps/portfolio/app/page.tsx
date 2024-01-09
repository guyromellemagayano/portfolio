import { Metadata } from 'next'

import { HomeData } from '@/data'

import { HomeApp } from '@/components'

// import { getAllArticles } from '@/lib/articles'

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
  return <HomeApp />
}
