import { HTMLAttributes, forwardRef } from 'react'

export type SampleRef = HTMLElement
export type SampleProps = HTMLAttributes<SampleRef>

/**
 * Render the sample component.
 * @param children - The children of the sample.
 * @param rest - The rest of the props of the sample.
 * @returns The rendered sample component.
 */
const Sample = forwardRef<SampleRef, SampleProps>(
  ({ children, ...rest }, ref) => {
    return (
      <samp ref={ref} {...rest}>
        {children}
      </samp>
    )
  }
)

Sample.displayName = 'Sample'

export default Sample
