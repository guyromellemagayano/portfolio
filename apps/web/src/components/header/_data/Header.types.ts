import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON TYPE DEFINITIONS
// ============================================================================

export interface CommonNavItemProps
  extends React.ComponentProps<"li">,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title">,
    CommonComponentProps {
  /** Link href */
  href?: React.ComponentProps<typeof Link>["href"];
}
