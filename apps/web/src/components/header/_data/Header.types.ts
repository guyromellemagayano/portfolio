import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON TYPE DEFINITIONS
// ============================================================================

export interface CommonHeaderNavItemProps
  extends React.ComponentProps<"li">,
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "target" | "title"
    >,
    CommonComponentProps {}

export type HeaderNavItemComponent = React.FC<CommonHeaderNavItemProps>;
