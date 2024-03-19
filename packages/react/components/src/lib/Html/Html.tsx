'use client'

import { HtmlHTMLAttributes } from 'react'

export type HtmlRef = HTMLHtmlElement
export type HtmlProps = HtmlHTMLAttributes<HtmlRef>

/**
 * Render the HTML component.
 * @param children - The children of the HTML.
 * @param rest - The rest of the props of the HTML.
 * @returns The rendered HTML component.
 */
const Html = ({ children, ...rest }: HtmlProps) => {
  return <html {...rest}>{children}</html>
}

Html.displayName = 'Html'

export default Html
