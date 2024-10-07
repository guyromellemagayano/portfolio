import { MDXContent } from 'mdx/types'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

// Common posts data
export type TCommonPostsData = {
  slug: string
  title: string
  description: string
  category: string | string[]
  component?: MDXContent
}

// Common photos data
export type TCommonPhotosData = {
  id?: string
  alt?: string
  src: string | StaticImport
}
