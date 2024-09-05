import React from 'react'

export type BaseRef = HTMLBaseElement
export type BaseProps = React.BaseHTMLAttributes<BaseRef>

/**
 * Render the base component.
 * @param {BaseProps} props - The base component properties
 * @param {BaseRef} ref - The base component reference
 * @returns The rendered base component
 */
const Base = React.forwardRef<BaseRef, BaseProps>(
  ({ children, ...rest }, ref) => {
    return (
      <base ref={ref} {...rest}>
        {children}
      </base>
    )
  }
)

Base.displayName = 'Base'

export default Base
