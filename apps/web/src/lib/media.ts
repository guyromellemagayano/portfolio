/**
 * @file apps/web/src/lib/media.ts
 * @author Guy Romelle Magayano
 * @description Shared media source helpers for Astro/Vite image imports.
 */

export type ImageSource =
  | string
  | {
      src: string;
      height?: number;
      width?: number;
    };

/** Resolves a browser-safe image source from a string or Vite image metadata object. */
export function getImageSource(source: ImageSource): string {
  return typeof source === "string" ? source : source.src;
}

/** Resolves optional intrinsic image dimensions from Vite image metadata. */
export function getImageDimensions(source: ImageSource): {
  height?: number;
  width?: number;
} {
  return typeof source === "string"
    ? {}
    : {
        height: source.height,
        width: source.width,
      };
}
