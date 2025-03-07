import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const HtmlClient = lazy(async () => {
  const module = await import("./Html.client");
  return { default: module.HtmlClient };
});

export type HtmlRef = React.ElementRef<"html">;
export type HtmlProps = React.ComponentPropsWithoutRef<"html"> &
  CommonComponentProps;

/**
 * Render the default HTML document/root server component.
 * @param {HtmlProps} props - The default HTML document/root server component properties
 * @returns The rendered default HTML document/root server component
 */
export const Html = ({ isClient = false, children, ...rest }: HtmlProps) => {
  const element = <html {...rest}>{children}</html>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <HtmlClient {...rest}>{children}</HtmlClient>
      </Suspense>
    );
  }

  return element;
};

Html.displayName = "Html";
