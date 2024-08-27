import React from 'react'

export type PreformattedTextRef = HTMLPreElement
export type PreformattedTextProps = React.HTMLAttributes<PreformattedTextRef>

/**
 * Render the preformatted text component
 * @param {PreformattedTextProps} props - The preformatted text component properties
 * @param {PreformattedTextRef} ref - The preformatted text component reference
 * @returns The rendered preformatted text component
 */
const PreformattedText = React.forwardRef<
  PreformattedTextRef,
  PreformattedTextProps
>((props, ref) => {
  const { children, ...rest } = props

  return (
    <pre ref={ref} {...rest}>
      {children}
    </pre>
  )
})

PreformattedText.displayName = 'PreformattedText'

export default PreformattedText
