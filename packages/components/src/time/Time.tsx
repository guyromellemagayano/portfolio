import { type TimeHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const TimeClient = lazy(async () => {
  const module = await import("./Time.client");
  return { default: module.TimeClient };
});

export type TimeRef = HTMLTimeElement;
export type TimeProps = TimeHTMLAttributes<TimeRef> & CommonComponentProps;

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
