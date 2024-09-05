import React from 'react'

export type FigcaptionRef = HTMLElement
export type FigcaptionProps = React.HTMLAttributes<FigcaptionRef>

/**
 * Render the figcaption component.
 * @param {FigcaptionProps} props - The figcaption component properties
 * @param {FigcaptionRef} ref - The figcaption component reference
 * @returns The rendered figcaption component
 */
const Figcaption = React.forwardRef<FigcaptionRef, FigcaptionProps>(
  ({ children, ...rest }, ref) => {
    return (
      <figcaption ref={ref} {...rest}>
        {children}
      </figcaption>
    )
  }
)

Figcaption.displayName = 'Figcaption'

export default Figcaption
