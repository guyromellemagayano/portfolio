"use client";

import { forwardRef } from "react";

import type { FieldsetProps, FieldsetRef } from "./Fieldset";

/**
 * Render the field set client component.
 * @param {FieldsetProps} props - The field set client component properties
 * @param {FieldsetRef} ref - The field set client component reference
 * @returns The rendered field set client component
 */
export const FieldsetClient = forwardRef<FieldsetRef, FieldsetProps>(
  ({ children, ...rest }, ref) => {
    return (
      <fieldset ref={ref} {...rest}>
        {children}
      </fieldset>
    );
  }
);

FieldsetClient.displayName = "FieldsetClient";
