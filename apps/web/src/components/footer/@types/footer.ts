import type { Route } from "next";

import type {
  AProps,
  ARef,
  FooterProps as FooterComponentProps,
  FooterRef as FooterComponentRef,
} from "@guyromellemagayano/components";

/** Internal vs External link modeling (future-proof). */
export type InternalHref = Route | (string & {}); // works with/without typed routes

/** Internal vs External link modeling (future-proof). */
export type FooterLink =
  | { kind: "internal"; label: string; href: InternalHref }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

/** Footer data. */
export interface FooterData {
  /** Brand name used by the footer (override via data layer later if needed). */
  brandName: string;
  /** Navigation links. */
  nav: ReadonlyArray<FooterLink>;
  /** If provided, printed after the year; else brandName + 'All rights reserved.' is used in config. */
  legalText?: string;
  /** Optional override (default: current year) */
  year?: number;
}

/** Public component types */
export type FooterRef = FooterComponentRef;

/** Public component props. */
export interface FooterProps extends FooterComponentProps {}

/** Client leaf types. */
export type FooterNavLinkRef = ARef;

/** Client leaf props. */
export interface FooterNavLinkProps
  extends Pick<AProps, "children" | "className" | "href" | "target" | "rel"> {}
