import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  hasAnyRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "./data";
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

// ============================================================================
// BASE ICON COMPONENT
// ============================================================================

/** Internal icon component with all props */
const BaseIcon: CommonIconComponent = setDisplayName(function BaseIcon(props) {
  const { children, internalId, debugMode, ...rest } = props;

  const element = (
    <svg
      {...rest}
      aria-hidden="true"
      {...createComponentProps(internalId, "icon", debugMode)}
    >
      {children}
    </svg>
  );

  return element;
});

// ============================================================================
// MEMOIZED ICON COMPONENT
// ============================================================================

/** A memoized icon component. */
const MemoizedIcon = React.memo(BaseIcon);

// ============================================================================
// MAIN ICON COMPONENT
// ============================================================================

/** A polymorphic SVG icon component with compound social and UI icons. */
export const Icon = setDisplayName(function Icon(props) {
  const {
    children,
    isMemoized = false,
    internalId,
    debugMode,
    ...rest
  } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  if (!hasAnyRenderableContent(children)) return null;

  const updatedProps = {
    ...rest,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedIcon : BaseIcon;
  const element = <Component {...updatedProps}>{children}</Component>;
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
