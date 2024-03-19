import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type RubyTextRef = HTMLElement
export type RubyTextProps = HTMLAttributes<RubyTextRef>

/**
 * Render the ruby text component.
 * @param children - The children of the ruby text.
 * @param rest - The rest of the props of the ruby text.
 * @returns The rendered ruby text component.
 */
const RubyText = forwardRef<RubyTextRef, RubyTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <rt ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </rt>
    )
  }
)

RubyText.displayName = 'RubyText'

export default RubyText
