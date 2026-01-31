/* eslint-disable simple-import-sort/imports */
/* eslint-disable react-hooks/set-state-in-effect */

/**
 * @file Header.tsx
 * @author Guy Romelle Magayano
 * @description Header component for the web application.
 */

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { type Route } from "next";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  filterValidNavigationLinks,
  getLinkTargetProps,
  hasValidNavigationLinks,
  isValidImageSrc,
  isValidLink,
} from "@guyromellemagayano/utils";

import { Container } from "@web/components/container";
import { Icon } from "@web/components/icon";
import avatarImage from "@web/images/avatar.jpg";
import { clamp, cn, isActivePath } from "@web/utils/helpers";

// ============================================================================
// AVATAR STATIC CONFIG
// ============================================================================

export const AVATAR_LINK_HREF = "/" as const;

// ============================================================================
// HEADER LINK TYPES
// ============================================================================

type InternalHref = Route | (string & {});

export type HeaderLink =
  | {
      kind: "internal";
      label: string;
      href: InternalHref;
    }
  | {
      kind: "external";
      label: string;
      href: string;
      newTab?: boolean;
      rel?: string;
    };

// ============================================================================
// HEADER NAV LINK CONFIG
// ============================================================================

export type HeaderNavLabelKey = "about" | "articles" | "projects" | "uses";

export type HeaderNavLinkConfig = Readonly<{
  kind: "internal";
  labelKey: HeaderNavLabelKey;
  href: InternalHref;
}>;

export type HeaderComponentNavLinks = ReadonlyArray<
  Extract<HeaderLink, { kind: "internal" }>
>;

export const HEADER_NAV_LINK_CONFIG: ReadonlyArray<HeaderNavLinkConfig> = [
  { kind: "internal", labelKey: "about", href: "/about" },
  { kind: "internal", labelKey: "articles", href: "/articles" },
  { kind: "internal", labelKey: "projects", href: "/projects" },
  { kind: "internal", labelKey: "uses", href: "/uses" },
] as const;

// ============================================================================
// HEADER AVATAR COMPONENT
// ============================================================================

export type HeaderAvatarElementType = typeof Link;
export type HeaderAvatarProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<HeaderAvatarElementType>,
  "as" | "href"
> &
  P & {
    as?: HeaderAvatarElementType;
    href?: React.ComponentPropsWithoutRef<typeof Link>["href"];
    alt?: React.ComponentPropsWithoutRef<typeof Image>["alt"];
    src?: React.ComponentPropsWithoutRef<typeof Image>["src"];
    large?: boolean;
  };

function HeaderAvatar<P extends Record<string, unknown> = {}>(
  props: HeaderAvatarProps<P>
) {
  const {
    as: Component = Link,
    className,
    large = false,
    href,
    alt,
    src,
    title,
    target,
    ...rest
  } = props;

  // Internationalization
  const tAria = useTranslations("header.ariaLabels");
  const tHeader = useTranslations("header");

  // Header avatar ARIA
  const HEADER_AVATAR_I18N = useMemo(
    () => ({
      home: tAria("home"),
      brandName: tHeader("brandName"),
    }),
    [tAria, tHeader]
  );

  const linkHref = href && isValidLink(href) ? href : AVATAR_LINK_HREF;
  const linkTitle = title && title.length > 0 ? title : HEADER_AVATAR_I18N.home;
  const linkTargetProps = getLinkTargetProps(linkHref, target);
  const imageSrc = src && isValidImageSrc(src) ? src : avatarImage;
  const imageAlt = alt && alt.length > 0 ? alt : HEADER_AVATAR_I18N.brandName;

  return (
    <Component
      {...rest}
      href={linkHref}
      target={linkTargetProps.target}
      rel={linkTargetProps.rel}
      title={linkTitle}
      aria-label={linkTitle}
      className={cn("pointer-events-auto", className)}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        sizes={large ? "4rem" : "2.25rem"}
        className={cn(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          large ? "h-16 w-16" : "h-9 w-9"
        )}
        priority
      />
    </Component>
  );
}

HeaderAvatar.displayName = "HeaderAvatar";

// ============================================================================
// HEADER AVATAR CONTAINER COMPONENT
// ============================================================================

export type HeaderAvatarContainerElementType = "div";
export type HeaderAvatarContainerProps<P extends Record<string, unknown> = {}> =
  Omit<React.ComponentPropsWithRef<HeaderAvatarContainerElementType>, "as"> &
    P & { as?: HeaderAvatarContainerElementType };

