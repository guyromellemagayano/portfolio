import { HTMLAttributes, forwardRef } from 'react'

export type DivisionRef = HTMLDivElement
export type DivisionProps = HTMLAttributes<DivisionRef>

/**
 * Render the division component.
 * @param children - The children of the division.
 * @param rest - The rest of the props of the division.
 * @returns The rendered division component.
 */
const Division = forwardRef<DivisionRef, DivisionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <div ref={ref} {...rest}>
        {children}
      </div>
    )
  }
)

Division.displayName = 'Division'

export default Division
