import { HTMLAttributes, forwardRef } from 'react'

export type UnderlineRef = HTMLElement
export type UnderlineProps = HTMLAttributes<UnderlineRef>

/**
 * Render the underline component.
 * @param children - The children of the underline.
 * @param rest - The rest of the props of the underline.
 * @returns The rendered underline component.
 */
export const Underline = forwardRef<UnderlineRef, UnderlineProps>(
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
