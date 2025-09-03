import React from "react";

import Link from "next/link";

import { type ComponentProps } from "@guyromellemagayano/utils";

// ============================================================================
// COMMON TYPE DEFINITIONS
// ============================================================================

export interface CommonNavItemProps
  extends React.ComponentProps<"li">,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title">,
    ComponentProps {
  /** Link href */
  href?: React.ComponentProps<typeof Link>["href"];
}
