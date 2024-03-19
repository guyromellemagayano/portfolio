import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type RubyRef = HTMLElement
export type RubyProps = HTMLAttributes<RubyRef>

/**
 * Render the ruby annotation component.
 * @param children - The children of the ruby annotation.
 * @param rest - The rest of the props of the ruby annotation.
 * @returns The rendered ruby annotation component.
 */
const Ruby = forwardRef<RubyRef, RubyProps>(({ children, ...rest }, ref) => {
  return (
    <ruby ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </ruby>
  )
})

Ruby.displayName = 'Ruby'

export default Ruby
