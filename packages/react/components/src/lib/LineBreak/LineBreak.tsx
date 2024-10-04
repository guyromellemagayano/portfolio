import React from 'react'

export type TLineBreakRef = HTMLBRElement
export type TLineBreakProps = React.HTMLAttributes<TLineBreakRef>

/**
 * Render the line break component
 * @param {TLineBreakProps} props - The line break component properties
 * @param {TLineBreakRef} ref - The line break component reference
 * @returns The rendered line break component
 */
const LineBreak = React.forwardRef<TLineBreakRef, TLineBreakProps>(
  ({ ...rest }, ref) => {
    return <br ref={ref} {...rest} />
  }
)

LineBreak.displayName = 'LineBreak'

export default LineBreak
