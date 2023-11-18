'use client'

import { isEmpty } from '@lib/checkTypes'
import { formatDate } from '@lib/formatDate'
import Image from 'next/image'
import {
  TArticleProps,
  TProjectListCardProps,
  TProjectListProps,
  TSkillsListCardsProps,
  TSkillsListProps,
  TToolsListCardsProps,
  TToolsListProps,
  TWithChildren,
  TWorkListCardProps,
  TWorkListProps
} from 'types/components'

import Card from './Card'
import { LinkSvgImage } from './images/svg'
import Section from './layouts/Section'

/**
 * Renders a list of skills.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export function SkillsList({
  children,
  title,
  ...rest
}: TSkillsListProps): JSX.Element {
  return (
    <Section title={title} {...rest}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

/**
 * Renders a list of skills cards.
 * @param {String} title - The title of the card.
 * @param {Array} description - The description of the card.
 * @param {Array} technologies - The technologies of the card.
 * @param {Array} cta - The call to action of the card.
 * @returns {JSX.Element} The rendered component.
 */
export function SkillsListCards({
  title,
  description,
  technologies,
  cta
}: TSkillsListCardsProps): JSX.Element {
  return (
    <Card as="article">
      <Card.Title as="h3" title={title}>
        {title}
      </Card.Title>

      {!isEmpty(description) &&
        description?.map(text => (
          <Card.Description key={text}>{text}</Card.Description>
        ))}

      {!isEmpty(technologies) && (
        <div className="flex flex-row items-start gap-x-6 my-2">
          <Card.Eyebrow
            as="h4"
            className="text-rose-400 dark:text-rose-500 text-base"
          >
            Technologies
          </Card.Eyebrow>

          <Card.Eyebrow
            as="ul"
            className="flex-wrap gap-x-4 text-zinc-400 dark:text-zinc-500"
          >
            {technologies?.map(({ name, link }) => (
              <li key={name}>
                <a
                  href={link}
                  className="hover:text-amber-500 dark:hover:text-amber-400 transition"
                  target="_blank"
                  rel="noreferrer"
                >
                  {name}
                </a>
              </li>
            ))}
          </Card.Eyebrow>
        </div>
      )}

      {!isEmpty(cta) && (
        <span className="flex items-start gap-x-4">
          {cta?.map(item => {
            const projectCtaText = 'See projects'

            !isEmpty(item.projects) && (item.text = projectCtaText)

            return (
              !isEmpty(item.projects) && (
                <Card.Cta key={item.text} title={item.text}>
                  {item.text}
                </Card.Cta>
              )
            )
          })}
        </span>
      )}
    </Card>
  )
}

/**
 * Renders a list of tools.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export function ToolsList({ children, ...rest }: TToolsListProps): JSX.Element {
  return (
    <Section {...rest}>
      <ul className="space-y-16">{children}</ul>
    </Section>
  )
}

/**
 * Renders a list of tools cards.
 * @param {String} title - The title of the card.
 * @param {Array} description - The description of the card.
 * @returns {JSX.Element} The rendered component.
 */
export function ToolsListCards({
  title,
  description
}: TToolsListCardsProps): JSX.Element {
  return (
    <Card as="li">
      <Card.Title as="h3">{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
    </Card>
  )
}

/**
 * Renders a list of articles.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export function ArticlesList({ children }: TWithChildren): JSX.Element {
  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-3xl flex-col space-y-16">{children}</div>
    </div>
  )
}

/**
 * Renders a list of articles cards.
 * @param {String} slug - The article slug.
 * @param {String} title - The article title.
 * @param {String} date - The article date.
 * @param {String} description - The article description.
 * @returns {JSX.Element} The rendered component.
 */
export function ArticlesListCards({
  slug,
  title,
  date,
  description
}: TArticleProps): JSX.Element {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card.Eyebrow
        as="time"
        dateTime={date}
        className="mt-1 hidden md:block text-zinc-400 dark:text-zinc-500"
      >
        {formatDate(date)}
      </Card.Eyebrow>

      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${slug}`}>{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
    </article>
  )
}

/**
 * Renders a list of projects.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export function ProjectsList({ children }: TProjectListProps): JSX.Element {
  return (
    <ul className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  )
}

/**
 * Renders a list of projects cards.
 * @param {String} name - The project name.
 * @param {String} link - The project link.
 * @param {String} logo - The project logo.
 * @param {String} description - The project description.
 * @returns {JSX.Element} The rendered component.
 */
export function ProjectsListCards({
  name,
  link,
  logo,
  description
}: TProjectListCardProps): false | JSX.Element {
  return (
    !isEmpty(name) &&
    !isEmpty(link?.url) && (
      <Card as="li" key={name}>
        {!isEmpty(logo) && (
          <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
            <span className="h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={logo}
                alt=""
                className="h-full w-full"
                unoptimized
                priority
              />
            </span>
          </div>
        )}

        <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
          <Card.Link href={link.url} target="_blank">
            {name}
          </Card.Link>
        </h2>
        <Card.Description>{description || ''}</Card.Description>
        <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-amber-500 dark:text-zinc-200">
          <LinkSvgImage className="h-6 w-6 flex-none" />
          <span className="ml-2">{link?.text || ''}</span>
        </p>
      </Card>
    )
  )
}

/**
 * Renders a list of work experiences.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
export function WorkList({
  children,
  title,
  ...rest
}: TWorkListProps): JSX.Element {
  return (
    <Section title={title} {...rest}>
      <div className="space-y-16">{children}</div>
    </Section>
  )
}

/**
 * Renders a list of work experiences cards.
 * @param {String} company - The company name.
 * @param {String} country - The country name.
 * @param {Array} contributions - The work contributions
 * @param {Array} skills - The work skills
 * @returns {JSX.Element} The rendered component.
 */
export function WorkListCards({
  company,
  country,
  contributions,
  skills
}: TWorkListCardProps): JSX.Element {
  return (
    <Card as="article">
      <Card.Title as="h3" title={company} className=" !mb-2">
        {company} &nbsp;
        <h5 className="mb-2 hidden md:block text-sm">{country}</h5>
      </Card.Title>

      <div className="flex flex-row items-start my-2">
        <Card.Eyebrow
          as="ul"
          className="flex-wrap gap-y-4 text-zinc-400 dark:text-zinc-500"
        >
          {contributions?.map((item: string) => <li key={item}>{item}</li>)}
        </Card.Eyebrow>
      </div>

      <div className="flex flex-row items-start gap-x-6 mt-4 mb-2">
        <Card.Eyebrow
          as="h4"
          className="text-rose-400 dark:text-rose-500 text-base"
        >
          Skills
        </Card.Eyebrow>
        <Card.Eyebrow
          as="ul"
          className="flex-wrap gap-x-3 gap-y-1 text-zinc-400 dark:text-zinc-500"
        >
          {skills?.map((item: string) => <li key={item}>{item}</li>)}
        </Card.Eyebrow>
      </div>
    </Card>
  )
}