function HeaderAvatarContainer<P extends Record<string, unknown> = {}>(
  props: HeaderAvatarContainerProps<P>
) {
  const { as: Component = "div", className, ...rest } = props;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<HeaderAvatarContainerElementType>)}
      className={cn(
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:ring-white/10",
        className
      )}
    />
  );
}

HeaderAvatarContainer.displayName = "HeaderAvatarContainer";

// ============================================================================
// HEADER DESKTOP NAVIGATION COMPONENT
// ============================================================================

export type HeaderDesktopNavElementType = "nav";
export type HeaderDesktopNavProps<P extends Record<string, unknown> = {}> =
  Omit<React.ComponentPropsWithRef<HeaderDesktopNavElementType>, "as"> &
    P & { as?: HeaderDesktopNavElementType };

function HeaderDesktopNav<P extends Record<string, unknown> = {}>(
  props: HeaderDesktopNavProps<P>
) {
  const { as: Component = "nav", ...rest } = props;

  // Internationalization
  const tAria = useTranslations("header.ariaLabels");

  // Header desktop navigation ARIA
  const HEADER_DESKTOP_NAV_I18N = useMemo(
    () => ({
      desktopNavigation: tAria("desktopNavigation"),
    }),
    [tAria]
  );

  const navConfig = HEADER_NAV_LINK_CONFIG;
  const navLinksWithLabels: HeaderComponentNavLinks = navConfig.map((link) => ({
    kind: "internal" as const,
    label: tAria(link.labelKey),
    href: link.href,
  }));
  const validLinks = filterValidNavigationLinks(navLinksWithLabels);

  if (!hasValidNavigationLinks(validLinks)) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<HeaderDesktopNavElementType>)}
      aria-label={HEADER_DESKTOP_NAV_I18N.desktopNavigation}
    >
      <ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
        {navLinksWithLabels.map(({ label, href }) => (
          <HeaderDesktopNavItem key={`${label}:${href}`} href={href}>
            {label}
          </HeaderDesktopNavItem>
        ))}
      </ul>
    </Component>
  );
}

HeaderDesktopNav.displayName = "HeaderDesktopNav";

// ============================================================================
// HEADER DESKTOP NAVIGATION ITEM COMPONENT
// ============================================================================

export type HeaderDesktopNavItemElementType = "li";
export type HeaderDesktopNavItemProps<P extends Record<string, unknown> = {}> =
  Omit<React.ComponentPropsWithRef<HeaderDesktopNavItemElementType>, "as"> &
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "href" | "target" | "title"
    > &
    P & { as?: HeaderDesktopNavItemElementType };

function HeaderDesktopNavItem<P extends Record<string, unknown> = {}>(
  props: HeaderDesktopNavItemProps<P>
) {
  const {
    as: Component = "li",
    children,
    href,
    target,
    title,
    ...rest
  } = props;

  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);
  const linkTargetProps = getLinkTargetProps(href?.toString(), target);
  const linkHref = href && isValidLink(href) ? href : "#";

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<HeaderDesktopNavItemElementType>)}
    >
      <Link
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        aria-label={title}
        className={cn(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-teal-500 dark:text-teal-400"
            : "hover:text-teal-500 dark:hover:text-teal-400"
        )}
      >
        {children}
        {isActive ? (
          <span
            aria-hidden="true"
            className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0"
          />
        ) : null}
      </Link>
    </Component>
  );
}

HeaderDesktopNavItem.displayName = "HeaderDesktopNavItem";

// ============================================================================
// HEADER MOBILE NAVIGATION COMPONENT
// ============================================================================

export type HeaderMobileNavElementType = typeof Popover;
export type HeaderMobileNavProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<HeaderMobileNavElementType>,
  "as"
> &
  P & { as?: HeaderMobileNavElementType };

