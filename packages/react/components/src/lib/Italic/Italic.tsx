import React from 'react'

export type ItalicRef = HTMLElement
export type ItalicProps = React.HTMLAttributes<ItalicRef>

/**
 * Render the italic component.
 * @param {ItalicProps} props - The italic component properties
 * @param {ItalicRef} ref - The italic component reference
 * @returns The rendered italic component
 */
const Italic = React.forwardRef<ItalicRef, ItalicProps>(
  ({ children, ...rest }, ref) => {
    return (
      <i ref={ref} {...rest}>
        {children}
      </i>
    )
  }
)

Italic.displayName = 'Italic'

export default Italic
