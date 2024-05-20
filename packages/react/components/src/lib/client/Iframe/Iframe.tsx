'use client'

import { IframeHTMLAttributes, forwardRef } from 'react'

export type IframeRef = HTMLIFrameElement
export type IframeProps = IframeHTMLAttributes<IframeRef>

/**
 * Render the iframe component.
 * @param {IframeProps} props - The iframe component properties.
 * @param {IframeRef} ref - The iframe component reference.
 * @returns The rendered iframe component.
 */
const Iframe = forwardRef<IframeRef, IframeProps>((props, ref) => {
  const { src = '#', children, ...rest } = props

  return (
    <iframe ref={ref} src={src} {...rest}>
      {children}
    </iframe>
  )
})

Iframe.displayName = 'Iframe'

export default Iframe
