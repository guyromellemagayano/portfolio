import { HTMLAttributes, forwardRef } from 'react'

export type FigcaptionRef = HTMLElement
export type FigcaptionProps = HTMLAttributes<FigcaptionRef>

/**
 * Render the figcaption component.
 * @param {FigcaptionProps} props - The figcaption component properties.
 * @param {FigcaptionRef} ref - The figcaption component reference.
 * @returns The rendered figcaption component.
 */
const Figcaption = forwardRef<FigcaptionRef, FigcaptionProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <figcaption ref={ref} {...rest}>
      {children}
    </figcaption>
  )
})

Figcaption.displayName = 'Figcaption'

export default Figcaption
