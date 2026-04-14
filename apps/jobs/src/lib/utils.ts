/**
 * @file apps/jobs/src/lib/utils.ts
 * @author Guy Romelle Magayano
 * @description Shared utility helpers for shadcn-style component composition in the jobs app.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merges conditional class names with Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
