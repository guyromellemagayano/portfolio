/** Exact or segment-boundary prefix (avoids "/pro" matching "/projects"). */
export function isActivePath(
  pathname: string | null | undefined,
  href: string
) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}
