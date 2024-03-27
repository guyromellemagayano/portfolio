import { HTMLAttributes, forwardRef } from 'react'

export type HeadingRef = HTMLHeadingElement
export type HeadingProps = HTMLAttributes<HeadingRef> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Render the heading component.
 * @param as - The tag of the heading.
 * @param children - The children of the heading.
 * @param rest - The rest of the props of the heading.
 * @returns The rendered heading component.
 */
export const Heading = forwardRef<HeadingRef, HeadingProps>(
  ({ as: Component = 'h1', children, ...rest }, ref) => {
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    )
  }
)

Heading.displayName = 'Heading'

export default Heading
