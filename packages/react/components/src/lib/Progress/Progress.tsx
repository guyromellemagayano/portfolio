'use client'

import React from 'react'

export type ProgressRef = HTMLProgressElement
export type ProgressProps = React.ProgressHTMLAttributes<ProgressRef>

/**
 * Render the progress component
 * @param {ProgressProps} props - The progress component properties
 * @param {ProgressRef} ref - The progress component reference
 * @returns The rendered progress component
 */
const Progress = React.forwardRef<ProgressRef, ProgressProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <progress ref={ref} {...rest}>
      {children}
    </progress>
  )
})

Progress.displayName = 'Progress'

export default Progress
