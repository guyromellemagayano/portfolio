import { type HtmlHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const HtmlClient = lazy(async () => {
  const module = await import("./Html.client");
  return { default: module.default };
});

export type HtmlRef = HTMLHtmlElement;
export type HtmlProps = HtmlHTMLAttributes<HtmlRef> & CommonComponentProps;

/**
 * Render the default HTML server component.
 * @param {HtmlProps} props - The default HTML server component properties
 * @returns The rendered default HTML server component
 */
const Html = ({ isClient = false, children, ...rest }: HtmlProps) => {
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

export default Html;