function HeaderMobileNav<P extends Record<string, unknown> = {}>(
  props: HeaderMobileNavProps<P>
) {
  const { as: Component = Popover, ...rest } = props;

  // Internationalization
  const tAria = useTranslations("header.ariaLabels");

  // Header mobile navigation ARIA
  const HEADER_MOBILE_NAV_I18N = useMemo(
    () => ({
      menu: tAria("menu"),
      closeMenu: tAria("closeMenu"),
      mobileNavigation: tAria("mobileNavigation"),
    }),
    [tAria]
  );

  const navConfig = HEADER_NAV_LINK_CONFIG;
  const navLinksWithLabels: HeaderComponentNavLinks = navConfig.map((link) => ({
    kind: "internal" as const,
    label: tAria(link.labelKey),
    href: link.href,
  }));
  const validLinks = filterValidNavigationLinks(navLinksWithLabels);

  if (!hasValidNavigationLinks(validLinks)) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<HeaderMobileNavElementType>)}
    >
      <PopoverButton
        aria-label={HEADER_MOBILE_NAV_I18N.menu}
        className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
      >
        {HEADER_MOBILE_NAV_I18N.menu}
        <Icon
          name="chevron-down"
          aria-hidden
          className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
        />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/80"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton
            aria-label={HEADER_MOBILE_NAV_I18N.closeMenu}
            className="-m-1 p-1"
          >
            <Icon
              name="close"
              aria-hidden
              className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
            />
          </PopoverButton>

          <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {HEADER_MOBILE_NAV_I18N.mobileNavigation}
          </h2>
        </div>
        <nav
          aria-label={HEADER_MOBILE_NAV_I18N.mobileNavigation}
          className="mt-6"
        >
          <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
            {validLinks.map(({ label, href }) => (
              <HeaderMobileNavItem key={`${label}:${href}`} href={href}>
                {label}
              </HeaderMobileNavItem>
            ))}
          </ul>
        </nav>
      </PopoverPanel>
    </Component>
  );
}

HeaderMobileNav.displayName = "HeaderMobileNav";

// ============================================================================
// HEADER MOBILE NAVIGATION ITEM COMPONENT
// ============================================================================

export type HeaderMobileNavItemElementType = HeaderDesktopNavItemElementType;
export type HeaderMobileNavItemProps<P extends Record<string, unknown> = {}> =
  HeaderDesktopNavItemProps<P> & {};

function HeaderMobileNavItem<P extends Record<string, unknown> = {}>(
  props: HeaderMobileNavItemProps<P>
) {
  const {
    as: Component = "li",
    children,
    href,
    target,
    title,
    ...rest
  } = props;

  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);
  const linkTargetProps = getLinkTargetProps(href?.toString(), target);
  const linkHref = href && isValidLink(href) ? href : "#";

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<HeaderMobileNavItemElementType>)}
    >
      <Link
        href={linkHref}
        target={linkTargetProps.target}
        rel={linkTargetProps.rel}
        title={title}
        aria-label={title}
        className={cn(
          "relative block py-2 transition",
          isActive
            ? "text-teal-500 dark:text-teal-400"
            : "hover:text-teal-500 dark:hover:text-teal-400"
        )}
      >
        {children}
      </Link>
    </Component>
  );
}

HeaderMobileNavItem.displayName = "HeaderMobileNavItem";

// ============================================================================
// HEADER THEME TOGGLE COMPONENT
// ============================================================================

export type HeaderThemeToggleElementType = "button";
export type HeaderThemeToggleProps<P extends Record<string, unknown> = {}> =
  Omit<React.ComponentPropsWithRef<HeaderThemeToggleElementType>, "as"> &
    P & { as?: HeaderThemeToggleElementType };

