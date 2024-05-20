import { HTMLAttributes, forwardRef } from 'react'

export type BoldRef = HTMLElement
export type BoldProps = HTMLAttributes<BoldRef>

/**
 * Render the bold component.
 * @param {BoldProps} props - The bold component properties.
 * @param {BoldRef} ref - The bold component reference.
 * @returns The rendered bold component.
 */
const Bold = forwardRef<BoldRef, BoldProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <b ref={ref} {...rest}>
      {children}
    </b>
  )
})

Bold.displayName = 'Bold'

export default Bold
