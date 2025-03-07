import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const FooterClient = lazy(async () => {
  const module = await import("./Footer.client");
  return { default: module.FooterClient };
});

export type FooterRef = React.ElementRef<"footer">;
export type FooterProps = React.ComponentPropsWithoutRef<"footer"> &
  CommonComponentProps;

/**
 * Render the default footer server component.
 * @param {FooterProps} props - The default footer server component properties
 * @returns The rendered default footer server component
 */
export const Footer = ({
  isClient = false,
  children,
  ...rest
}: FooterProps) => {
  const element = <footer {...rest}>{children}</footer>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <FooterClient {...rest}>{children}</FooterClient>
      </Suspense>
    );
  }

  return element;
};

Footer.displayName = "Footer";
