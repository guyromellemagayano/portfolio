import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const HeadClient = lazy(async () => {
  const module = await import("./Head.client");
  return { default: module.HeadClient };
});

export type HeadRef = React.ElementRef<"head">;
export type HeadProps = React.ComponentPropsWithoutRef<"head"> &
  CommonComponentProps;

/**
 * Render the default document metadata (header) server component.
 * @param {HeadProps} props - The default document metadata (header) server component properties
 * @returns The rendered default document metadata (header) server component
 */
export const Head = ({ isClient = false, children, ...rest }: HeadProps) => {
  const element = <head {...rest}>{children}</head>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <HeadClient {...rest}>{children}</HeadClient>
      </Suspense>
    );
  }

  return element;
};

Head.displayName = "Head";
