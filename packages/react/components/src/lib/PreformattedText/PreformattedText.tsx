'use client'

import { HTMLAttributes, forwardRef } from 'react'

export type PreformattedTextRef = HTMLPreElement
export type PreformattedTextProps = HTMLAttributes<PreformattedTextRef>

/**
 * Render the preformatted text component.
 * @param children - The children of the preformatted text.
 * @param rest - The rest of the props of the preformatted text.
 * @returns The rendered preformatted text component.
 */
export const PreformattedText = forwardRef<
  PreformattedTextRef,
  PreformattedTextProps
>(({ children, ...rest }, ref) => {
  return (
    <pre ref={ref} {...rest}>
      {children}
    </pre>
  )
})

PreformattedText.displayName = 'PreformattedText'

export default PreformattedText
