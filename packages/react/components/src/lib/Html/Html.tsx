import React from 'react'

export type THtmlRef = HTMLHtmlElement
export type THtmlProps = React.HtmlHTMLAttributes<THtmlRef>

/**
 * Render the HTML component.
 * @param {THtmlProps} props - The HTML component properties
 * @returns The rendered HTML component
 */
const Html = ({ children, lang = 'en', ...rest }: THtmlProps) => {
  return (
    <html lang={lang} {...rest}>
      {children}
    </html>
  )
}

Html.displayName = 'Html'

export default Html
