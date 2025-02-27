"use client";

import { forwardRef } from "react";

import type { MenuProps, MenuRef } from "./Menu";

/**
 * Render the menu client component.
 * @param {MenuProps} props - The menu client component properties
 * @param {MenuRef} ref - The menu client component reference
 * @returns The rendered menu client component
 */
export const MenuClient = forwardRef<MenuRef, MenuProps>(
  ({ children, ...rest }, ref) => {
    return (
      <menu ref={ref} {...rest}>
        {children}
      </menu>
    );
  }
);

MenuClient.displayName = "MenuClient";
