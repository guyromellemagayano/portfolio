import { HTMLAttributes, forwardRef } from 'react'

export type CodeRef = HTMLElement
export type CodeProps = HTMLAttributes<CodeRef>

/**
 * Render the code component.
 * @param {CodeProps} props - The code component properties.
 * @param {CodeRef} ref - The code component reference.
 * @returns The rendered code component.
 */
const Code = forwardRef<CodeRef, CodeProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <code ref={ref} {...rest}>
      {children}
    </code>
  )
})

Code.displayName = 'Code'

export default Code
