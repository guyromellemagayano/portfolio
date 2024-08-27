import React from 'react'

export type HeadingRef = HTMLHeadingElement
export type HeadingProps = React.HTMLAttributes<HeadingRef> & {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/**
 * Render the heading component
 * @param {HeadingProps} props - The heading component properties
 * @param {HeadingRef} ref - The heading component reference
 * @returns The rendered heading component
 */
const Heading = React.forwardRef<HeadingRef, HeadingProps>((props, ref) => {
  const { as: Component = 'h1', children, ...rest } = props

  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  )
})

Heading.displayName = 'Heading'

export default Heading
