import { HTMLAttributes, forwardRef } from 'react'

export type EmphasizedTextRef = HTMLElement
export type EmphasizedTextProps = HTMLAttributes<EmphasizedTextRef>

/**
 * Render the emphasized text component.
 * @param children - The children of the emphasized text.
 * @param rest - The rest of the props of the emphasized text.
 * @returns The rendered emphasized text component.
 */
const EmphasizedText = forwardRef<EmphasizedTextRef, EmphasizedTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <em ref={ref} {...rest}>
        {children}
      </em>
    )
  }
)

EmphasizedText.displayName = 'EmphasizedText'

export default EmphasizedText
