"use client";

import React, { memo } from "react";

import { Template, type TemplateProps, type TemplateRef } from ".";

/** Render the content template client component. */
export const TemplateClient = React.forwardRef<TemplateRef, TemplateProps>(
  (props, ref) => <Template ref={ref} {...props} />
);

TemplateClient.displayName = "TemplateClient";

/** Memoized version of `TemplateClient` for performance optimization. */
export const MemoizedTemplateClient = memo(TemplateClient);
