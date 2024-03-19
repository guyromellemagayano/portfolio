import { HTMLAttributes, forwardRef } from 'react'

export type DescriptionTermRef = HTMLElement
export type DescriptionTermProps = HTMLAttributes<DescriptionTermRef>

/**
 * Render the description term component.
 * @param children - The children of the description term.
 * @param rest - The rest of the props of the description term.
 * @returns The rendered description term component.
 */
const DescriptionTerm = forwardRef<DescriptionTermRef, DescriptionTermProps>(
  ({ children, ...rest }, ref) => {
    return (
      <dt ref={ref} {...rest}>
        {children}
      </dt>
    )
  }
)

DescriptionTerm.displayName = 'DescriptionTerm'

export default DescriptionTerm
