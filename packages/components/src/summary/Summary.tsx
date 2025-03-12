import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SummaryClient = lazy(async () => {
  const module = await import("./Summary.client");
  return { default: module.SummaryClient };
});

export type SummaryRef = React.ElementRef<"summary">;
export type SummaryProps = React.ComponentPropsWithoutRef<"summary"> &
  CommonComponentProps;

/**
 * Render the default disclosure summary server component.
 * @param {SummaryProps} props - The default disclosure summary server component properties
 * @returns The rendered default disclosure summary server component
 */
export const Summary = ({
  isClient = false,
  children,
  ...rest
}: SummaryProps) => {
  const element = <summary {...rest}>{children}</summary>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SummaryClient {...rest}>{children}</SummaryClient>
      </Suspense>
    );
  }

  return element;
};

Summary.displayName = "Summary";
