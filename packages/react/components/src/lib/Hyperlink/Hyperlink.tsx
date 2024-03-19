import { AnchorHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type HyperlinkRef = HTMLAnchorElement
export type HyperlinkProps = AnchorHTMLAttributes<HyperlinkRef>

/**
 * Render the hyperlink component.
 * @param href - The URL of the hyperlink.
 * @param children - The children of the hyperlink.
 * @param rest - The rest of the props of the hyperlink.
 * @returns The rendered hyperlink component.
 */
const Hyperlink = forwardRef<HyperlinkRef, HyperlinkProps>(
  ({ href = '#', children, ...rest }, ref) => {
    return (
      <a ref={ref} href={href} {...rest} id={rest.id ?? customId}>
        {children}
      </a>
    )
  }
)

Hyperlink.displayName = 'Hyperlink'

export default Hyperlink
