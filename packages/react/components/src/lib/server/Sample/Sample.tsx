import { HTMLAttributes, forwardRef } from 'react'

export type SampleRef = HTMLElement
export type SampleProps = HTMLAttributes<SampleRef>

/**
 * Render the sample component.
 * @param {SampleProps} props - The sample component properties.
 * @param {SampleRef} ref - The sample component reference.
 * @returns The rendered sample component.
 */
const Sample = forwardRef<SampleRef, SampleProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <samp ref={ref} {...rest}>
      {children}
    </samp>
  )
})

Sample.displayName = 'Sample'

export default Sample
