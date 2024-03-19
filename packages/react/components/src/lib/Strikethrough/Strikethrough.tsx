import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type StrikethroughRef = HTMLElement
export type StrikethroughProps = HTMLAttributes<StrikethroughRef>

/**
 * Render the strikethrough component.
 * @param children - The children of the strikethrough.
 * @param rest - The rest of the props of the strikethrough.
 * @returns The rendered strikethrough component.
 */
const Strikethrough = forwardRef<StrikethroughRef, StrikethroughProps>(
  ({ children, ...rest }, ref) => {
    return (
      <s ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </s>
    )
  }
)

Strikethrough.displayName = 'Strikethrough'

export default Strikethrough
