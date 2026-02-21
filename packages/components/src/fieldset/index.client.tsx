"use client";

import React, { memo } from "react";

import { Fieldset, type FieldsetProps, type FieldsetRef } from ".";

/** Render the field set client component. */
export const FieldsetClient = React.forwardRef<FieldsetRef, FieldsetProps>(
  (props, ref) => <Fieldset ref={ref} {...props} />
);

FieldsetClient.displayName = "FieldsetClient";

/** Memoized version of `FieldsetClient` for performance optimization. */
export const MemoizedFieldsetClient = memo(FieldsetClient);
