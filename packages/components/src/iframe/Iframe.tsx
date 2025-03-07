import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const IframeClient = lazy(async () => {
  const module = await import("./Iframe.client");
  return { default: module.IframeClient };
});

export type IframeRef = React.ElementRef<"iframe">;
export type IframeProps = React.ComponentPropsWithoutRef<"iframe"> &
  CommonComponentProps;

/**
 * Render the default inline frame server component.
 * @param {IframeProps} props - The default inline frame server component properties
 * @returns The rendered default inline frame server component
 */
export const Iframe = ({ isClient = false, ...rest }: IframeProps) => {
  const element = <iframe {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <IframeClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Iframe.displayName = "Iframe";
