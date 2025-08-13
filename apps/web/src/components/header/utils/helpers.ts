/** Clamp a number between a and b. */
export const clamp = function (number: number, a: number, b: number): number {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.min(Math.max(number, min), max);
};

/** Safer active-path matching: exact or segment-boundary prefix */
export const isActivePath = function (
  pathname: string | null,
  href: string
): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};
