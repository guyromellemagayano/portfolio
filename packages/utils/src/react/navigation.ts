// ============================================================================
// REACT FRAMEWORK NAVIGATION UTILITIES
// ============================================================================

/**
 * Validates if navigation links data is valid and usable.
 *
 * @param links - The navigation links data to validate
 * @returns `true` if the links data is valid and contains items, `false` otherwise
 */
export function hasValidNavigationLinks<
  T extends
    | { readonly label?: any; readonly href?: any }
    | { label?: any; href?: any },
>(links: readonly T[] | T[] | null | undefined): links is readonly T[] | T[] {
  return Boolean(links && Array.isArray(links) && links.length > 0);
}

/**
 * Validates if a single navigation link item is valid.
 *
 * @param link - The navigation link item to validate
 * @returns `true` if the link has both label and href, `false` otherwise
 */
export function isValidNavigationLink<
  T extends
    | { readonly label?: any; readonly href?: any }
    | { label?: any; href?: any },
>(link: T): link is T & { label: string; href: string } {
  return Boolean(
    link &&
      typeof link.label === "string" &&
      link.label.length > 0 &&
      typeof link.href === "string" &&
      link.href.length > 0
  );
}

/**
 * Filters navigation links to only include valid items.
 * Automatically handles readonly arrays and other array-like structures.
 *
 * @param links - The navigation links array to filter (can be readonly or mutable)
 * @returns A new array containing only valid navigation links
 */
export function filterValidNavigationLinks<
  T extends
    | { readonly label?: any; readonly href?: any }
    | { label?: any; href?: any },
>(
  links: readonly T[] | T[] | null | undefined
): (T & { label: string; href: string })[] {
  if (!hasValidNavigationLinks(links)) {
    return [];
  }

  // Convert readonly arrays to mutable arrays for processing
  const mutableLinks = Array.from(links as T[]);
  return mutableLinks.filter(
    (link): link is T & { label: string; href: string } => {
      return Boolean(
        link &&
          typeof link.label === "string" &&
          link.label.length > 0 &&
          typeof link.href === "string" &&
          link.href.length > 0
      );
    }
  );
}
