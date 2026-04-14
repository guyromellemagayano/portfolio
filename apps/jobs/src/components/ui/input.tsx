/**
 * @file apps/jobs/src/components/ui/input.tsx
 * @author Guy Romelle Magayano
 * @description Shadcn-style input primitive for forms across the jobs app.
 */

import type { ComponentProps } from "react";

import { cn } from "@jobs/lib/utils";

export type InputProps = ComponentProps<"input">;

/** Renders a text input using the jobs app shadcn-style field styling. */
export function Input(props: InputProps) {
  const { className, ...rest } = props;

  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition-colors outline-none placeholder:text-zinc-400 focus:border-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-900/10 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      data-slot="input"
      {...rest}
    />
  );
}
