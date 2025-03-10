import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const SampClient = lazy(async () => {
  const module = await import("./Samp.client");
  return { default: module.SampClient };
});

export type SampRef = React.ElementRef<"samp">;
export type SampProps = React.ComponentPropsWithoutRef<"samp"> &
  CommonComponentProps;

/**
 * Render the default sample output server component.
 * @param {SampProps} props - The default sample output server component properties
 * @returns The rendered default sample output server component
 */
export const Samp = ({ isClient = false, children, ...rest }: SampProps) => {
  const element = <samp {...rest}>{children}</samp>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <SampClient {...rest}>{children}</SampClient>
      </Suspense>
    );
  }

  return element;
};

Samp.displayName = "Samp";
