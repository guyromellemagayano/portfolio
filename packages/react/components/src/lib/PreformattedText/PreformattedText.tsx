import React from 'react'

export type TPreformattedTextRef = HTMLPreElement
export type TPreformattedTextProps = React.HTMLAttributes<TPreformattedTextRef>

/**
 * Render the preformatted text component.
 * @param {TPreformattedTextProps} props - The preformatted text component properties
 * @param {TPreformattedTextRef} ref - The preformatted text component reference
 * @returns The rendered preformatted text component
 */
const PreformattedText = React.forwardRef<
  TPreformattedTextRef,
  TPreformattedTextProps
>(({ children, ...rest }, ref) => {
  return (
    <pre ref={ref} {...rest}>
      {children}
    </pre>
  )
})

PreformattedText.displayName = 'PreformattedText'

export default PreformattedText
