import React from 'react'

export type IframeRef = HTMLIFrameElement
export type IframeProps = React.IframeHTMLAttributes<IframeRef>

/**
 * Render the iframe component
 * @param {IframeProps} props - The iframe component properties
 * @param {IframeRef} ref - The iframe component reference
 * @returns The rendered iframe component
 */
const Iframe = React.forwardRef<IframeRef, IframeProps>(
  ({ src = '#', title = '', children, ...rest }, ref) => {
    return (
      <iframe ref={ref} src={src} title={title} {...rest}>
        {children}
      </iframe>
    )
  }
)

Iframe.displayName = 'Iframe'

export default Iframe
