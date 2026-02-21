"use client";

import React, { memo } from "react";

import { Figcaption, type FigcaptionProps, type FigcaptionRef } from ".";

/** Render the figure caption client component. */
export const FigcaptionClient = React.forwardRef<
  FigcaptionRef,
  FigcaptionProps
>((props, ref) => <Figcaption ref={ref} {...props} />);

FigcaptionClient.displayName = "FigcaptionClient";

/** Memoized version of `FigcaptionClient` for performance optimization. */
export const MemoizedFigcaptionClient = memo(FigcaptionClient);
