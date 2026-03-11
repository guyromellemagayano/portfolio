"use client";

import React, { memo } from "react";

import { Svg, type SvgProps, type SvgRef } from ".";

/** Render the scalable vector graphics client component. */
export const SvgClient = React.forwardRef<SvgRef, SvgProps>((props, ref) => (
  <Svg ref={ref} {...props} />
));

SvgClient.displayName = "SvgClient";

/** Memoized version of `SvgClient` for performance optimization. */
export const MemoizedSvgClient = memo(SvgClient);
