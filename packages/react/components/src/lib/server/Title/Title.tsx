import { HTMLAttributes } from 'react'

export type TitleRef = HTMLTitleElement
export type TitleProps = HTMLAttributes<TitleRef>

/**
 * Render the title component.
 * @param children - The children of the title.
 * @param rest - The rest of the props of the title.
 * @returns The rendered title component.
 */
export const Title = ({ children, ...rest }: TitleProps) => {
  return <title {...rest}>{children}</title>
}

Title.displayName = 'Title'

export default Title
