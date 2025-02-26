"use client";

import { forwardRef } from "react";

import type { HgroupProps, HgroupRef } from "./Hgroup";

/**
 * Render the heading group client component.
 * @param {HgroupProps} props - The heading group client component properties
 * @param {HgroupRef} ref - The heading group client component reference
 * @returns The rendered heading group client component
 */
export const HgroupClient = forwardRef<HgroupRef, HgroupProps>(
  ({ children, ...rest }, ref) => {
    return (
      <hgroup ref={ref} {...rest}>
        {children}
      </hgroup>
    );
  }
);

HgroupClient.displayName = "HgroupClient";
