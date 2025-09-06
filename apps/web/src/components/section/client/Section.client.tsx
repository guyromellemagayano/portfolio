"use client";

import React from "react";

import { setDisplayName } from "@guyromellemagayano/utils";

import type { SectionProps } from "../Section.types";

// ============================================================================
// SECTION CLIENT COMPONENT
// ============================================================================

export interface SectionClientProps extends SectionProps {
  /** Enable client-side features */
  isClient?: boolean;
  /** Enable memoization for client component */
  isMemoized?: boolean;
}

export const SectionClient = setDisplayName(function SectionClient(
  props: SectionClientProps
) {
  const { Section } = require(".."); // Dynamic import
  const { _internalId, _debugMode, isClient, isMemoized, ...rest } = props;
  return <Section {...rest} />;
}) as React.ComponentType<SectionClientProps>;

export const MemoizedSectionClient = React.memo(SectionClient);
