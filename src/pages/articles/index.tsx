/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArticlesList, ArticlesListCards } from '@/components/List'
import Seo from '@/components/Seo'
import SimpleLayout from '@/components/SimpleLayout'
import ArticlesData from '@/data/articles'
import { IArticlesProps } from '@/interfaces/pages'
import { getAllArticles } from '@/lib/getAllArticles'
import type { NextPage } from 'next'

// Articles page
const Articles: NextPage = ({ articles }: IArticlesProps): JSX.Element => {
  // Destructure the data from ArticlesData function
  const { meta, hero } = ArticlesData()

  return (
    <>
      <Seo meta={meta} />

      <SimpleLayout id="hero" title={hero.heading} intro={hero.description}>
        <ArticlesList>
          {articles?.map((article, index) => (
            <ArticlesListCards key={index} {...article} />
          ))}
        </ArticlesList>
      </SimpleLayout>
    </>
  )
}

export const getStaticProps = async (): Promise<object> => {
  return {
    props: {
      articles: (await getAllArticles()).map(({ component, ...meta }) => meta),
    },
  }
}

export default Articles
