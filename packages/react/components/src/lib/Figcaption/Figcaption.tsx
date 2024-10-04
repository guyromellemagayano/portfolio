import React from 'react'

export type TFigcaptionRef = HTMLElement
export type TFigcaptionProps = React.HTMLAttributes<TFigcaptionRef>

/**
 * Render the figcaption component.
 * @param {TFigcaptionProps} props - The figcaption component properties
 * @param {TFigcaptionRef} ref - The figcaption component reference
 * @returns The rendered figcaption component
 */
const Figcaption = React.forwardRef<TFigcaptionRef, TFigcaptionProps>(
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
