"use client";

import React, { memo } from "react";

import { Img, type ImgProps, type ImgRef } from ".";

/** Render the image embed client component. */
export const ImgClient = React.forwardRef<ImgRef, ImgProps>((props, ref) => (
  <Img ref={ref} {...props} />
));

ImgClient.displayName = "ImgClient";

/** Memoized version of `ImgClient` for performance optimization. */
export const MemoizedImgClient = memo(ImgClient);
