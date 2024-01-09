import { Suspense } from 'react'

import { useLazyLoading } from '@/hooks'

import { TSocialLinksData } from '@/data/social-links'

import { Skeleton } from '@/components'

import {
  TSkillsListCardsProps,
  TSkillsListProps,
  TToolsListCardsProps,
  TToolsListProps
} from '@/types/components'

/**
 * Renders a list of skills.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export const SkillsList = ({
  children,
  ...rest
}: TSkillsListProps): JSX.Element => {
  const SkillsListContent = useLazyLoading({
    importFunction: () => import('./SkillsContent')
  })

  return (
    <Suspense>
      <SkillsListContent {...rest}>{children}</SkillsListContent>
    </Suspense>
  )
}

/**
 * Renders a list of skills cards.
 * @param {Object} props - The props
 * @param {String} props.title - The title of the card.
 * @param {Array} props.description - The description of the card.
 * @param {Array} props.technologies - The technologies of the card.
 * @param {Array} props.cta - The call to action of the card.
 * @returns {JSX.Element} The rendered component.
 */
export const SkillsListCards = (props: TSkillsListCardsProps): JSX.Element => {
  const SkillsListCardsContent = useLazyLoading({
    importFunction: () => import('./SkillsCardsContent')
  })

  return (
    <Suspense>
      <SkillsListCardsContent {...props} />
    </Suspense>
  )
}

/**
 * Renders a list of tools.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export const ToolsList = ({
  children,
  ...rest
}: TToolsListProps): JSX.Element => {
  const ToolsListContent = useLazyLoading({
    importFunction: () => import('./ToolsContent')
  })

  return (
    <Suspense>
      <ToolsListContent {...rest}>{children}</ToolsListContent>
    </Suspense>
  )
}

/**
 * Renders a list of tools cards.
 * @param {Object} props - The props object.
 * @param {String} props.title - The title of the card.
 * @param {Array} props.description - The description of the card.
 * @returns {JSX.Element} The rendered component.
 */
export const ToolsListCards = (props: TToolsListCardsProps): JSX.Element => {
  const ToolsListCardsContent = useLazyLoading({
    importFunction: () => import('./ToolsCardsContent')
  })

  return (
    <Suspense>
      <ToolsListCardsContent {...props} />
    </Suspense>
  )
}

/**
 * Renders a list of articles.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export const ArticlesList = ({
  children,
  ...rest
}: TToolsListProps): JSX.Element => {
  const ArticlesListContent = useLazyLoading({
    importFunction: () => import('./ArticlesContent')
  })

  return (
    <Suspense>
      <ArticlesListContent {...rest}>{children}</ArticlesListContent>
    </Suspense>
  )
}

/**
 * Renders a list of articles cards.
 * @param {Object} props - The props object.
 * @param {String} props.slug - The article slug.
 * @param {String} props.title - The article title.
 * @param {String} props.date - The article date.
 * @param {String} props.description - The article description.
 * @returns {JSX.Element} The rendered component.
 */
export const ArticlesListCards = (props: TToolsListCardsProps): JSX.Element => {
  const ArticlesListCardsContent = useLazyLoading({
    importFunction: () => import('./ArticleCardsContent')
  })

  return (
    <Suspense>
      <ArticlesListCardsContent {...props} />
    </Suspense>
  )
}

/**
 * Renders a list of projects.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export const ProjectsList = ({
  children,
  ...rest
}: TToolsListProps): JSX.Element => {
  const ProjectsListContent = useLazyLoading({
    importFunction: () => import('./ProjectsContent')
  })

  return (
    <Suspense>
      <ProjectsListContent {...rest}>{children}</ProjectsListContent>
    </Suspense>
  )
}

/**
 * Renders a list of projects cards.
 * @param {Object} props - The props object.
 * @param {String} props.name - The project name.
 * @param {String} props.link - The project link.
 * @param {String} props.logo - The project logo.
 * @param {String} props.description - The project description.
 * @returns {JSX.Element} The rendered component.
 */
export const ProjectsListCards = (props: TToolsListCardsProps): JSX.Element => {
  const ProjectsListCardsContent = useLazyLoading({
    importFunction: () => import('./ProjectCardsContent')
  })

  return (
    <Suspense>
      <ProjectsListCardsContent {...props} />
    </Suspense>
  )
}

/**
 * Renders a list of work experiences.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export const WorkList = ({
  children,
  ...rest
}: TToolsListProps): JSX.Element => {
  const WorkListContent = useLazyLoading({
    importFunction: () => import('./WorkContent')
  })

  return (
    <Suspense>
      <WorkListContent {...rest}>{children}</WorkListContent>
    </Suspense>
  )
}

/**
 * Renders a list of work experiences cards.
 * @param {Object} props - The props object.
 * @param {String} props.company - The company name.
 * @param {String} props.country - The country name.
 * @param {Array} props.contributions - The contributions of the card.
 * @returns {JSX.Element} The rendered component.
 */
export const WorkListCards = (props: TToolsListCardsProps): JSX.Element => {
  const WorkListCardsContent = useLazyLoading({
    importFunction: () => import('./WorkCardsContent')
  })

  return (
    <Suspense>
      <WorkListCardsContent {...props} />
    </Suspense>
  )
}

/**
 * Renders a list of social links.
 * @param props - The props object.
 * @param props.url - The url of the social link.
 * @param props.icon - The icon of the social link.
 * @param props.ariaLabel - The aria label of the social link.
 * @returns {JSX.Element} The rendered component.
 */
export const SocialList = (props: {
  data: TSocialLinksData[]
}): JSX.Element | null => {
  const SocialListContent = useLazyLoading({
    importFunction: () => import('./SocialContent')
  })

  return (
    <Suspense fallback={<Skeleton.SocialList />}>
      <SocialListContent {...props} />
    </Suspense>
  )
}
