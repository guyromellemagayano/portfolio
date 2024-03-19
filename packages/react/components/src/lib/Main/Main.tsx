import { HTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type MainRef = HTMLElement
export type MainProps = HTMLAttributes<MainRef>

/**
 * Render the main component.
 * @param children - The children of the main.
 * @param rest - The rest of the props of the main.
 * @returns The rendered main component.
 */
const Main = forwardRef<MainRef, MainProps>(({ children, ...rest }, ref) => {
  return (
    <main ref={ref} {...rest} id={rest.id ?? customId}>
      {children}
    </main>
  )
})

Main.displayName = 'Main'

export default Main
