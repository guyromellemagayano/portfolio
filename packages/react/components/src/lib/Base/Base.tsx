import React from 'react'

export type TBaseRef = HTMLBaseElement
export type TBaseProps = React.BaseHTMLAttributes<TBaseRef>

/**
 * Render the base component.
 * @param {TBaseProps} props - The base component properties
 * @param {TBaseRef} ref - The base component reference
 * @returns The rendered base component
 */
const Base = React.forwardRef<TBaseRef, TBaseProps>(
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
