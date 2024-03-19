import { TableHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type CaptionRef = HTMLTableCaptionElement
export type CaptionProps = TableHTMLAttributes<CaptionRef>

/**
 * Render the caption component.
 * @param children - The children of the caption.
 * @param rest - The rest of the props of the caption.
 * @returns The rendered caption component.
 */
const Caption = forwardRef<CaptionRef, CaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <caption ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </caption>
    )
  }
)

Caption.displayName = 'Caption'

export default Caption
