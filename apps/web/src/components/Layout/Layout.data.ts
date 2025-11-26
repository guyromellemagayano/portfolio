// ============================================================================
// COMMON LAYOUT COMPONENT LABELS
// ============================================================================

import { type ImageProps } from "next/image";

import { type IconProps } from "@web/components";
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
  label?: string;
  icon: IconProps<"svg">["name"];
  href?: string;
  target?: string;
}>;
export const SOCIAL_LIST_COMPONENT_LABELS = [
  {
    label: "Follow on X",
    icon: "x",
    href: "https://x.com/guyromellemagayano",
    target: "_blank",
  },
  {
    label: "Follow on Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/guyromellemagayano",
    target: "_blank",
  },
  {
    label: "Follow on GitHub",
    icon: "github",
    href: "https://github.com/guyromellemagayano",
    target: "_blank",
  },
  {
    label: "Follow on LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/guyromellemagayano",
    target: "_blank",
  },
  {
    label: "Send me an Email",
    icon: "mail",
    href: "mailto:aspiredtechie2010@gmail.com",
    target: "_blank",
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
