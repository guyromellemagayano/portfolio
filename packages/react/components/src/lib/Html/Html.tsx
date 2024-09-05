import React from 'react'

export type HtmlRef = HTMLHtmlElement
export type HtmlProps = React.HtmlHTMLAttributes<HtmlRef>

/**
 * Render the HTML component.
 * @param {HtmlProps} props - The HTML component properties
 * @returns The rendered HTML component
 */
const Html = ({ children, ...rest }: HtmlProps) => {
  return <html {...rest}>{children}</html>
}

Html.displayName = 'Html'

export default Html
