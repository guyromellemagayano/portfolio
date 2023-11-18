import { THomeData } from '@data/home'
import { TWorkExperience } from '@data/work'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { StaticImageData } from 'next/image'

import { TSeoMetaCommonProps } from './common'

// Base type for props that include children
export type TWithChildren<T = object> = T & {
  children?: React.ReactNode
}

// Base type for props that include class name
export type TWithClassName<T = object> = T & {
  className?: string
}

// Base type for props that can have an ID and className
export type TWithIDAndClass<T = object> = T &
  TWithChildren<T> &
  TWithClassName<T> & {
    id?: string
  }

// Props for components that represent a card structure
export type TCardProps<T = object> = T &
  TWithIDAndClass<T> & {
    as?: keyof JSX.IntrinsicElements
  }

// Props for generic containers with optional children, id, and className
export type TContainerProps<T = object> = T & TWithIDAndClass<T>

// Props for navigation links
export type TNavLinkProp<T = object> = T & TNavItemProps<T>

// Props for SEO components
export type TSeoProps<T = object> = T &
  TWithChildren<T> & {
    meta: TSeoMetaCommonProps
  }

// Props for prose text containers
export type TProseProps<T = object> = T & TWithIDAndClass<T>

// Props for section components with optional title and decoration flag
export type TSectionLayoutProps<T = object> = T &
  TWithIDAndClass<T> & {
    title?: string
    decorate?: boolean
  }

// Props for avatar container component
export type TAvatarContainerProps<T = object> = T &
  TWithClassName<T> &
  TWithChildren<T> & { style?: React.CSSProperties }

// Props for avatar component
export type TAvatarProps<T = object> = T &
  TWithIDAndClass<T> &
  TWithChildren<T> & { large?: boolean; style?: React.CSSProperties }

// Define variants as a union of string literals
export type ButtonVariant = 'primary' | 'secondary'

// Props for main button components
export type TButtonProps<T = object> = T &
  ButtonHTMLAttributes<HTMLButtonElement> &
  TWithClassName<T> &
  TNavItemProps<T> & {
    type?: 'button' | 'submit' | 'reset'
    variant?: 'primary' | 'secondary'
    className?: string
  }

// Props for common article components
export type TArticleCommonProps<T = object> = T & {
  meta: {
    title: string
    description: string
    date: string
  }
}

// Props for article layout component
export type TArticleLayoutProps<T = object> = T &
  TWithChildren<T> & {
    article: TArticleCommonProps['meta']
    author: string
  }

// Props for article component
export type TArticleProps<T = object> = T &
  TWithChildren<T> &
  TWithClassName<T> &
  TArticleCommonProps['meta'] & {
    slug: string
  }

// Props for photos component
export type TPhotoLayoutProps<T = object> = T &
  TWithChildren<T> & {
    data: Array<{ alt: string; src: StaticImageData }>
  }

// Props for resume component
export type TResumeProps<T = object> = T &
  TWithChildren<T> & {
    data: {
      work: THomeData['workExperiences']
      file: THomeData['cvFile']
    }
  }

// Props for simple layout component
export type TSimpleLayoutProps<T = object> = T &
  TWithIDAndClass<T> & {
    title: string
    intro?: string[]
  }

// Props for social link component
export type TSocialLinkProps<T = object> = T & {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  url?: string
  ariaLabel?: string
  showLabel?: boolean
}

// Props for navigation item component
export type TNavItemProps<T = object> = T &
  TWithChildren<T> &
  TWithClassName<T> & {
    href: string
  }

// Props for common card components
export type TCardCommonProps<T = object> = T &
  TCardProps & {
    href?: string
    title?: string
    decorate?: boolean
    target?: string
    dateTime?: string
  }

// Props for card component
export type TCardProps<T = object> = T &
  TWithChildren<T> & {
    as?: React.ElementType
    className?: string
  }

// Props for container component
export type DivRef = HTMLDivElement

export type TContainerProps<T = object> = T &
  TWithChildren<T> & {
    className?: string
  }

export type TContainerType = typeof ContainerWithRef & {
  Outer: typeof OuterContainer
  Inner: typeof InnerContainer
}

// Props for skills list component
export type TSkillsListProps<T = object> = T &
  TWithChildren<T> & {
    title: string
  }

// Props for skills list cards component
export type TSkillsListCardsProps<T = object> = T &
  TWithChildren<T> &
  Pick<TSkillsItemsProps, 'title' | 'description' | 'technologies'> & {
    cta?: Array<{
      projects: string[]
      text: string
    }>
  }

// Props for tools list component
export type TToolsListProps<T = object> = T &
  TWithChildren<T> & {
    title: string
  }

// Props for tools list cards component
export type TToolsListCardsProps<T = object> = T & {
  title: string
  description: string
}

// Props for project list component
export type TProjectListProps<T = object> = T & TWithChildren<T>

// Props for project list card component
export type TProjectListCardProps<T = object> = T &
  TWithChildren<T> & {
    name: string
    link: {
      url: string
      text: string
    }
    logo: StaticImport | string
    description: string
  }

// Props for work list component
export type TWorkListProps<T = object> = T &
  TWithChildren<T> & {
    title: string
  }

// Props for work list card component
export type TWorkListCardProps<T = object> = T &
  TWithChildren<T> &
  Pick<TWorkExperience, 'company' | 'country' | 'contributions' | 'skills'>

// Props for prose component
export type TProseProps<T = object> = T &
  TWithChildren<T> & {
    className?: string
  }

// Props for project component
export type TProjectProps<T = object> = T &
  TWithChildren<T> &
  TWithClassName<T> &
  TProjectListCardProps<T>
