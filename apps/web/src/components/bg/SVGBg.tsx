/**
 * @file SVGBg.tsx
 * @author Guy Romelle Magayano
 * @description SVG background component for the web application.
 */

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

import { cn } from "@web/utils/helpers";

// ============================================================================
// SVG COMPONENT
// ============================================================================

export type SVGElementType = "svg";
export type SVGProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<SVGElementType>,
  "as"
> &
  P & {
    as?: SVGElementType;
  };

export function SVGComponent<P extends Record<string, unknown> = {}>(
  props: SVGProps<P>
) {
  const { as: Component = "svg", children, className, ...rest } = props;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SVGElementType>)}
      className={cn(
        "absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-zinc-200 dark:stroke-zinc-800",
        className
      )}
      aria-hidden="true"
    >
      <defs>
        <pattern
          x="50%"
          y={-1}
          id="e813992c-7d03-4cc4-a2bd-151760b470a0"
          width={200}
          height={200}
          patternUnits="userSpaceOnUse"
        >
          <path d="M100 200V.5M.5 .5H200" fill="none" />
        </pattern>
      </defs>
      <svg
        x="50%"
        y={-1}
        className="overflow-visible fill-zinc-50 dark:fill-zinc-800/50"
      >
        <path
          d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
          strokeWidth={0}
        />
      </svg>
      <rect
        fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)"
        width="100%"
        height="100%"
        strokeWidth={0}
      />
      {children}
    </Component>
  );
}

SVGComponent.displayName = "SVGComponent";

// ============================================================================
// SVG BACKGROUND COMPONENT
// ============================================================================

export type SVGBgElementType = "div";
export type SVGBgProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<SVGBgElementType>,
  "as"
> &
  P & {
    as?: SVGBgElementType;
  };

export function SVGBg<P extends Record<string, unknown> = {}>(
  props: SVGBgProps<P>
) {
  const { as: Component = "div", className, ...rest } = props;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SVGBgElementType>)}
      className={cn("fixed inset-0 flex justify-center sm:px-8", className)}
    >
      <div className="flex w-full max-w-7xl lg:px-8">
        <div className="absolute inset-0 isolate -z-10 flex justify-center overflow-hidden sm:px-8">
          <SVGComponent />
        </div>
      </div>
    </Component>
  );
}

SVGBg.displayName = "SVGBg";
