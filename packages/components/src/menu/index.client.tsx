"use client";

import React, { memo } from "react";

import { Menu, type MenuProps, type MenuRef } from ".";

/** Render the menu client component. */
export const MenuClient = React.forwardRef<MenuRef, MenuProps>((props, ref) => (
  <Menu ref={ref} {...props} />
));

MenuClient.displayName = "MenuClient";

/** Memoized version of `MenuClient` for performance optimization. */
export const MemoizedMenuClient = memo(MenuClient);
