import { HTMLAttributes, forwardRef } from 'react'

export type SummaryRef = HTMLElement
export type SummaryProps = HTMLAttributes<SummaryRef>

/**
 * Render the summary component.
 * @param {SummaryProps} props - The summary component properties.
 * @param {SummaryRef} ref - The summary component reference.
 * @returns The rendered summary component.
 */
const Summary = forwardRef<SummaryRef, SummaryProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <summary ref={ref} {...rest}>
      {children}
    </summary>
  )
})

Summary.displayName = 'Summary'

export default Summary
