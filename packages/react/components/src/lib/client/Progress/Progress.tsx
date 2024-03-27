'use client'

import { ProgressHTMLAttributes, forwardRef } from 'react'

export type ProgressRef = HTMLProgressElement
export type ProgressProps = ProgressHTMLAttributes<ProgressRef>

/**
 * Render the progress component.
 * @param children - The children of the progress.
 * @param rest - The rest of the props of the progress.
 * @returns The rendered progress component.
 */
export const Progress = forwardRef<ProgressRef, ProgressProps>(
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
