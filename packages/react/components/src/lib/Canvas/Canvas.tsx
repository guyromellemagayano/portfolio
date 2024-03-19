import { CanvasHTMLAttributes, forwardRef } from 'react'

import { customId } from '@guy-romelle-magayano/react-utils/server'

export type CanvasRef = HTMLCanvasElement
export type CanvasProps = CanvasHTMLAttributes<CanvasRef>

/**
 * Render the canvas component.
 * @param children - The children of the canvas.
 * @param rest - The rest of the props of the canvas.
 * @returns The rendered canvas component.
 */
const Canvas = forwardRef<CanvasRef, CanvasProps>(
  ({ children, ...rest }, ref) => {
    return (
      <canvas ref={ref} {...rest} id={rest.id ?? customId}>
        {children}
      </canvas>
    )
  }
)

Canvas.displayName = 'Canvas'

export default Canvas
