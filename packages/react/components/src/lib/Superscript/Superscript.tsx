import React from 'react'

export type SuperscriptRef = HTMLElement
export type SuperscriptProps = React.HTMLAttributes<SuperscriptRef>

/**
 * Render the superscript component.
 * @param {SuperscriptProps} props - The superscript component properties
 * @param {SuperscriptRef} ref - The superscript component reference
 * @returns The rendered superscript component
 */
const Superscript = React.forwardRef<SuperscriptRef, SuperscriptProps>(
  ({ children, ...rest }, ref) => {
    return (
      <sup ref={ref} {...rest}>
        {children}
      </sup>
    )
  }
)

Superscript.displayName = 'Superscript'

export default Superscript
