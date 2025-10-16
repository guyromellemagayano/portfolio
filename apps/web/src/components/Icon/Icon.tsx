import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  ArrowDownIcon,
  ArrowLeftIcon,
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedinIcon,
  LinkIcon,
  MailIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "./internal";
import { type CommonIconComponent } from "./types";

// ============================================================================
// BASE ICON COMPONENT
// ============================================================================

const BaseIcon: CommonIconComponent = setDisplayName(function BaseIcon(props) {
  const {
    as: Component = "svg",
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  const element = (
    <Component
      {...rest}
      id={`${componentId}-icon-root`}
      role="img"
      focusable="false"
      aria-hidden="true"
      {...createComponentProps(componentId, "icon", isDebugMode)}
    >
      {children}
    </Component>
  );

  return element;
});

// ============================================================================
// MEMOIZED ICON COMPONENT
// ============================================================================

const MemoizedIcon = React.memo(BaseIcon);

// ============================================================================
// MAIN ICON COMPONENT
// ============================================================================

export const Icon = setDisplayName(function Icon(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedIcon : BaseIcon;
  const element = <Component {...rest}>{children}</Component>;
  return element;
} as IconCompoundComponent);

// ============================================================================
// ICON COMPOUND COMPONENTS
// ============================================================================

type IconCompoundComponent = CommonIconComponent & {
  // ============================================================================
  // NAVIGATION
  // ============================================================================

  /** Navigation icon for arrow down */
  ArrowDown: typeof ArrowDownIcon;
  /** Navigation icon for arrow left */
  ArrowLeft: typeof ArrowLeftIcon;
  /** Navigation icon for chevron down */
  ChevronDown: typeof ChevronDownIcon;
  /** Navigation icon for chevron right */
  ChevronRight: typeof ChevronRightIcon;

  // ============================================================================
  // SOCIAL
  // ============================================================================

  /** Social media icon for X/Twitter */
  X: typeof XIcon;
  /** Social media icon for Instagram */
  Instagram: typeof InstagramIcon;
  /** Social media icon for LinkedIn */
  LinkedIn: typeof LinkedinIcon;
  /** Social media icon for GitHub */
  GitHub: typeof GitHubIcon;

  // ============================================================================
  // UI
  // ============================================================================

  /** UI icon for link */
  Link: typeof LinkIcon;
  /** UI icon for close/exit */
  Close: typeof CloseIcon;
  /** UI icon for sun/light mode */
  Sun: typeof SunIcon;
  /** UI icon for moon/dark mode */
  Moon: typeof MoonIcon;
  /** UI icon for mail */
  Mail: typeof MailIcon;
  /** UI icon for briefcase */
  Briefcase: typeof BriefcaseIcon;
};

Icon.X = XIcon;
Icon.Instagram = InstagramIcon;
Icon.LinkedIn = LinkedinIcon;
Icon.GitHub = GitHubIcon;
Icon.Link = LinkIcon;
Icon.Close = CloseIcon;
Icon.Sun = SunIcon;
Icon.Moon = MoonIcon;
Icon.ChevronDown = ChevronDownIcon;
Icon.ChevronRight = ChevronRightIcon;
Icon.ArrowLeft = ArrowLeftIcon;
Icon.Mail = MailIcon;
Icon.Briefcase = BriefcaseIcon;
Icon.ArrowDown = ArrowDownIcon;
