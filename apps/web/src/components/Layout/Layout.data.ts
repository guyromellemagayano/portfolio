// ============================================================================
// COMMON LAYOUT COMPONENT LABELS
// ============================================================================

import { type CommonIconComponent, Icon } from "@web/components";

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
  icon: CommonIconComponent;
  href: string;
}>;
export const SOCIAL_LIST_COMPONENT_LABELS = [
  {
    slug: "x",
    label: "Follow on X",
    icon: Icon.X,
    href: "https://x.com/guyromellemagayano",
  },
  {
    slug: "instagram",
    label: "Follow on Instagram",
    icon: Icon.Instagram,
    href: "https://www.instagram.com/guyromellemagayano",
  },
  {
    slug: "github",
    label: "Follow on GitHub",
    icon: Icon.GitHub,
    href: "https://github.com/guyromellemagayano",
  },
  {
    slug: "linkedin",
    label: "Follow on LinkedIn",
    icon: Icon.LinkedIn,
    href: "https://www.linkedin.com/in/guyromellemagayano",
  },
  {
    slug: "email",
    label: "aspiredtechie2010@gmail.com",
    icon: Icon.Mail,
    href: "mailto:aspiredtechie2010@gmail.com",
  },
] as const satisfies SocialListComponentLabels;
