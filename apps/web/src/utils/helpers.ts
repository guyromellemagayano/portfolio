import React from "react";

import { type ClassValue, clsx } from "clsx";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

/** Converts an array of strings to a URL slug. */
export function arrayToUrlSlug(array: string[]): string {
  return (
    array
      ?.map((item) => item.toLowerCase().replace(/[\s\W-]+/g, "/"))
      ?.join("-") ?? ""
  );
}

/** Merges multiple class names into a single string. */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

/** Checks if a path is active. */
export function isActivePath(
  pathname: string | null | undefined,
  href: React.ComponentProps<typeof Link>["href"]
): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** Clamps a value between a minimum and maximum. */
export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/** Checks if a value is a valid string. */
export function isValidString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}
