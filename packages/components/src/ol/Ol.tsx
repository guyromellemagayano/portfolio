import { type OlHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const OlClient = lazy(async () => {
  const module = await import("./Ol.client");
  return { default: module.OlClient };
});

export type OlRef = HTMLOListElement;
export type OlProps = OlHTMLAttributes<OlRef> & CommonComponentProps;

/**
 * Render the default ordered list server component.
 * @param {OlProps} props - The default ordered list server component properties
 * @returns The rendered default ordered list server component
 */
export const Ol = ({ isClient = false, children, ...rest }: OlProps) => {
  const element = <ol {...rest}>{children}</ol>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <OlClient {...rest}>{children}</OlClient>
      </Suspense>
    );
  }

  return element;
};

Ol.displayName = "Ol";
