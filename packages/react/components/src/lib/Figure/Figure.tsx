import React from 'react'

export type TFigureRef = HTMLElement
export type TFigureProps = React.HTMLAttributes<TFigureRef>

/**
 * Render the figure component.
 * @param {TFigureProps} props - The figure component properties
 * @param {TFigureRef} ref - The figure component reference
 * @returns The rendered figure component
 */
const Figure = React.forwardRef<TFigureRef, TFigureProps>(
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
