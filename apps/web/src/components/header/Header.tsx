"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import {
  Button,
  type ButtonProps,
  type ButtonRef,
  Div,
  type DivProps,
  type DivRef,
  Header as HeaderComponent,
  type HeaderProps as HeaderComponentProps,
  type HeaderRef as HeaderComponentRef,
  Heading,
  Li,
  type LiProps,
  type LiRef,
  Nav,
  type NavProps,
  type NavRef,
  Span,
  Ul,
} from "@guyromellemagayano/components";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import { Container } from "@web/components/container";
import {
  AVATAR_COMPONENT_LABELS,
  DESKTOP_HEADER_NAV_LINKS,
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS,
  MOBILE_HEADER_NAV_LINKS,
  THEME_TOGGLE_LABELS,
} from "@web/components/header/Header.data";
import { Icon } from "@web/components/icon";
import { useComponentId } from "@web/hooks/useComponentId";
import avatarImage from "@web/images/avatar.jpg";
import { clamp, cn, isActivePath } from "@web/lib";

import styles from "./Header.module.css";

interface HeaderEffectsProps {
  /** Reference to the header element. */
  headerEl: React.RefObject<DivRef | null>;
  /** Reference to the avatar element. */
  avatarEl: React.RefObject<DivRef | null>;
  /** Whether the current page is the home page. */
  isHomePage: boolean;
}

type HeaderEffectsComponent = React.FC<HeaderEffectsProps>;

