import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Converts an array of strings to a URL slug.
 */
export const arrayToUrlSlug = (array: string[]): string =>
  array
    ?.map((item) => item.toLowerCase().replace(/[\s\W-]+/g, "/"))
    ?.join("-") ?? "";

/**
 * Merges multiple class names into a single string.
 */
export const cn = (...classes: ClassValue[]): string => twMerge(clsx(classes));
