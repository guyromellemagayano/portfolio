/** Validates if navigation links data is valid and usable. */
export const hasValidNavigationLinks = <
  T extends
    | { readonly label?: any; readonly href?: any }
    | { label?: any; href?: any },
>(
  links: readonly T[] | T[] | null | undefined
): links is readonly T[] | T[] => {
  return Boolean(links && Array.isArray(links) && links.length > 0);
};

/** Validates if a single navigation link item is valid. */
export const isValidNavigationLink = <
  T extends
    | { readonly label?: any; readonly href?: any }
    | { label?: any; href?: any },
>(
  link: T
): link is T & { label: string; href: string } => {
  return Boolean(
    link &&
    typeof link.label === "string" &&
    link.label.length > 0 &&
    typeof link.href === "string" &&
    link.href.length > 0
  );
};

/**
 * Filters navigation links to only include valid items. Automatically handles \
 * readonly arrays and other array-like structures.
 */
export const filterValidNavigationLinks = <
  T extends
    | { readonly label?: any; readonly href?: any }
    | { label?: any; href?: any },
>(
  links: readonly T[] | T[] | null | undefined
): (T & { label: string; href: string })[] => {
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
};
