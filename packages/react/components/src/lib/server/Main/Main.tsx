import { HTMLAttributes, forwardRef } from 'react'

export type MainRef = HTMLElement
export type MainProps = HTMLAttributes<MainRef>

/**
 * Render the main component.
 * @param children - The children of the main.
 * @param rest - The rest of the props of the main.
 * @returns The rendered main component.
 */
export const Main = forwardRef<MainRef, MainProps>(
  ({ children, ...rest }, ref) => {
    return (
      <main ref={ref} {...rest}>
        {children}
      </main>
    )
  }
)

Main.displayName = 'Main'

export default Main
