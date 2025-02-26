import { type HTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const HeaderClient = lazy(async () => {
  const module = await import("./Header.client");
  return { default: module.HeaderClient };
});

export type HeaderRef = HTMLElement;
export type HeaderProps = HTMLAttributes<HeaderRef> & CommonComponentProps;

/**
 * Render the default header server component.
 * @param {HeaderProps} props - The default header server component properties
 * @returns The rendered default header server component
 */
export const Header = ({
  isClient = false,
  children,
  ...rest
}: HeaderProps) => {
  const element = <header {...rest}>{children}</header>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <HeaderClient {...rest}>{children}</HeaderClient>
      </Suspense>
    );
  }

  return element;
};

Header.displayName = "Header";
