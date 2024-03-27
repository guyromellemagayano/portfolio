import { BaseHTMLAttributes } from 'react'

export type BaseRef = HTMLBaseElement
export type BaseProps = BaseHTMLAttributes<BaseRef>

/**
 * Render the base component.
 * @param children - The children of the base.
 * @param rest - The rest of the props of the base.
 * @returns The rendered base component.
 */
export const Base = ({ children, ...rest }: BaseProps) => {
  return <base {...rest}>{children}</base>
}

Base.displayName = 'Base'

export default Base
