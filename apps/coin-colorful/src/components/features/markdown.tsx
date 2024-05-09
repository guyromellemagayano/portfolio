import { createElement } from 'react'

import clsx from 'clsx'
import parse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import breaks from 'remark-breaks'
import { unified } from 'unified'

import { useStyles } from '@guy-romelle-magayano/coin-colorful/hooks'

export type TMarkdown = {
  text: string
  className?: string
}

// Renders the markdown content using unified and rehype-react.
const renderer = unified()
  .use(parse)
  .use(breaks)
  // @ts-ignore
  .use(rehypeReact, { createElement: createElement })

/**
 * Renders markdown text as HTML.
 * @param className - The CSS class name for the component.
 * @param text - The markdown text to render.
 * @returns The rendered markdown as HTML.
 */
const Markdown = ({ className, text }: TMarkdown) => {
  const classes = useStyles()

  return (
    <div className={clsx(classes.root, className)}>
      {(renderer.processSync(text) as any).result}
    </div>
  )
}

Markdown.displayName = 'Markdown'

export default Markdown
