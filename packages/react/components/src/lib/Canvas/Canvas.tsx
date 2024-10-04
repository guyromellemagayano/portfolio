import React from 'react'

export type TCanvasRef = HTMLCanvasElement
export type TCanvasProps = React.CanvasHTMLAttributes<TCanvasRef>

/**
 * Render the canvas component.
 * @param {TCanvasProps} props - The canvas component properties
 * @param {TCanvasRef} ref - The canvas component reference
 * @returns The rendered canvas component
 */
const Canvas = React.forwardRef<TCanvasRef, TCanvasProps>(
  ({ children, ...rest }, ref) => {
    return (
      <canvas ref={ref} {...rest}>
        {children}
      </canvas>
    )
  }
)

Canvas.displayName = 'Canvas'

export default Canvas
