import React from 'react'

export type TitleRef = HTMLTitleElement
export type TitleProps = React.HTMLAttributes<TitleRef>

/**
 * Render the title component.
 * @param {TitleProps} props - The title component properties
 * @returns The rendered title component
 */
const Title = ({ children, ...rest }: TitleProps) => {
  return <title {...rest}>{children}</title>
}

Title.displayName = 'Title'

export default Title
