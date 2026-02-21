"use client";

import React, { memo } from "react";

import { Section, type SectionProps, type SectionRef } from ".";

/** Render the generic section client component. */
export const SectionClient = React.forwardRef<SectionRef, SectionProps>(
  (props, ref) => <Section ref={ref} {...props} />
);

SectionClient.displayName = "SectionClient";

/** Memoized version of `SectionClient` for performance optimization. */
export const MemoizedSectionClient = memo(SectionClient);
