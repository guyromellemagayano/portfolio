// ============================================================================
// SHARED FOOTER COMPONENT TYPES
// ============================================================================

import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";

import { type FooterLink } from "@web/components/_shared";

// ============================================================================
// FOOTER COMPONENT LABELS
// ============================================================================

/** `Footer` component labels. */
export type FooterComponentLabels = Readonly<{
  /** Legal text */
  legalText?: string;
}>;

// ============================================================================
// FOOTER COMPONENT TYPES & INTERFACES
// ============================================================================

/** `Footer` component props. */
export interface FooterProps
  extends React.ComponentProps<"footer">,
    FooterComponentLabels,
    CommonComponentProps {}

/** `Footer` component type. */
export type FooterComponent = React.FC<FooterProps>;

// ============================================================================
// FOOTER COMPONENT NAV LINKS
// ============================================================================

/** `Footer` component navigation links. */
export type FooterComponentNavLinks = ReadonlyArray<
  Extract<FooterLink, { kind: "internal" }>
>;

// ============================================================================
// FOOTER LEGAL COMPONENT TYPES & INTERFACES
// ============================================================================

/** `FooterLegal` component props. */
export interface FooterLegalProps
  extends React.ComponentProps<"p">,
    FooterComponentLabels,
    CommonComponentProps {}

/** `FooterLegal` component type. */
export type FooterLegalComponent = React.FC<FooterLegalProps>;

// ============================================================================
// FOOTER NAVIGATION COMPONENT TYPES & INTERFACES
// ============================================================================

/** `FooterNavigation` component props. */
export interface FooterNavigationProps
  extends React.ComponentProps<"nav">,
    CommonComponentProps {
  /** Navigation links */
  links?: ReadonlyArray<FooterLink>;
}

/** `FooterNavigation` component type. */
export type FooterNavigationComponent = React.FC<FooterNavigationProps>;
