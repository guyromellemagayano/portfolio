import React from "react";

import { type ClassValue, clsx } from "clsx";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

/** Converts an array of strings to a URL slug. */
function arrayToUrlSlug(array: string[]): string {
  return (
    array
      ?.map((item) => item.toLowerCase().replace(/[\s\W-]+/g, "/"))
      ?.join("-") ?? ""
  );
}

/** Merges multiple class names into a single string. */
function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

/** Checks if a path is active. */
function isActivePath(
  pathname: string | null | undefined,
  href: React.ComponentProps<typeof Link>["href"]
): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** Clamps a value between a minimum and maximum. */
function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

export { arrayToUrlSlug, clamp, cn, isActivePath };
