/**
 * Validates if an image source is valid and usable. Handles both string URLs \
 * and `StaticImageData` objects (imported images). Useful for preventing broken \
 * images and ensuring proper image rendering.
 */
export const isValidImageSrc = (
  src?: string | { src: string } | { default: { src: string } }
): boolean => {
  if (!src) return false;

  // Handle `StaticImageData` (imported images) with `src` property
  if (typeof src === "object" && "src" in src) {
    const srcValue = src.src;
    if (typeof srcValue !== "string") return false;
    const trimmedSrc = srcValue.trim();
    return trimmedSrc.length > 0;
  }

  // Handle `StaticImageData` with default property (Next.js style)
  if (
    typeof src === "object" &&
    "default" in src &&
    src.default &&
    "src" in src.default
  ) {
    const srcValue = src.default.src;
    if (typeof srcValue !== "string") return false;
    const trimmedSrc = srcValue.trim();
    return trimmedSrc.length > 0;
  }

  // Handle string URLs
  if (typeof src === "string") {
    const trimmedSrc = src.trim();

    // Reject empty strings, "#", or only-fragment values
    if (
      trimmedSrc.length === 0 ||
      trimmedSrc === "#" ||
      trimmedSrc.startsWith("#")
    ) {
      return false;
    }

    // Allow data URLs
    if (trimmedSrc.startsWith("data:")) {
      return true;
    }

    // Validate as well-formed URL
    try {
      new URL(trimmedSrc);
      return true;
    } catch {
      return false;
    }
  }

  return false;
};
