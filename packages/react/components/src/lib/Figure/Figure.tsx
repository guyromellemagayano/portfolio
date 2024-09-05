import React from 'react'

export type FigureRef = HTMLElement
export type FigureProps = React.HTMLAttributes<FigureRef>

/**
 * Render the figure component.
 * @param {FigureProps} props - The figure component properties
 * @param {FigureRef} ref - The figure component reference
 * @returns The rendered figure component
 */
const Figure = React.forwardRef<FigureRef, FigureProps>(
  ({ children, ...rest }, ref) => {
    return (
      <figure ref={ref} {...rest}>
        {children}
      </figure>
    )
  }
)

Figure.displayName = 'Figure'

export default Figure
