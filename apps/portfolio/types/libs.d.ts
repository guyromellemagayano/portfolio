// Types for article lib function
export type TArticleLibProps<T = any> = T & {
  title: string
  description: string
  author: string
  date: string
}

// Types for article lib function with slug
export type TArticleWithSlugLibProps<T = any> = T &
  TArticleLibProps & {
    slug: string
  }

// Types for project lib function
export type TProjectLibProps<T = any> = T & {
  name: string
  description: string
  link: { url: string; text: string }
  tech: string[]
}

// Types for project lib function with slug
export type TProjectWithSlugLibProps<T = any> = T &
  TProjectLibProps & {
    slug: string
  }
