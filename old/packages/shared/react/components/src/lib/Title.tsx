import React from 'react'

export type TTitleRef = HTMLTitleElement
export type TTitleProps = React.HTMLAttributes<TTitleRef>

/**
 * Render the title component.
 * @param {TTitleProps} props - The title component properties
 * @returns The rendered title component
 */
const Title = ({ children, ...rest }: TTitleProps) => {
  return <title {...rest}>{children}</title>
}

Title.displayName = 'Title'

export default Title