/** Header effects component. */
const HeaderEffects: HeaderEffectsComponent = function HeaderEffects(props) {
  const { headerEl, avatarEl, isHomePage } = props;

  useEffect(() => {
    const setProperty = (prop: string, value: string) =>
      document.documentElement.style.setProperty(prop, value);
    const removeProperty = (prop: string) =>
      document.documentElement.style.removeProperty(prop);

    let isInitial = true;
    let downDelay = avatarEl.current?.offsetTop ?? 0;
    const upDelay = 64;

    function updateHeaderStyles(): void {
      const header = headerEl.current;
      if (!header) return;
      const { top, height } = header.getBoundingClientRect();

      const scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      );

      if (isInitial) setProperty("--header-position", "sticky");
      setProperty("--content-offset", `${downDelay}px`);

      if (isInitial || scrollY < downDelay) {
        setProperty("--header-height", `${downDelay + height}px`);
        setProperty("--header-mb", `${-downDelay}px`);
      } else if (top + height < -upDelay) {
        const offset = Math.max(height, scrollY - upDelay);
        setProperty("--header-height", `${offset}px`);
        setProperty("--header-mb", `${height - offset}px`);
      } else if (top === 0) {
        setProperty("--header-height", `${scrollY + height}px`);
        setProperty("--header-mb", `${-scrollY}px`);
      }

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

    function updateAvatarStyles(): void {
      if (!isHomePage) return;

      const fromScale = 1;
      const toScale = 36 / 64;
      const fromX = 0;
      const toX = 2 / 16;

      const scrollY = downDelay - window.scrollY;

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale;
      scale = clamp(scale, fromScale, toScale);

      let x = (scrollY * (fromX - toX)) / downDelay + toX;
      x = clamp(x, fromX, toX);

      setProperty(
        "--avatar-image-transform",
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      );

      const borderScale = 1 / (toScale / scale);
      const borderX = (-toX + x) * borderScale;
      const borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`;

      setProperty("--avatar-border-transform", borderTransform);
      setProperty("--avatar-border-opacity", scale === toScale ? "1" : "0");
    }

    function updateStyles(): void {
      // Recompute `downDelay` in case layout shifted after hydration
      downDelay = avatarEl.current?.offsetTop ?? 0;
      updateHeaderStyles();
      updateAvatarStyles();
      isInitial = false;
    }

    // rAF throttle
    let raf = 0;
    const onScrollResize = (): void => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        updateStyles();
        raf = 0;
      });
    };

    updateStyles();
    window.addEventListener("scroll", onScrollResize, { passive: true });
    window.addEventListener("resize", onScrollResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollResize);
      window.removeEventListener("resize", onScrollResize);
    };
  }, [headerEl, avatarEl, isHomePage]);

  return null;
};

HeaderEffects.displayName = "HeaderEffects";

type ThemeToggleRef = ButtonRef;
interface ThemeToggleProps extends ButtonProps {}

type ThemeToggleComponent = React.ForwardRefExoticComponent<
  ThemeToggleProps & React.RefAttributes<ThemeToggleRef>
>;

/** A theme toggle component. */
const HeaderThemeToggle: ThemeToggleComponent = React.forwardRef(
  function HeaderThemeToggle(props, ref) {
    const { ...rest } = props;

    const { resolvedTheme, setTheme } = useTheme();
    const otherTheme = resolvedTheme === "dark" ? "light" : "dark";
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    const handleClick = useCallback(() => {
      setTheme(otherTheme);
    }, [otherTheme, setTheme]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<ButtonRef>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      },
      [handleClick]
    );

    const element = useMemo(
      () => (
        <Button
          {...rest}
          ref={ref}
          data-testid="mock-button"
          aria-label={
            mounted
              ? `Switch to ${otherTheme} theme`
              : THEME_TOGGLE_LABELS.toggleTheme
          }
          className={styles.headerThemeToggleButton}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <Icon.Sun className={styles.headerThemeToggleSunIcon} />
          <Icon.Moon className={styles.headerThemeToggleMoonIcon} />
        </Button>
      ),
      [ref, mounted, otherTheme, handleClick, handleKeyDown, rest]
    );

    return element;
  }
);

HeaderThemeToggle.displayName = "HeaderThemeToggle";

type CommonHeaderNavRef = NavRef;
interface CommonHeaderNavProps extends NavProps {}

type MobileHeaderNavRef = CommonHeaderNavRef;
interface MobileHeaderNavProps extends CommonHeaderNavProps {}

type MobileHeaderNavComponent = React.ForwardRefExoticComponent<
  MobileHeaderNavProps & React.RefAttributes<MobileHeaderNavRef>
>;

/** A mobile navigation component. */
const MobileHeaderNav: MobileHeaderNavComponent = React.forwardRef(
  function MobileHeaderNav(props, ref) {
    const { ...rest } = props;

    const element = (
      <Popover {...rest} ref={ref}>
        <PopoverButton className={styles.mobileHeaderNavButton}>
          {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.menu}
          <Icon.ChevronDown className={styles.mobileHeaderNavChevron} />
        </PopoverButton>
        <PopoverBackdrop
          transition
          className={styles.mobileHeaderNavBackdrop}
        />
        <PopoverPanel focus transition className={styles.mobileHeaderNavPanel}>
          <Div className={styles.mobileHeaderNavHeader}>
            <PopoverButton
              aria-label={HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.closeMenu}
              className={styles.mobileHeaderNavCloseButton}
            >
              <Icon.Close className={styles.mobileHeaderNavCloseIcon} />
            </PopoverButton>
            <Heading as={"h2"} className={styles.mobileHeaderNavTitle}>
              {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.navigation}
            </Heading>
          </Div>

          {MOBILE_HEADER_NAV_LINKS.length > 0 && (
            <Nav className={styles.mobileHeaderNavContent}>
              <Ul className={styles.mobileHeaderNavList}>
                {MOBILE_HEADER_NAV_LINKS.map((link) => (
                  <MobileHeaderNavItem
                    key={`${link.label}:${link.href}`}
                    href={link.href}
                  >
                    {link.label}
                  </MobileHeaderNavItem>
                ))}
              </Ul>
            </Nav>
          )}
        </PopoverPanel>
      </Popover>
    );

    return element;
  }
);

MobileHeaderNav.displayName = "MobileHeaderNav";

type DesktopHeaderNavRef = CommonHeaderNavRef;
interface DesktopHeaderNavProps extends CommonHeaderNavProps {}

type DesktopHeaderNavComponent = React.ForwardRefExoticComponent<
  DesktopHeaderNavProps & React.RefAttributes<DesktopHeaderNavRef>
>;

/** A desktop navigation component. */
const DesktopHeaderNav: DesktopHeaderNavComponent = React.forwardRef(
  function DesktopHeaderNav(props, ref) {
    const { ...rest } = props;

    const element = (
      <Nav {...rest} ref={ref}>
        <Ul className={styles.desktopHeaderNavList}>
          {DESKTOP_HEADER_NAV_LINKS.map((link) => (
            <DesktopHeaderNavItem
              key={`${link.label}:${link.href}`}
              href={link.href}
            >
              {link.label}
            </DesktopHeaderNavItem>
          ))}
        </Ul>
      </Nav>
    );

    return element;
  }
);

DesktopHeaderNav.displayName = "DesktopHeaderNav";

type CommonNavItemRef = LiRef;
interface CommonNavItemProps
  extends LiProps,
    Pick<
      React.ComponentPropsWithoutRef<typeof Link>,
      "target" | "title" | "href"
    > {}

type MobileHeaderNavItemRef = CommonNavItemRef;
interface MobileHeaderNavItemProps extends CommonNavItemProps {}

type MobileHeaderNavItemComponent = React.ForwardRefExoticComponent<
  MobileHeaderNavItemProps & React.RefAttributes<MobileHeaderNavItemRef>
>;

/** A mobile navigation item component. */
const MobileHeaderNavItem: MobileHeaderNavItemComponent = React.forwardRef(
  function MobileHeaderNavItem(props, ref) {
    const {
      children,
      href = "#",
      target = "_self",
      title = "",
      ...rest
    } = props;

    if (!children && !href) return null;

    const element = (
      <Li {...rest} ref={ref}>
        <Link
          href={href}
          target={target}
          title={title}
          className={styles.mobileHeaderNavItemLink}
        >
          {children}
        </Link>
      </Li>
    );

    return element;
  }
);

MobileHeaderNavItem.displayName = "MobileHeaderNavItem";

type DesktopHeaderNavItemRef = CommonNavItemRef;
interface DesktopHeaderNavItemProps extends CommonNavItemProps {}

type DesktopHeaderNavItemComponent = React.ForwardRefExoticComponent<
  DesktopHeaderNavItemProps & React.RefAttributes<DesktopHeaderNavItemRef>
>;

/** A desktop navigation item component. */
const DesktopHeaderNavItem: DesktopHeaderNavItemComponent = React.forwardRef(
  function DesktopHeaderNavItem(props, ref) {
    const {
      children,
      href = "#",
      target = "_self",
      title = "",
      ...rest
    } = props;

    const pathname = usePathname();
    const isActive = isActivePath(pathname, href);

    if (!children && !href) return null;

    const element = (
      <Li {...rest} ref={ref}>
        <Link
          href={href}
          target={target}
          title={title}
          className={cn(
            styles.desktopHeaderNavItemLink,
            isActive
              ? styles.desktopHeaderNavItemLinkActive
              : styles.desktopHeaderNavItemLinkHover
          )}
        >
          {children}
          {isActive && (
            <Span className={styles.desktopHeaderNavActiveIndicator} />
          )}
        </Link>
      </Li>
    );

    return element;
  }
);

DesktopHeaderNavItem.displayName = "DesktopHeaderNavItem";

type AvatarContainerRef = DivRef;
interface AvatarContainerProps extends DivProps {}

type AvatarContainerComponent = React.ForwardRefExoticComponent<
  AvatarContainerProps & React.RefAttributes<AvatarContainerRef>
>;

/** An avatar container component. */
const AvatarContainer: AvatarContainerComponent = React.forwardRef(
  function AvatarContainer(props, ref) {
    const { className, ...rest } = props;

    const element = (
      <Div
        {...rest}
        ref={ref}
        className={cn(styles.avatarContainer, className)}
      />
    );

    return element;
  }
);

AvatarContainer.displayName = "AvatarContainer";

type AvatarRef = React.ComponentRef<typeof Link>;
interface AvatarProps extends React.ComponentPropsWithoutRef<typeof Link> {
  /** Optional alt text for the image. */
  alt?: React.ComponentPropsWithoutRef<typeof Image>["alt"];
  /** Optional image source. */
  src?: React.ComponentPropsWithoutRef<typeof Image>["src"];
  /** Whether the avatar is large. */
  large?: boolean;
}

type AvatarComponent = React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<AvatarRef>
>;

/** An avatar component. */
const Avatar: AvatarComponent = React.forwardRef(function Avatar(props, ref) {
  const {
    className,
    large = false,
    href = AVATAR_COMPONENT_LABELS.link,
    alt = "",
    src = avatarImage,
    ...rest
  } = props;

  const element = (
    <Link
      {...rest}
      ref={ref}
      href={href}
      aria-label={AVATAR_COMPONENT_LABELS.home}
      className={cn(styles.avatarLink, className)}
    >
      <Image
        src={src}
        alt={alt}
        sizes={large ? "4rem" : "2.25rem"}
        className={cn(
          styles.avatarImage,
          large ? styles.avatarImageLarge : styles.avatarImageDefault
        )}
        priority
      />
    </Link>
  );

  return element;
});

Avatar.displayName = "Avatar";

type HeaderRef = HeaderComponentRef;
interface HeaderProps extends HeaderComponentProps, CommonWebAppComponentProps {
  /** Opt-in memoization wrapper (for profiling) */
  isMemoized?: boolean;
}

interface InternalHeaderProps extends HeaderProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

/** A base header component (client, minimal effects split out). */
const BaseHeader = React.forwardRef<HeaderRef, InternalHeaderProps>(
  function BaseHeader(props, ref) {
    const { className, componentId, isDebugMode, ...rest } = props;

    const isHomePage = usePathname() === "/";

    // Refs used by the effects component
    const headerRef = useRef<DivRef | null>(null);
    const avatarRef = useRef<DivRef | null>(null);

    const element = (
      <>
        <HeaderComponent
          {...rest}
          ref={ref}
          className={cn(styles.headerComponent, className)}
          style={{
            height: "var(--header-height)",
            marginBottom: "var(--header-mb)",
          }}
          data-header-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
          data-testid="header-root"
        >
          {isHomePage && (
            <>
              <Div
                ref={avatarRef}
                className={styles.avatarSection}
                data-avatar
              />
              <Container
                className={styles.avatarContainer}
                style={{
                  position:
                    "var(--header-position)" as React.CSSProperties["position"],
                }}
              >
                <Div
                  className={styles.avatarPositioningWrapper}
                  style={{
                    position:
                      "var(--header-inner-position)" as React.CSSProperties["position"],
                  }}
                >
                  <Div className={styles.avatarRelativeContainer}>
                    <AvatarContainer
                      className={styles.avatarBorderContainer}
                      style={{
                        opacity: "var(--avatar-border-opacity, 0)",
                        transform: "var(--avatar-border-transform)",
                      }}
                    />
                    <Avatar
                      large
                      className={styles.avatarImage}
                      style={{ transform: "var(--avatar-image-transform)" }}
                      href={AVATAR_COMPONENT_LABELS.link}
                    />
                  </Div>
                </Div>
              </Container>
            </>
          )}

          <Div
            ref={headerRef}
            className={styles.headerSection}
            style={{
              position:
                "var(--header-position)" as React.CSSProperties["position"],
            }}
            data-header
          >
            <Container
              className={styles.headerContainer}
              style={{
                position:
                  "var(--header-inner-position)" as React.CSSProperties["position"],
              }}
            >
              <Div className={styles.headerContent}>
                <Div className={styles.headerLeftSection}>
                  {!isHomePage && (
                    <AvatarContainer>
                      <Avatar href={AVATAR_COMPONENT_LABELS.link} />
                    </AvatarContainer>
                  )}
                </Div>

                <Div className={styles.headerCenterSection}>
                  <MobileHeaderNav className={styles.mobileNavigation} />
                  <DesktopHeaderNav className={styles.desktopNavigation} />
                </Div>

                <Div className={styles.headerRightSection}>
                  <Div className={styles.themeToggleWrapper}>
                    <HeaderThemeToggle />
                  </Div>
                </Div>
              </Div>
            </Container>
          </Div>
        </HeaderComponent>

        {isHomePage && (
          <Div
            className={styles.contentOffset}
            style={{ height: "var(--content-offset)" }}
          />
        )}

        {/* Effects (throttled via rAF) */}
        <HeaderEffects
          headerEl={headerRef}
          avatarEl={avatarRef}
          isHomePage={isHomePage}
        />
      </>
    );

    return element;
  }
);

BaseHeader.displayName = "BaseHeader";

/** A memoized header component. */
const MemoizedHeader = React.memo(
  React.forwardRef<HeaderRef, InternalHeaderProps>(
    function MemoizedHeader(props, ref) {
      const { componentId, isDebugMode, ...rest } = props;

      const element = (
        <BaseHeader
          {...rest}
          ref={ref}
          componentId={componentId}
          isDebugMode={isDebugMode}
        />
      );

      return element;
    }
  )
);

MemoizedHeader.displayName = "MemoizedHeader";

/** Public header component. */
export const Header = React.forwardRef<HeaderRef, HeaderProps>(
  function Header(props, ref) {
    const { isMemoized = false, _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = isMemoized ? (
      <MemoizedHeader
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    ) : (
      <BaseHeader
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }
);

Header.displayName = "Header";
