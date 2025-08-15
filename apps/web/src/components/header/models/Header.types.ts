import type React from "react";

import type Link from "next/link";

import type {
  ButtonProps,
  ButtonRef,
  DivProps,
  DivRef,
  HeaderProps as HeaderComponentProps,
  HeaderRef as HeaderComponentRef,
  LiProps,
  LiRef,
  SvgProps,
} from "@guyromellemagayano/components";

/** For common icon props. */
export interface CommonIconProps extends SvgProps {}

/** Common icon component type. */
export type CommonIconComponent = React.FC<CommonIconProps>;

/** For common nav item ref/props. */
export type CommonNavItemRef = LiRef;

/** For common nav item props. */
export interface CommonNavItemProps
  extends LiProps,
    Pick<React.ComponentPropsWithoutRef<typeof Link>, "target" | "title"> {
  href?: string;
}

/** Mobile nav item */
export type MobileHeaderNavItemRef = CommonNavItemRef;

/** Mobile nav item props */
export interface MobileHeaderNavItemProps extends CommonNavItemProps {}

/** Desktop nav item */
export type DesktopHeaderNavItemRef = CommonNavItemRef;

/** Desktop nav item props */
export interface DesktopHeaderNavItemProps extends CommonNavItemProps {}

/** For mobile nav labels */
export type MobileHeaderNavLabels = Readonly<Record<string, string>>;

/** Shared links */
export type HeaderNavLinks = ReadonlyArray<{ label: string; href: string }>;

/** Theme toggle */
export type ThemeToggleRef = ButtonRef;

/** Theme toggle props */
export interface ThemeToggleProps extends ButtonProps {}

/** Avatar */
export type AvatarContainerRef = DivRef;

/** Avatar container props */
export interface AvatarContainerProps extends DivProps {}

/** Avatar ref */
export type AvatarRef = HTMLAnchorElement;

/** Avatar props */
export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  large?: boolean;
}

/** Avatar component labels */
export type AvatarComponentLabels = Readonly<Record<string, string>>;

/** Header ref */
export type HeaderRef = HeaderComponentRef;

/** Header props */
export interface HeaderProps extends HeaderComponentProps {
  /** Opt-in memoization wrapper (for profiling) */
  isMemoized?: boolean;
}

/** Props for the `HeaderEffects` component. */
export interface HeaderEffectsProps {
  /** Reference to the header element. */
  headerEl: React.RefObject<DivRef | null>;
  /** Reference to the avatar element. */
  avatarEl: React.RefObject<DivRef | null>;
  /** Whether the current page is the home page. */
  isHomePage: boolean;
}

/** HeaderEffects component type. */
export type HeaderEffectsComponent = React.FC<HeaderEffectsProps>;

/** Theme toggle labels */
export type ThemeToggleLabels = Readonly<Record<string, string>>;
