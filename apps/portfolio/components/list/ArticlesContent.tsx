import { TWithChildren } from '@/types/components'

/**
 * Renders a list of articles.
 * @param {React.ReactNode} children - The child elements to be rendered.
 * @returns {JSX.Element} The rendered component.
 */
const ArticlesList = ({ children }: TWithChildren): JSX.Element => {
  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="flex max-w-3xl flex-col space-y-16">{children}</div>
    </div>
  )
}

export default ArticlesList
