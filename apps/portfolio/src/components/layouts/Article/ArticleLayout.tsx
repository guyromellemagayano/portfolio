'use client'

import { forwardRef, useContext } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@guy-romelle-magayano/react-components'
import {
  Article,
  Div,
  DivisionProps,
  DivisionRef,
  Header,
  Heading,
  Span,
  Time
} from '@guy-romelle-magayano/react-components/server'

import { cn, formatDate } from '@guy-romelle-magayano/react-utils'

import { AppContext } from '@guy-romelle-magayano/portfolio/app/providers'
import { Article as HomeArticleLayout } from '@guy-romelle-magayano/portfolio/components/Article'
import { BaseContainer } from '@guy-romelle-magayano/portfolio/components/Containers/Base'
import { Prose } from '@guy-romelle-magayano/portfolio/components/Prose'
import { ArrowLeftSvg } from '@guy-romelle-magayano/portfolio/components/SVG'
import { ArticlesData } from '@guy-romelle-magayano/portfolio/types/data'

export type ArticleLayoutRef = DivisionRef
export type ArticleLayoutProps = DivisionProps & {
  article?: ArticleProps
  articles?: Array<ArticlesData>
  isHome?: boolean
}
export type ArticleProps = Pick<ArticlesData, 'title' | 'date' | 'description'>

/**
 * Renders the article layout component.
 * @param article - The article to display.
 * @param articles - The articles to display.
 * @param [isHome=false] - Whether the article is on the home page.
 * @param children - The children of the article layout.
 * @param className - The class name of the article layout.
 * @param rest - The rest of the props of the article layout.
 * @returns The rendered article layout component.
 */
const ArticleLayout = forwardRef<ArticleLayoutRef, ArticleLayoutProps>(
  (
    { article, articles, isHome = false, children, className, ...rest },
    ref
  ) => {
    const router = useRouter(),
      { previousPathname } = useContext(AppContext),
      dateNow = new Date(),
      dateNowToString = dateNow.toISOString(),
      strings = {
        goBack: 'Go back to articles'
      }

    let title: string = article?.title || '',
      date: string = article?.date || dateNowToString

    if (isHome && articles && !article) {
      return (
        <Div className="flex flex-col gap-16">
          {articles
            ?.map((article, index: number) => (
              <HomeArticleLayout
                key={index}
                className="inset-y-6"
                {...article}
              />
            ))
            ?.slice(0, 4)}
        </Div>
      )
    }

    return (
      <BaseContainer
        ref={ref}
        {...rest}
        className={cn('mt-16 lg:mt-32', className)}
      >
        <Div className="xl:relative">
          <Div className="mx-auto max-w-2xl">
            {previousPathname && (
              <Button
                type="button"
                onClick={() => router.back()}
                aria-label={strings.goBack}
                className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
              >
                <ArrowLeftSvg className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
              </Button>
            )}

            <Article>
              {title && date && (
                <Header className="flex flex-col">
                  <Heading
                    as="h1"
                    className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                  >
                    {title}
                  </Heading>
                  <Time
                    dateTime={date}
                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                  >
                    <Span>{formatDate(date)}</Span>
                  </Time>
                </Header>
              )}

              {children && (
                <Prose className="mt-8" data-mdx-content>
                  {children}
                </Prose>
              )}
            </Article>
          </Div>
        </Div>
      </BaseContainer>
    )
  }
)

export default ArticleLayout
