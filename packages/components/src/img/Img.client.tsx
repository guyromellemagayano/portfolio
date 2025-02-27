"use client";

import { forwardRef } from "react";

import type { ImgProps, ImgRef } from "./Img";

/**
 * Render the image embed client component.
 * @param {ImgProps} props - The image embed client component properties
 * @param {ImgRef} ref - The image embed client component reference
 * @returns The rendered image embed client component
 */
export const ImgClient = forwardRef<ImgRef, ImgProps>(
  ({ src = "#", alt = "", ...rest }, ref) => {
    return <img ref={ref} src={src} alt={alt} {...rest} />;
  }
);

ImgClient.displayName = "ImgClient";
