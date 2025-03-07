import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const ProgressClient = lazy(async () => {
  const module = await import("./Progress.client");
  return { default: module.ProgressClient };
});

export type ProgressRef = React.ElementRef<"progress">;
export type ProgressProps = React.ComponentPropsWithoutRef<"progress"> &
  CommonComponentProps;

/**
 * Render the default progress indicator server component.
 * @param {ProgressProps} props - The default progress indicator server component properties
 * @returns The rendered default progress indicator server component
 */
export const Progress = ({
  isClient = false,
  children,
  ...rest
}: ProgressProps) => {
  const element = <progress {...rest}>{children}</progress>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <ProgressClient {...rest}>{children}</ProgressClient>
      </Suspense>
    );
  }

  return element;
};

Progress.displayName = "Progress";
