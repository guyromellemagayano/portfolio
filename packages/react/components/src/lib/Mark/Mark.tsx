import React from 'react'

export type MarkRef = HTMLElement
export type MarkProps = React.HTMLAttributes<MarkRef>

/**
 * Render the mark component
 * @param {MarkProps} props - The mark component properties
 * @param {MarkRef} ref - The mark component reference
 * @returns The rendered mark component
 */
const Mark = React.forwardRef<MarkRef, MarkProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <mark ref={ref} {...rest}>
      {children}
    </mark>
  )
})

Mark.displayName = 'Mark'

export default Mark
