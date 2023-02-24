import { StaticImageData } from 'next/image'
import React from 'react'
import { ISeoMetaCommonProps } from './common'

// Container component props
export interface IContainerProps {
  id?: string
  className?: string
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Avatar container component props
export interface IAvatarContainerProps {
  className?: string
}

// Avatar component props
export interface IAvatarProps {
  large?: boolean
  className?: string
}

// Article component props
export interface IArticleProps {
  slug: string
  meta: {
    title: string
    description: string
    date: string
  }
}

// Article layout component props
export interface IArticleLayoutProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
  meta: {
    title: string
    description: string
    date: string
  }
  isRssFeed?: boolean
  previousPathname?: string
}

// Nav link component props
export interface INavLinkProps {
  href: string
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// SEO component props
export interface ISeoProps {
  meta: ISeoMetaCommonProps
}

// Social links component props
export interface ISocialLinkProps {
  icon: FunctionComponent<React.SVGProps<SVGSVGElement>>
  url?: string
  ariaLabel?: string
  showLabel?: boolean
}

// Photos component props
export interface IPhotosProps {
  data: {
    alt: string
    src: StaticImageData
  }[]
}

// Card component common props
interface ICardCommonProps {
  className?: string
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Card component props
export interface ICardProps {
  as?: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>['div']
}

// Card link component props
export interface ICardLinkProps {
  href: string | object
  title?: string
}

// Card title component props
export interface ICardTitleProps {
  as?: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>['h2']
  href?: string | object
  title?: string
}

// Card eyebrow component props
export interface ICardEyebrowProps {
  as?: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>['p']
  decorate?: boolean
  dateTime?: string
}

// Card CTA component props
export interface ICardCtaProps {
  href?: string | object
  title?: string
}

// Simple layout component props
export interface ISimpleLayoutProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
  id?: string
  title: string
  intro?: string[]
}

// Prose component props
export interface IProseProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
  className?: string
}

// Section component props
export interface ISectionProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
  title?: string
}

// Resume component props
export interface IResumeProps {
  data: {
    work: {
      logo: StaticImageData
      company: string
      title: string
      start: string
      end: string
    }[]
    file: string
  }
}

// Skills list card component props
export interface ISkillsListCardsProps {
  title: string
  description?: string[]
  concepts?: string[]
  technologies?: ISkillsListCardsTechnologiesProps[]
  cta?: ISkillsListCardsCtaProps[]
}

// Skills list card technologies props
export interface ISkillsListCardsTechnologiesProps {
  name: string
  icon?: StaticImageData | string | null
}

// Skills list card CTA props
export interface ISkillsListCardsCtaProps {
  text: string
  projects: string[]
}

// Skills list component props
export interface ISkillsListProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Tools list component props
export interface IToolsListProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Tool list cards component props
export interface IToolsListCardsProps {
  title: string
  description: string
}

// Article list component props
export interface IArticleListProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Article list card component props
export interface IArticleListCardProps {
  slug: string
  meta: {
    title: string
    description: string
    date: string
  }
}

// Project list component props
export interface IProjectListProps {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Project list card component props
export interface IProjectListCardProps {
  project: {
    name: string
    link: {
      url: string
      text: string
    }
    logo: StaticImageData
    description: string
  }
}

// Mobile nav item component props
export interface IMobileNavItemProps {
  href: string
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Nav item component props
export interface INavItemProps {
  href: string
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}

// Main button component props
export interface IMainButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  className?: string
  href?: string
  children?: JSX.Element | JSX.Element[] | React.ReactNode | React.ReactNode[] | string
}
