/**
 * @file helpers.ts
 * @author Guy Romelle Magayano
 * @description Utility functions for the web application.
 */

import { type ComponentPropsWithoutRef } from "react";

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
  href: ComponentPropsWithoutRef<typeof Link>["href"]
): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** Clamps a value between a minimum and maximum. */
export function clamp(value: number, a: number, b: number): number {
  let min = Math.min(a, b);
  let max = Math.max(a, b);

  // Handle NaN input by returning the minimum value
  if (isNaN(value)) {
    return min;
  }

  return Math.min(Math.max(value, min), max);
}

/** Checks if a value is a valid string. */
export function isValidString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/** Parses a role date (string or object) into label and dateTime. */
export function parseRoleDate(
  date: string | { label: string; dateTime: string }
): { label: string; dateTime: string } {
  return typeof date === "string" ? { label: date, dateTime: date } : date;
}

/** Generates a unique key for a role list item. */
export function getRoleItemKey(
  role: { company: string; title: string },
  index: number
): string {
  return `${role.company}-${role.title}-${index}`;
}
