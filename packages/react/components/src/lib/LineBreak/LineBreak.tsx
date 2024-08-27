import React from 'react'

export type LineBreakRef = HTMLBRElement
export type LineBreakProps = React.HTMLAttributes<LineBreakRef>

/**
 * Render the line break component
 * @param {LineBreakProps} props - The line break component properties
 * @param {LineBreakRef} ref - The line break component reference
 * @returns The rendered line break component
 */
const LineBreak = React.forwardRef<LineBreakRef, LineBreakProps>(
  (props, ref) => {
    const { ...rest } = props

    return <br ref={ref} {...rest} />
  }
)

LineBreak.displayName = 'LineBreak'

export default LineBreak
