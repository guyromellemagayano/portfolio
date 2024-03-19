'use client'

import { IframeHTMLAttributes, forwardRef } from 'react'

export type IframeRef = HTMLIFrameElement
export type IframeProps = IframeHTMLAttributes<IframeRef>

/**
 * Render the iframe component.
 * @param src - The source of the iframe.
 * @param children - The children of the iframe.
 * @param rest - The rest of the props of the iframe.
 * @returns The rendered iframe component.
 */
const Iframe = forwardRef<IframeRef, IframeProps>(
  ({ src = '#', children, ...rest }, ref) => {
    return (
      <iframe ref={ref} src={src} {...rest}>
        {children}
      </iframe>
    )
  }
)

Iframe.displayName = 'Iframe'

export default Iframe
