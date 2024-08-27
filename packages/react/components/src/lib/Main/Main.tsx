import React from 'react'

export type MainRef = HTMLElement
export type MainProps = React.HTMLAttributes<MainRef>

/**
 * Render the main component
 * @param {MainProps} props - The main component properties
 * @param {MainRef} ref - The main component reference
 * @returns The rendered main component
 */
const Main = React.forwardRef<MainRef, MainProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <main ref={ref} {...rest}>
      {children}
    </main>
  )
})

Main.displayName = 'Main'

export default Main
