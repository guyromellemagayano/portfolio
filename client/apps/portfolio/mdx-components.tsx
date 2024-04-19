import type { MDXComponents } from 'mdx/types'

/**
 * Use MDX components.
 * @param components
 * @returns The MDX components.
 */
export const useMDXComponents = (components: MDXComponents): MDXComponents => {
  return {
    ...components
  }
}
