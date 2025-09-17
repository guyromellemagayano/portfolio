import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";

// ============================================================================
// COMMON LINK COMPONENT TYPES & INTERFACES
// ============================================================================

export interface CommonLinkProps
  extends React.ComponentPropsWithRef<typeof Link>,
    Omit<CommonComponentProps, "as"> {}
export type CommonLinkComponent = React.FC<CommonLinkProps>;
