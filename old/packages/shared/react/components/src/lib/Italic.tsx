import React from 'react'

export type TItalicRef = HTMLElement
export type TItalicProps = React.HTMLAttributes<TItalicRef>

/**
 * Render the italic component.
 * @param {TItalicProps} props - The italic component properties
 * @param {TItalicRef} ref - The italic component reference
 * @returns The rendered italic component
 */
const Italic = React.forwardRef<TItalicRef, TItalicProps>(
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
