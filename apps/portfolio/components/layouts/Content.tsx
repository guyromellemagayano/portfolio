'use client'

import { ElementType, FC, useId } from 'react'

import { clsx } from 'clsx'
import { usePathname } from 'next/navigation'

import Container from '@/components/Container'

import { isArrayType, isEmpty, isStringType } from '@/utils/checkTypes'

import type {
  TCommonComponentReturnType,
  TContainerProps
} from '@/types/common'

export type TContentLayoutProps = TContainerProps & {
  as?: ElementType
  title?: string
  intro?: string[] | string
  layout?: 'simple' | 'aside'
}

/**
 * Renders the content layout.
 * @param as - The component type.
 * @param children - The children of the content.
 * @param layout - The layout of the content.
 * @param rest - The rest of the props of the content.
 * @returns The content layout component.
 */
const ContentLayout: FC<TContentLayoutProps> = ({
  as: Component = 'div',
  children,
  layout = 'simple',
  ...rest
}) => {
  let render: TCommonComponentReturnType = null

  if (layout === 'aside') {
    render = <ContentAside {...rest}>{children}</ContentAside>
  } else {
    render = <ContentSimple {...rest}>{children}</ContentSimple>
  }

  return <Component>{render}</Component>
}

/**
 * Renders the simple layout content.
 * @param title - The title of the content.
 * @param intro - The intro of the content.
 * @param id - The id of the content.
 * @param className - The class name of the content.
 * @param children - The children of the content.
 * @param rest - The rest of the props of the content.
 * @returns The simple layout content component.
 */
const ContentSimple: FC<TContentLayoutProps> = ({
  title,
  intro,
  id,
  className,
  children,
  ...rest
}) => {
  const pathname = usePathname(),
    customId = useId()

  return (
    <Container id={id || customId} {...rest}>
      <div className="max-w-2xl">
        {isStringType(title) && title?.length > 0 && (
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {title}
          </h1>
        )}

        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          {isArrayType(intro) && intro?.length > 0
            ? intro.map((paragraph: string, index) => {
                return (
                  <span key={index} className="space-y-7">
                    {paragraph}
                  </span>
                )
              })
            : intro}
        </p>
      </div>
      <div className={clsx(pathname !== '/' && 'mt-16 sm:mt-20', className)}>
        {children}
      </div>
    </Container>
  )
}

/**
 * Renders the aside layout content.
 * @param title - The title of the content.
 * @param intro - The intro of the content.
 * @param id - The id of the content.
 * @param className - The class name of the content.
 * @param children - The children of the content.
 * @param rest - The rest of the props of the content.
 * @returns The aside layout content component.
 */
const ContentAside: FC<TContentLayoutProps> = ({
  title,
  intro,
  id,
  className,
  children,
  ...rest
}) => {
  const customId = useId()

  return (
    <aside id={id || customId} {...rest}>
      {isStringType(title) && !isEmpty(title) && (
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
      )}

      <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
        {isArrayType(intro) && !isEmpty(intro)
          ? intro.map((paragraph: string, index) => {
              return (
                <span key={index} className="space-y-7">
                  {paragraph}
                </span>
              )
            })
          : intro}
      </p>
      <div className={clsx('mt-16 sm:mt-20', className)}>{children}</div>
    </aside>
  )
}

export default ContentLayout
