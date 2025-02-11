import React from 'react'

export type TProgressRef = HTMLProgressElement
export type TProgressProps = React.ProgressHTMLAttributes<TProgressRef>

/**
 * Render the progress component.
 * @param {TProgressProps} props - The progress component properties
 * @param {TProgressRef} ref - The progress component reference
 * @returns The rendered progress component
 */
const Progress = React.forwardRef<TProgressRef, TProgressProps>(
  ({ children, ...rest }, ref) => {
    return (
      <progress ref={ref} {...rest}>
        {children}
      </progress>
    )
  }
)

Progress.displayName = 'Progress'

export default Progress
