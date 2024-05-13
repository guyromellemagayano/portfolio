import { createElement } from 'react'

import clsx from 'clsx'
import parse from 'rehype-parse'
import rehypeReact from 'rehype-react'
import breaks from 'remark-breaks'
import { unified } from 'unified'

import { Div } from '@guy-romelle-magayano/react-components/server'

import { useStyles } from '@guy-romelle-magayano/coin-colorful/hooks'

// Renders the markdown content using `unified` and `rehype-react`.
const renderer = unified()
  .use(parse)
  .use(breaks)
  // @ts-ignore
  .use(rehypeReact, { createElement: createElement })

export type MarkdownFeatureProps = {
  text: string
  className?: string
}

/**
 * Renders the markdown feature component.
 * @param {MarkdownFeatureProps} props - The properties to render the component with.
 * @returns The rendered feature component.
 */
const MarkdownFeature = (props: MarkdownFeatureProps) => {
  const { className, text } = props

  const classes = useStyles()

  return (
    <Div className={clsx(classes.root, className)}>
      {(renderer.processSync(text) as any).result}
    </Div>
  )
}

MarkdownFeature.displayName = 'MarkdownFeature'

export default MarkdownFeature
