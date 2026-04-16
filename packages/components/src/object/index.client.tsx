"use client";

import React, { memo } from "react";

import { Object, type ObjectProps, type ObjectRef } from ".";

/** Render the object client component. */
export const ObjectClient = React.forwardRef<ObjectRef, ObjectProps>(
  (props, ref) => <Object ref={ref} {...props} />
);

ObjectClient.displayName = "ObjectClient";

/** Memoized version of `ObjectClient` for performance optimization. */
export const MemoizedObjectClient = memo(ObjectClient);
