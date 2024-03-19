import { InsHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type InsertedTextRef = HTMLModElement
export type InsertedTextProps = InsHTMLAttributes<InsertedTextRef>

/**
 * Render the inserted text component.
 * @param children - The children of the inserted text.
 * @param rest - The rest of the props of the inserted text.
 * @returns The rendered inserted text component.
 */
const InsertedText = forwardRef<InsertedTextRef, InsertedTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ins ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </ins>
    )
  }
)

InsertedText.displayName = 'InsertedText'

export default InsertedText
