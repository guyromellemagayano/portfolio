"use client";

import { forwardRef } from "react";

import type { OptgroupProps, OptgroupRef } from "./Optgroup";

/**
 * Render the option group client component.
 * @param {OptgroupProps} props - The option group client component properties
 * @param {OptgroupRef} ref - The option group client component reference
 * @returns The rendered option group client component
 */
export const OptgroupClient = forwardRef<OptgroupRef, OptgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <optgroup ref={ref} {...rest}>
        {children}
      </optgroup>
    );
  }
);

OptgroupClient.displayName = "OptgroupClient";
