'use client'

import { CanvasHTMLAttributes, forwardRef } from 'react'

export type CanvasRef = HTMLCanvasElement
export type CanvasProps = CanvasHTMLAttributes<CanvasRef>

/**
 * Render the canvas component.
 * @param {CanvasProps} props - The canvas component properties.
 * @param {CanvasRef} ref - The canvas component reference.
 * @returns The rendered canvas component.
 */
const Canvas = forwardRef<CanvasRef, CanvasProps>((props, ref) => {
  const { children, ...rest } = props

  return (
    <canvas ref={ref} {...rest}>
      {children}
    </canvas>
  )
})

Canvas.displayName = 'Canvas'

export default Canvas
