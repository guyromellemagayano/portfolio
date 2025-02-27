import { type MenuHTMLAttributes, lazy, Suspense } from "react";

import type { CommonComponentProps } from "../components";

// Dynamically import the client component
const MenuClient = lazy(async () => {
  const module = await import("./Menu.client");
  return { default: module.MenuClient };
});

export type MenuRef = HTMLElement;
export type MenuProps = MenuHTMLAttributes<MenuRef> & CommonComponentProps;

/**
 * Render the default menu server component.
 * @param {MenuProps} props - The default menu server component properties
 * @returns The rendered default menu server component
 */
export const Menu = ({ isClient = false, children, ...rest }: MenuProps) => {
  const element = <menu {...rest}>{children}</menu>;

  if (isClient) {
    return (
      <Suspense fallback={element}>
        <MenuClient {...rest}>{children}</MenuClient>
      </Suspense>
    );
  }

  return element;
};

Menu.displayName = "Menu";
