"use client";

import React, { memo } from "react";

import { Paragraph, type ParagraphProps, type ParagraphRef } from ".";

/**
 * Render the paragraph client component.
 */
export const ParagraphClient = React.forwardRef<ParagraphRef, ParagraphProps>(
  (props, ref) => <Paragraph ref={ref} {...props} />
);

ParagraphClient.displayName = "ParagraphClient";

/**
 * Memoized version of `ParagraphClient` for performance optimization.
 */
export const MemoizedParagraphClient = memo(ParagraphClient);
