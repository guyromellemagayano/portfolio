import { HTMLAttributes, forwardRef } from 'react'

export type LineBreakRef = HTMLBRElement
export type LineBreakProps = HTMLAttributes<LineBreakRef>

/**
 * Render the line break component.
 * @param children - The children of the line break.
 * @param rest - The rest of the props of the line break.
 * @returns The rendered line break component.
 */
export const LineBreak = forwardRef<LineBreakRef, LineBreakProps>(
  ({ ...rest }, ref) => {
    return <br ref={ref} {...rest} />
  }
)

LineBreak.displayName = 'LineBreak'

export default LineBreak
