import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type FigcaptionRef = HTMLElement
export type FigcaptionProps = HTMLAttributes<FigcaptionRef>

/**
 * Render the figcaption component.
 * @param children - The children of the figcaption.
 * @param rest - The rest of the props of the figcaption.
 * @returns The rendered figcaption component.
 */
const Figcaption = forwardRef<FigcaptionRef, FigcaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <figcaption ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </figcaption>
    )
  }
)

Figcaption.displayName = 'Figcaption'

export default Figcaption