function HeaderThemeToggle<P extends Record<string, unknown> = {}>(
  props: HeaderThemeToggleProps<P>
) {
  const { as: Component = "button", className, ...rest } = props;

  const { resolvedTheme, setTheme } = useTheme();
  const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Internationalization
  const tAria = useTranslations("header.ariaLabels");

  // Header theme toggle ARIA
  const HEADER_THEME_TOGGLE_I18N = useMemo(
    () => ({
      toggleTheme: tAria("toggleTheme"),
      darkMode: tAria("darkMode"),
      lightMode: tAria("lightMode"),
    }),
    [tAria]
  );

  const ariaLabel = mounted
    ? `Switch to ${otherTheme === "dark" ? HEADER_THEME_TOGGLE_I18N.darkMode : HEADER_THEME_TOGGLE_I18N.lightMode}`
    : HEADER_THEME_TOGGLE_I18N.toggleTheme;

  return (
    <Component
      {...(rest as React.ComponentPropsWithRef<HeaderThemeToggleElementType>)}
      className={cn(
        "group rounded-full bg-white/90 px-3 py-2 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm transition dark:bg-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20",
        className as string
      )}
      onClick={() => setTheme(otherTheme)}
      aria-label={ariaLabel}
    >
      <Icon
        name="sun"
        className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition group-hover:fill-zinc-200 group-hover:stroke-zinc-700 dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:stroke-teal-500 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600"
      />
      <Icon
        name="moon"
        className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition not-[@media_(prefers-color-scheme:dark)]:fill-teal-400/10 not-[@media_(prefers-color-scheme:dark)]:stroke-teal-500 dark:block [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400"
      />
    </Component>
  );
}

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================

export type HeaderElementType = "header";
export type HeaderProps<P extends Record<string, unknown> = {}> = Omit<
  React.ComponentPropsWithRef<HeaderElementType>,
  "as"
> &
  P & {
    as?: HeaderElementType;
  };

export function Header<P extends Record<string, unknown> = {}>(
  props: HeaderProps<P>
) {
  const { as: Component = "header", children, className, ...rest } = props;

  // Internationalization
  const tHeader = useTranslations("header");

  // Header ARIA
  const HEADER_I18N = useMemo(
    () => ({
      brandName: tHeader("brandName"),
    }),
    [tHeader]
  );

  const isHomePage: boolean = usePathname() === AVATAR_LINK_HREF;

  let headerRef = useRef<React.ComponentRef<"div"> | null>(null);
  let avatarRef = useRef<React.ComponentRef<"div"> | null>(null);
  let isInitial = useRef(true);

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0;
    let upDelay = 64;

    /** Sets a property on the document element. */
    function setProperty(prop: string, value: string): void {
      document.documentElement.style.setProperty(prop, value);
    }

    /** Removes a property from the document element. */
    function removeProperty(prop: string): void {
      document.documentElement.style.removeProperty(prop);
    }

    /** Handles scroll-based header and avatar style updates for the header component. */
    function updateHeaderStyles(): void {
      if (!headerRef.current) return;

      let { top, height } = headerRef.current.getBoundingClientRect();
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial.current) setProperty("--header-position", "sticky");
      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial.current || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay);
        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

      /** Handles header inner position updates for the header component. */
      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty("--header-inner-position", "fixed");
        removeProperty("--header-top");
        removeProperty("--avatar-top");
      } else {
        removeProperty("--header-inner-position");
        setProperty("--header-top", "0px");
        setProperty("--avatar-top", "0px");
      }
    }

    /** Handles avatar style updates for the header component. */
    function updateAvatarStyles(): void {
      if (!isHomePage) return;

      let fromScale = 1;
      let toScale = 36 / 64;
      let fromX = 0;
      let toX = 2 / 16;

      let scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      );

      let borderScale = 1 / (toScale / scale);
      let borderX = (-toX + x) * borderScale;
      let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty("--avatar-border-transform", borderTransform);
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
    }

    /** Handles style updates for the header component. */
    function updateStyles(): void {
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial.current = false;
    }

    updateStyles();
    window.addEventListener("scroll", updateStyles, { passive: true });
    window.addEventListener("resize", updateStyles);

    return () => {
      window.removeEventListener("scroll", updateStyles);
      window.removeEventListener("resize", updateStyles);
    };
  }, [isHomePage]);

  return (
    <>
      <Component
        {...rest}
        aria-label={
          (rest as React.ComponentPropsWithRef<HeaderElementType>)[
            "aria-label"
          ] ?? HEADER_I18N.brandName
        }
        className={cn(
          "pointer-events-none relative z-50 flex flex-none flex-col",
          className
        )}
        role="banner"
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
      >
        {isHomePage ? (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
            />
            <Container
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
              className="top-0 order-last -mb-3 pt-3"
            >
              <div
                style={{
                  position:
                    "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
                className="top-(--avatar-top,--spacing(3)) w-full"
              >
                <div className="relative">
                  <HeaderAvatarContainer
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                    className="absolute top-3 left-0 origin-left transition-opacity"
                  />
                  <HeaderAvatar
                    large
                    style={{ transform: "var(--avatar-image-transform)" }}
                    className="block h-16 w-16 origin-left"
                  />
                </div>
              </div>
            </Container>
          </>
        ) : null}

        <div
          ref={headerRef}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
        >
          <Container
            className="top-(--header-top,--spacing(6)) w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage ? (
                  <HeaderAvatarContainer>
                    <HeaderAvatar />
                  </HeaderAvatarContainer>
                ) : null}
              </div>
              <div className="flex flex-1 justify-end md:justify-center">
                <HeaderMobileNav className="pointer-events-auto md:hidden" />
                <HeaderDesktopNav className="pointer-events-auto hidden md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="pointer-events-auto">
                  <HeaderThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
        {children}
      </Component>

      {isHomePage ? (
        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
        />
      ) : null}
    </>
  );
}

Header.displayName = "Header";
