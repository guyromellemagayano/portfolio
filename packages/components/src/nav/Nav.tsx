import { lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const NavClient = lazy(async () => {
  const module = await import("./Nav.client");
  return { default: module.NavClient };
});

export type NavRef = React.ElementRef<"nav">;
export type NavProps = React.ComponentPropsWithoutRef<"nav"> &
  CommonComponentProps;

/**
 * Render the default navigation section server component.
 * @param {NavProps} props - The default navigation section server component properties
 * @returns The rendered default navigation section server component
 */
export const Nav = ({ isClient = false, children, ...rest }: NavProps) => {
  const element = <nav {...rest}>{children}</nav>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <NavClient {...rest}>{children}</NavClient>
      </Suspense>
    );
  }

  return element;
};

Nav.displayName = "Nav";
