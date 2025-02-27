import { type LinkHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const LinkClient = lazy(async () => {
  const module = await import("./Link.client");
  return { default: module.LinkClient };
});

export type LinkRef = HTMLLinkElement;
export type LinkProps = LinkHTMLAttributes<LinkRef> & CommonComponentProps;

/**
 * Render the default external resource link server component.
 * @param {LinkProps} props - The default external resource link server component properties
 * @returns The rendered default external resource link server component
 */
export const Link = ({ isClient = false, ...rest }: LinkProps) => {
  const element = <link {...rest} />;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <LinkClient {...rest} />
      </Suspense>
    );
  }

  return element;
};

Link.displayName = "Link";
