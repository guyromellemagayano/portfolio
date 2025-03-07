import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const OutputClient = lazy(async () => {
  const module = await import("./Output.client");
  return { default: module.OutputClient };
});

export type OutputRef = React.ElementRef<"output">;
export type OutputProps = React.ComponentPropsWithoutRef<"output"> &
  CommonComponentProps;

/**
 * Render the default output server component.
 * @param {OutputProps} props - The default output server component properties
 * @returns The rendered default output server component
 */
export const Output = ({
  isClient = false,
  children,
  ...rest
}: OutputProps) => {
  const element = <output {...rest}>{children}</output>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OutputClient {...rest}>{children}</OutputClient>
      </Suspense>
    );
  }

  return element;
};

Output.displayName = "Output";
