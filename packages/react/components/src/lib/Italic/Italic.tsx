'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type ItalicRef = HTMLElement
export type ItalicProps = HTMLAttributes<ItalicRef>

/**
 * Render the italic component.
 * @param children - The children of the italic.
 * @param rest - The rest of the props of the italic.
 * @returns The rendered italic component.
 */
export const Italic = forwardRef<ItalicRef, ItalicProps>(
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
