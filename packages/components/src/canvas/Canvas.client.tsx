"use client";

import { type CanvasHTMLAttributes, forwardRef } from "react";

import type { CommonComponentProps } from "../components";

export type CanvasRef = HTMLCanvasElement;
export type CanvasProps = CanvasHTMLAttributes<CanvasRef> &
  CommonComponentProps;

/**
 * Render the canvas client component.
 * @param {CanvasProps} props - The canvas client component properties
 * @param {CanvasRef} ref - The canvas client component reference
 * @returns The rendered canvas client component
 */
export const CanvasClient = forwardRef<CanvasRef, CanvasProps>(
  ({ children, ...rest }, ref) => {
    return (
      <canvas ref={ref} {...rest}>
        {children}
      </canvas>
    );
  }
);

CanvasClient.displayName = "CanvasClient";
