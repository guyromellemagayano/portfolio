import { HTMLAttributes, forwardRef } from 'react'

export type FigureRef = HTMLElement
export type FigureProps = HTMLAttributes<FigureRef>

/**
 * Render the figure component.
 * @param {FigureProps} props - The figure component properties.
 * @param {FigureRef} ref - The figure component reference.
 * @returns The rendered figure component.
 */
const Figure = forwardRef<FigureRef, FigureProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <figure ref={ref} {...rest}>
      {children}
    </figure>
  )
})

Figure.displayName = 'Figure'

export default Figure
