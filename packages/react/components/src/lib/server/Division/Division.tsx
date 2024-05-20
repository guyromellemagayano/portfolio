import { HTMLAttributes, forwardRef } from 'react'

export type DivisionRef = HTMLDivElement
export type DivisionProps = HTMLAttributes<DivisionRef>

/**
 * Render the division component.
 * @param {DivisionProps} props - The division component properties.
 * @param {DivisionRef} ref - The division component reference.
 * @returns The rendered division component.
 */
const Division = forwardRef<DivisionRef, DivisionProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  )
})

Division.displayName = 'Division'

export default Division
