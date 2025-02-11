'use client';

import { type CanvasHTMLAttributes, forwardRef } from 'react';

export type TCanvasRef = HTMLCanvasElement;
export type TCanvasProps = CanvasHTMLAttributes<TCanvasRef>;

/**
 * Render the canvas component.
 * @param {TCanvasProps} props - The canvas component properties
 * @param {TCanvasRef} ref - The canvas component reference
 * @returns The rendered canvas component
 */
const Canvas = forwardRef<TCanvasRef, TCanvasProps>(({ ...rest }, ref) => {
  return <canvas ref={ref} {...rest} />;
});

Canvas.displayName = 'Canvas';

export default Canvas;
