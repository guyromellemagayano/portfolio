import ArticlesData from '@/data/articles'
import { Feed } from 'feed'
import { mkdir, writeFile } from 'fs/promises'
import ReactDOMServer from 'react-dom/server'
import { getAllArticles } from './getAllArticles'

// This function is used to generate the RSS feed
export const generateRssFeed = async (): Promise<void> => {
  const { meta } = ArticlesData()

  const articles = await getAllArticles()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const author = {
    name: process.env.NEXT_PUBLIC_SITE_AUTHOR_NAME,
    email: process.env.NEXT_PUBLIC_SITE_AUTHOR_EMAIL,
  }

  const feed = new Feed({
    title: meta.title,
    description: meta.description,
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  })

  for (const article of articles) {
    const url = `${siteUrl}/articles/${article.meta.slug}`
    const html = ReactDOMServer.renderToStaticMarkup(article.component({ isRssFeed: true }))

    feed.addItem({
      title: article.meta.title,
      id: url,
      link: url,
      description: article.meta.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(article.meta.date),
    })
  }

  await mkdir('./public/rss', { recursive: true })
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8'),
  ])
}
