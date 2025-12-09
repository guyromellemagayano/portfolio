/**
 * Validates if a URL is valid and not a placeholder. Checks that `href` is provided \
 * and not an empty string or placeholder value. Useful for preventing broken links \
 * and ensuring proper link behavior.
 */
export const isValidLink = (
  href?: string | { toString(): string }
): boolean => {
  if (!href) return false;

  // Convert to string for validation
  const hrefString = typeof href === "string" ? href : href?.toString() || "";

  if (hrefString === "#" || hrefString === "") return false;
  return true;
};

/**
 * Gets safe link target attributes for external links. Automatically determines \
 * appropriate `target` and `rel` attributes based on link type and user \
 * preferences. Ensures security best practices for external links.
 */
export const getLinkTargetProps = (
  href?: string | { toString(): string },
  target?: string
): {
  target: string;
  rel?: string;
} => {
  if (!isValidLink(href)) {
    return { target: "_self" };
  }

  // Convert to string for validation
  const hrefString = typeof href === "string" ? href : href?.toString() || "";

  const isExternal = hrefString?.startsWith("http");
  const shouldOpenNewTab =
    target === "_blank" || (isExternal && target !== "_self");

  return {
    target: shouldOpenNewTab ? "_blank" : "_self",
    rel: shouldOpenNewTab ? "noopener noreferrer" : undefined,
  };
};

/**
 * Validates and provides default values for common link props. \
 * Ensures link components have consistent, safe default values \
 * for `href`, `target`, and `title` attributes.
 */
export const getDefaultLinkProps = (props: {
  href?: string | { toString(): string };
  target?: string;
  title?: string;
}): {
  href: string;
  target: string;
  title: string;
} => {
  const hrefString =
    typeof props.href === "string" ? props.href : props.href?.toString() || "";

  return {
    href: hrefString || "#",
    target: props.target || "_self",
    title: props.title || "",
  };
};
