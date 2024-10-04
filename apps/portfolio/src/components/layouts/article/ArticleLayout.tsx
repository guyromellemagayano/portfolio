'use client'

import { forwardRef, memo, useContext } from 'react'

import { useRouter } from 'next/navigation'

import {
  Article,
  Button,
  Div,
  Header,
  Heading,
  Span,
  Time,
  type TDivisionProps,
  type TDivisionRef
} from '@react-components'

import { cn, formatDate } from '@react-utils'

import { AppContext } from '@portfolio/app/providers'
import {
  ArrowLeftSvg,
  BaseContainer,
  Article as HomeArticleLayout,
  Prose
} from '@portfolio/components'
import type { TArticlesData } from '@portfolio/types'

export type ArticleLayoutRef = TDivisionRef
export type ArticleLayoutProps = TDivisionProps & {
  article?: ArticleLayoutArticleData
  articles?: Array<TArticlesData>
  isHome?: boolean
}
export type ArticleLayoutArticleData = Pick<
  TArticlesData,
  'title' | 'date' | 'description'
>

const strings = {
  goBack: 'Go back to articles'
}

/**
 * Renders the article layout component.
 * @param {ArticleLayoutProps} props - The component props
 * @param {ArticleLayoutRef} ref - The component reference
 * @returns The rendered article layout component
 */
const ArticleLayout = memo(
  forwardRef<ArticleLayoutRef, ArticleLayoutProps>(
    (
      { article, articles, isHome = false, children, className, ...rest },
      ref
    ) => {
      const router = useRouter()
      const { previousPathname } = useContext(AppContext)

      if (!article && !articles) return null

      const dateNow = new Date()
      const dateNowToString = dateNow.toISOString()
      const title = article?.title || ''
      const date = article?.date || dateNowToString

      if (isHome && articles && !article) {
        return (
          <Div className={cn('flex flex-col gap-16')}>
            {articles
              .map((article, index: number) => (
                <HomeArticleLayout
                  className={cn('inset-y-6')}
                  key={index}
                  {...article}
                />
              ))
              .slice(0, 4)}
          </Div>
        )
      }

      return (
        <BaseContainer
          ref={ref}
          className={cn('mt-16 lg:mt-32', className)}
          {...rest}
        >
          <Div className={cn('xl:relative')}>
            <Div className={cn('mx-auto w-full max-w-2xl')}>
              {previousPathname && (
                <Button
                  type="button"
                  onClick={() => router.back()}
                  className={cn(
                    'group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20'
                  )}
                  aria-label={strings.goBack}
                >
                  <ArrowLeftSvg
                    className={cn(
                      'group-hover:stroke-zinc-400:is(.dark *) h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500'
                    )}
                  />
                </Button>
              )}

              <Article>
                <Header className={cn('flex flex-col')}>
                  {title && (
                    <Heading
                      as="h1"
                      className={cn(
                        'mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100'
                      )}
                    >
                      {title}
                    </Heading>
                  )}

                  {date && (
                    <Time
                      className={cn(
                        'order-first flex items-center text-base text-zinc-400 dark:text-zinc-500'
                      )}
                      dateTime={date}
                    >
                      <Span>{formatDate(date)}</Span>
                    </Time>
                  )}
                </Header>

                {children && (
                  <Prose data-mdx-content className={cn('mt-8')}>
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
