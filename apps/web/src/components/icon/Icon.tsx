import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  hasMeaningfulText,
  isRenderableContent,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { type CommonIconComponent } from "./_data";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "./_internal";

// ============================================================================
// BASE ICON COMPONENT
// ============================================================================

/** Internal icon component with all props */
const BaseIcon: CommonIconComponent = setDisplayName(function BaseIcon(props) {
  const { children, internalId, debugMode, ...rest } = props;

  // Prevent empty usage - require either children or use compound components
  if (!children) {
    throw new Error(
      "Icon component requires SVG content. Either:\n" +
        "1. Use predefined icons: <Icon.X />, <Icon.ChevronRight />, etc.\n" +
        '2. Add custom SVG content: <Icon><path d="..." /></Icon>'
    );
  }

  const element = (
    <svg
      {...rest}
      aria-hidden="true"
      data-icon-id={`${internalId}-icon`}
      data-debug-mode={debugMode ? "true" : undefined}
      data-testid="icon-root"
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

type IconCompoundComponent = CommonIconComponent & {
  /** Social media icon for X/Twitter */
  X: typeof XIcon;
  /** Social media icon for Instagram */
  Instagram: typeof InstagramIcon;
  /** Social media icon for LinkedIn */
  LinkedIn: typeof LinkedInIcon;
  /** Social media icon for GitHub */
  GitHub: typeof GitHubIcon;
  /** UI icon for close/exit */
  Close: typeof CloseIcon;
  /** UI icon for sun/light mode */
  Sun: typeof SunIcon;
  /** UI icon for moon/dark mode */
  Moon: typeof MoonIcon;
  /** Navigation icon for chevron down */
  ChevronDown: typeof ChevronDownIcon;
  /** Navigation icon for chevron right */
  ChevronRight: typeof ChevronRightIcon;
  /** Navigation icon for arrow left */
  ArrowLeft: typeof ArrowLeftIcon;
};

/** A polymorphic SVG icon component with compound social and UI icons. */
const Icon = setDisplayName(function Icon(props) {
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

  if (!isRenderableContent(children) || !hasMeaningfulText(children))
    return null;

  const updatedProps = {
    ...rest,
    internalId: id,
    debugMode: isDebugMode,
    children,
  };

  const Component = isMemoized ? MemoizedIcon : BaseIcon;
  const element = <Component {...updatedProps} />;
  return element;
} as IconCompoundComponent);

// ============================================================================
// ICON COMPOUND COMPONENTS
// ============================================================================

Icon.X = XIcon;
Icon.Instagram = InstagramIcon;
Icon.LinkedIn = LinkedInIcon;
Icon.GitHub = GitHubIcon;
Icon.Close = CloseIcon;
Icon.Sun = SunIcon;
Icon.Moon = MoonIcon;
Icon.ChevronDown = ChevronDownIcon;
Icon.ChevronRight = ChevronRightIcon;
Icon.ArrowLeft = ArrowLeftIcon;

export { Icon };
