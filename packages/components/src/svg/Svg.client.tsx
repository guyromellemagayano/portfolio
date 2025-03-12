"use client";

import { forwardRef } from "react";

import type { SvgProps, SvgRef } from "./Svg";

/**
 * Render the scalable vector graphics client component.
 * @param {SvgProps} props - The scalable vector graphics client component properties
 * @param {SvgRef} ref - The scalable vector graphics client component reference
 * @returns The rendered scalable vector graphics client component
 */
export const SvgClient = forwardRef<SvgRef, SvgProps>(
  ({ children, ...rest }, ref) => {
    return (
      <svg ref={ref} {...rest}>
        {children}
      </svg>
    );
  }
);

SvgClient.displayName = "SvgClient";
