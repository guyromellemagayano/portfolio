import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SummaryClient = lazy(async () => {
  const module = await import("./Sup.client");
  return { default: module.SummaryClient };
});

export type SummaryRef = React.ElementRef<"sup">;
export type SummaryProps = React.ComponentPropsWithoutRef<"sup"> &
  CommonComponentProps;

/**
 * Render the default superscript server component.
 * @param {SummaryProps} props - The default superscript server component properties
 * @returns The rendered default superscript server component
 */
export const Summary = ({
  isClient = false,
  children,
  ...rest
}: SummaryProps) => {
  const element = <sup {...rest}>{children}</sup>;

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
