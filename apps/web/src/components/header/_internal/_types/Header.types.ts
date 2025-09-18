import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";

import { type HeaderComponentNavLinks } from "../../_data";

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
    Omit<CommonComponentProps, "as"> {}
export type HeaderNavItemComponent = React.FC<CommonHeaderNavItemProps>;
