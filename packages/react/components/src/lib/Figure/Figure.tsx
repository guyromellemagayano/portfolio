'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type FigureRef = HTMLElement
export type FigureProps = HTMLAttributes<FigureRef>

/**
 * Render the figure component.
 * @param children - The children of the figure.
 * @param rest - The rest of the props of the figure.
 * @returns The rendered figure component.
 */
export const Figure = forwardRef<FigureRef, FigureProps>(
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
