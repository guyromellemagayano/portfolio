import React from 'react'

export type EmphasizedTextRef = HTMLElement
export type EmphasizedTextProps = React.HTMLAttributes<EmphasizedTextRef>

/**
 * Render the emphasized text component
 * @param {EmphasizedTextProps} props - The emphasized text component properties
 * @param {EmphasizedTextRef} ref - The emphasized text component reference
 * @returns The rendered emphasized text component
 */
const EmphasizedText = React.forwardRef<EmphasizedTextRef, EmphasizedTextProps>(
  (props, ref) => {
    const { children, ...rest } = props

    return (
      <em ref={ref} {...rest}>
        {children}
      </em>
    )
  }
)

EmphasizedText.displayName = 'EmphasizedText'

export default EmphasizedText
