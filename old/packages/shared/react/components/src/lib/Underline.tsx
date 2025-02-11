import React from 'react'

export type TUnderlineRef = HTMLElement
export type TUnderlineProps = React.HTMLAttributes<TUnderlineRef>

/**
 * Render the underline component
 * @param {TUnderlineProps} props - The underline component properties
 * @param {TUnderlineRef} ref - The underline component reference
 * @returns The rendered underline component
 */
const Underline = React.forwardRef<TUnderlineRef, TUnderlineProps>(
  ({ children, ...rest }, ref) => {
    return (
      <u ref={ref} {...rest}>
        {children}
      </u>
    )
  }
)

Underline.displayName = 'Underline'

export default Underline
