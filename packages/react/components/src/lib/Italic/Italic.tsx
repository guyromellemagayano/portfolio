import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type ItalicRef = HTMLElement
export type ItalicProps = HTMLAttributes<ItalicRef>

/**
 * Render the italic component.
 * @param children - The children of the italic.
 * @param rest - The rest of the props of the italic.
 * @returns The rendered italic component.
 */
const Italic = forwardRef<ItalicRef, ItalicProps>(
  ({ children, ...rest }, ref) => {
    return (
      <i ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </i>
    )
  }
)

Italic.displayName = 'Italic'

export default Italic
