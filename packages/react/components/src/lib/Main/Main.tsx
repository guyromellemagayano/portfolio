import React from 'react'

export type TMainRef = HTMLElement
export type TMainProps = React.HTMLAttributes<TMainRef>

/**
 * Render the main component.
 * @param {TMainProps} props - The main component properties
 * @param {TMainRef} ref - The main component reference
 * @returns The rendered main component
 */
const Main = React.forwardRef<TMainRef, TMainProps>(
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
