import { customId } from '@guy-romelle-magayano/react-utils/server'
import { HTMLAttributes, forwardRef } from 'react'

export type PreformattedTextRef = HTMLPreElement
export type PreformattedTextProps = HTMLAttributes<PreformattedTextRef>

/**
 * Render the preformatted text component.
 * @param children - The children of the preformatted text.
 * @param rest - The rest of the props of the preformatted text.
 * @returns The rendered preformatted text component.
 */
const PreformattedText = forwardRef<PreformattedTextRef, PreformattedTextProps>(
  ({ children, ...rest }, ref) => {
    return (
      <pre ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </pre>
    )
  }
)

PreformattedText.displayName = 'PreformattedText'

export default PreformattedText
