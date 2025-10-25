// ============================================================================
// HEADER COMPONENT TYPES
// ============================================================================

import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";

import { type HeaderComponentNavLinks } from "./Header.data";

// ============================================================================
// COMMON HEADER NAV PROPS
// ============================================================================

export interface CommonHeaderNavProps extends Omit<CommonComponentProps, "as"> {
  links?: HeaderComponentNavLinks;
}

// ============================================================================
// COMMON HEADER NAV ITEM PROPS
// ============================================================================

export interface CommonHeaderNavItemProps
  extends React.ComponentPropsWithRef<"li">,
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "target" | "title"
    >,
    CommonComponentProps {}
export type HeaderNavItemComponent = React.FC<CommonHeaderNavItemProps>;
