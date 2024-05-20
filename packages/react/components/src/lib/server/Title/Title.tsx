import { HTMLAttributes } from 'react'

export type TitleRef = HTMLTitleElement
export type TitleProps = HTMLAttributes<TitleRef>

/**
 * Render the title component.
 * @param {TitleProps} props - The title component properties.
 * @returns The rendered title component.
 */
const Title = (props: TitleProps) => {
  const { children, ...rest } = props

  return <title {...rest}>{children}</title>
}

Title.displayName = 'Title'

export default Title
