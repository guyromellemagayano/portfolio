"use client";

import { forwardRef } from "react";

import type { ObjectProps, ObjectRef } from "./Object";

/**
 * Render the object client component.
 * @param {ObjectProps} props - The object client component properties
 * @param {ObjectRef} ref - The object client component reference
 * @returns The rendered object client component
 */
export const ObjectClient = forwardRef<ObjectRef, ObjectProps>(
  ({ children, ...rest }, ref) => {
    return (
      <object ref={ref} {...rest}>
        {children}
      </object>
    );
  }
);

ObjectClient.displayName = "ObjectClient";
