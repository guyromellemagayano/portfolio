import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Converts an array of strings to a URL slug. */
export const arrayToUrlSlug = (array: string[]): string =>
  array
    ?.map((item) => item.toLowerCase().replace(/[\s\W-]+/g, "/"))
    ?.join("-") ?? "";

/** Merges multiple class names into a single string. */
export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes));

/** Checks if a path is active. */
export const isActivePath = (
  pathname: string | null | undefined,
  href: string
): boolean => {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
};

/** Clamps a value between a minimum and maximum. */
export const clamp = (value: number, min: number, max: number): number => {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
};
