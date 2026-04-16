"use client";

import React, { memo } from "react";

import { Html, type HtmlProps, type HtmlRef } from ".";

/** Render the HTML document/root client component. */
export const HtmlClient = React.forwardRef<HtmlRef, HtmlProps>((props, ref) => (
  <Html ref={ref} {...props} />
));

HtmlClient.displayName = "HtmlClient";

/** Memoized version of `HtmlClient` for performance optimization. */
export const MemoizedHtmlClient = memo(HtmlClient);
