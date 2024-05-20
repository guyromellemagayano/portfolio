import { HTMLAttributes, forwardRef } from 'react'

export type ItalicRef = HTMLElement
export type ItalicProps = HTMLAttributes<ItalicRef>

/**
 * Render the italic component.
 * @param {ItalicProps} props - The italic component properties.
 * @param {ItalicRef} ref - The italic component reference.
 * @returns The rendered italic component.
 */
const Italic = forwardRef<ItalicRef, ItalicProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <i ref={ref} {...rest}>
      {children}
    </i>
  )
})

Italic.displayName = 'Italic'

export default Italic
