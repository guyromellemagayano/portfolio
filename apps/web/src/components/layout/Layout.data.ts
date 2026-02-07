import { type ImageProps } from "next/image";

import { type IconProps } from "@web/components/icon";
import logoAnimaginary from "@web/images/logos/animaginary.svg";
import logoCosmos from "@web/images/logos/cosmos.svg";
import logoHelioStream from "@web/images/logos/helio-stream.svg";
import logoOpenShuttle from "@web/images/logos/open-shuttle.svg";
import logoPlanetaria from "@web/images/logos/planetaria.svg";

// ============================================================================
// SOCIAL LIST DATA
// ============================================================================

export type SocialListComponentLabels = ReadonlyArray<{
  label?: string;
  icon: IconProps["name"];
  href?: string;
  target?: string;
}>;

export const SOCIAL_LIST_COMPONENT_LABELS = [
  {
    label: "Follow me on Instagram",
    icon: "instagram",
    href: "https://www.instagram.com/guyromellemagayano",
    target: "_blank",
  },
  {
    label: "Follow me on GitHub",
    icon: "github",
    href: "https://github.com/guyromellemagayano",
    target: "_blank",
  },
  {
    label: "Follow me on LinkedIn",
    icon: "linkedin",
    href: "https://www.linkedin.com/in/guyromellemagayano",
    target: "_blank",
  },
  {
    label: "Send me an email",
    icon: "mail",
    href: "mailto:aspiredtechie2010@gmail.com",
    target: "_blank",
  },
] as const satisfies SocialListComponentLabels;

// ============================================================================
// COMMON LAYOUT COMPONENT DATA
// ============================================================================

export type CommonLayoutComponentData = Readonly<{
  subheading?: string;
  title?: string;
  intro?: string;
}>;

// ============================================================================
// PROJECTS DATA
// ============================================================================

export type ProjectsComponentData = ReadonlyArray<{
  name: string;
  description: string;
  link: { href: string; label: string };
  logo: ImageProps["src"];
}>;

export type ProjectsPageLayoutData = CommonLayoutComponentData &
  Readonly<{
    projects: ProjectsComponentData;
  }>;

export const PROJECTS_PAGE_LAYOUT_DATA: ProjectsPageLayoutData = {
  subheading: "Projects",
  title: "Things I’ve made trying to put my dent in the universe.",
  intro:
    "I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.",
  projects: [
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
  ],
} as const satisfies ProjectsPageLayoutData;

// ============================================================================
// ARTICLES DATA
// ============================================================================

export type ArticlesPageLayoutData = CommonLayoutComponentData;

export const ARTICLES_PAGE_LAYOUT_DATA: ArticlesPageLayoutData = {
  subheading: "Articles",
  title:
    "Writing on software design, company building, and the aerospace industry.",
  intro:
    "All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.",
};
