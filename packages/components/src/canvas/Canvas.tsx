import { type CanvasHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const CanvasClient = lazy(async () => {
  const module = await import("./Canvas.client");
  return { default: module.default };
});

export type CanvasRef = HTMLCanvasElement;
export type CanvasProps = CanvasHTMLAttributes<CanvasRef> &
  CommonComponentProps;

/**
 * Render the default canvas server component.
 * @param {CanvasProps} props - The default canvas server component properties
 * @returns The rendered default canvas server component
 */
const Canvas = ({ isClient = false, children, ...rest }: CanvasProps) => {
  const element = <canvas {...rest}>{children}</canvas>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <CanvasClient {...rest}>{children} </CanvasClient>
      </Suspense>
    );
  }

  return element;
};

Canvas.displayName = "Canvas";

export default Canvas;
