// ============================================================================
// COMMON LAYOUT COMPONENT LABELS
// ============================================================================

import { type ImageProps } from "next/image";

import logoAnimaginary from "@web/images/logos/animaginary.svg";
import logoCosmos from "@web/images/logos/cosmos.svg";
import logoHelioStream from "@web/images/logos/helio-stream.svg";
import logoOpenShuttle from "@web/images/logos/open-shuttle.svg";
import logoPlanetaria from "@web/images/logos/planetaria.svg";

export type CommonLayoutComponentLabels = Readonly<Record<string, string>>;
export const COMMON_LAYOUT_COMPONENT_LABELS = {
  skipToMainContent: "Skip to main content",
} as const satisfies CommonLayoutComponentLabels;

// ============================================================================
// SOCIAL LIST COMPONENT LABELS
// ============================================================================

export type SocialListComponentLabels = ReadonlyArray<{
  slug: string;
  label: string;
  icon: string;
  href: string;
}>;
export const SOCIAL_LIST_COMPONENT_LABELS = [
  {
    slug: "x",
    label: "Follow on X",
    icon: "X",
    href: "https://x.com/guyromellemagayano",
  },
  {
    slug: "instagram",
    label: "Follow on Instagram",
    icon: "Instagram",
    href: "https://www.instagram.com/guyromellemagayano",
  },
  {
    slug: "github",
    label: "Follow on GitHub",
    icon: "GitHub",
    href: "https://github.com/guyromellemagayano",
  },
  {
    slug: "linkedin",
    label: "Follow on LinkedIn",
    icon: "LinkedIn",
    href: "https://www.linkedin.com/in/guyromellemagayano",
  },
  {
    slug: "email",
    label: "aspiredtechie2010@gmail.com",
    icon: "Mail",
    href: "mailto:aspiredtechie2010@gmail.com",
  },
] as const satisfies SocialListComponentLabels;

// ============================================================================
// PROJECTS COMPONENT DATA
// ============================================================================

export type ProjectsComponentData = ReadonlyArray<{
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: ImageProps["src"];
}>;
export const PROJECTS_COMPONENT_DATA = [
  {
    name: "Planetaria",
    description:
      "Creating technology to empower civilians to explore space on their own terms.",
    link: { href: "http://planetaria.tech", label: "planetaria.tech" },
    logo: logoPlanetaria,
  },
  {
    name: "Animaginary",
    description:
      "High performance web animation library, hand-written in optimized WASM.",
    link: { href: "#", label: "github.com" },
    logo: logoAnimaginary,
  },
  {
    name: "HelioStream",
    description:
      "Real-time video streaming library, optimized for interstellar transmission.",
    link: { href: "#", label: "github.com" },
    logo: logoHelioStream,
  },
  {
    name: "cosmOS",
    description:
      "The operating system that powers our Planetaria space shuttles.",
    link: { href: "#", label: "github.com" },
    logo: logoCosmos,
  },
  {
    name: "OpenShuttle",
    description:
      "The schematics for the first rocket I designed that successfully made it to orbit.",
    link: { href: "#", label: "github.com" },
    logo: logoOpenShuttle,
  },
] as const satisfies ProjectsComponentData;
