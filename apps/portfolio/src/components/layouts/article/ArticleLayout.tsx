'use client'

import { forwardRef, memo, useContext } from 'react'

import { useRouter } from 'next/navigation'

import { Button } from '@guy-romelle-magayano/react-components'
import {
  Article,
  Div,
  Header,
  Heading,
  Span,
  Time,
  type DivisionProps,
  type DivisionRef
} from '@guy-romelle-magayano/react-components/server'

import { cn, formatDate } from '@guy-romelle-magayano/react-utils'

import { AppContext } from '@guy-romelle-magayano/portfolio/app/providers'
import {
  ArrowLeftSvg,
  BaseContainer,
  Article as HomeArticleLayout,
  Prose
} from '@guy-romelle-magayano/portfolio/components'
import { type ArticlesData } from '@guy-romelle-magayano/portfolio/types'

export type ArticleLayoutRef = DivisionRef
export type ArticleLayoutProps = DivisionProps & {
  article?: ArticleLayoutArticleData
  articles?: Array<ArticlesData>
  isHome?: boolean
}
export type ArticleLayoutArticleData = Pick<
  ArticlesData,
  'title' | 'date' | 'description'
>

const strings = {
  goBack: 'Go back to articles'
}

/**
 * Renders the article layout component.
 * @param {ArticleLayoutProps} props - The props of the article layout.
 * @param {ArticleLayoutRef} ref - The reference of the article layout.
 * @returns The rendered article layout component.
 */
const ArticleLayout = memo(
  forwardRef<ArticleLayoutRef, ArticleLayoutProps>(
    (
      { article, articles, isHome = false, children, className, ...rest },
      ref
    ) => {
      const router = useRouter(),
        { previousPathname } = useContext(AppContext)

      const dateNow = new Date(),
        dateNowToString = dateNow.toISOString(),
        title = article?.title || '',
        date = article?.date || dateNowToString

      if (isHome && articles && articles?.length > 0 && !article) {
        return (
          <Div className="flex flex-col gap-16">
            {articles
              .map((article, index: number) => (
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
          {...rest}
          ref={ref}
          className={cn('mt-16 lg:mt-32', className)}
        >
          <Div className="xl:relative">
            <Div className="mx-auto w-full max-w-2xl">
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
                <Header className="flex flex-col">
                  {title && title?.length > 0 && (
                    <Heading
                      as="h1"
                      className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                    >
                      {title}
                    </Heading>
                  )}

                  {date && date?.length > 0 && (
                    <Time
                      dateTime={date}
                      className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                    >
                      <Span>{formatDate(date)}</Span>
                    </Time>
                  )}
                </Header>

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
)

ArticleLayout.displayName = 'ArticleLayout'

export default ArticleLayout
