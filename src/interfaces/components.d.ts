import { StaticImageData } from 'next/image'
import React from 'react'
import { ISeoMetaCommonProps } from './common'
import { ISkillsListItemsData } from './data'

// Children component props
export interface IChildrenProps {
  children?: React.ReactNode | React.ReactNode[] | string
}

// Container component props
export interface IContainerProps extends IChildrenProps {
  id?: string
  className?: string
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
export interface IArticleLayoutProps extends IChildrenProps {
  meta: {
    title: string
    description: string
    date: string
  }
  isRssFeed?: boolean
  previousPathname?: string
}

// Nav link component props
export interface INavLinkProps extends IChildrenProps {
  href: string
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
interface ICardCommonProps extends IChildrenProps {
  className?: string
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
export interface ISimpleLayoutProps extends IChildrenProps {
  id?: string
  title: string
  intro?: string[]
}

// Prose component props
export interface IProseProps extends IChildrenProps {
  className?: string
}

// Section component props
export interface ISectionProps extends IChildrenProps {
  title?: string
  decorate?: boolean
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
export interface ISkillsListCardsProps extends ISkillsListItemsData {
  cta?: ISkillsListCardsCtaProps[]
}

// Skills list card CTA props
export interface ISkillsListCardsCtaProps {
  text: string
  projects: string[]
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
export interface IMobileNavItemProps extends IChildrenProps {
  href: string
}

// Nav item component props
export interface INavItemProps extends IChildrenProps {
  href: string
}

// Main button component props
export interface IMainButtonProps extends IChildrenProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  className?: string
  href?: string
}
