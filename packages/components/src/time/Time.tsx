import { type TimeHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TimeClient = lazy(async () => {
  const module = await import("./Time.client");
  return { default: module.TimeClient };
});

export type TimeRef = React.ElementRef<"time">;
export type TimeProps = React.ComponentPropsWithoutRef<"time"> &
  CommonComponentProps;

/**
 * Render the default (date) time server component.
 * @param {TimeProps} props - The default (date) time server component properties
 * @returns The rendered default (date) time server component
 */
export const Time = ({ isClient = false, children, ...rest }: TimeProps) => {
  const element = <time {...rest}>{children}</time>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <TimeClient {...rest}>{children}</TimeClient>
      </Suspense>
    );
  }

  return element;
};

Time.displayName = "Time";
