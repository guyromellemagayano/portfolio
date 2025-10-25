"use client";

import React, { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container } from "@web/components";
import { clamp, cn } from "@web/utils";

import {
  HeaderAvatar,
  HeaderAvatarContainer,
  HeaderDesktopNav,
  HeaderMobileNav,
  HeaderThemeToggle,
} from "./_internal";
import { AVATAR_COMPONENT_LABELS } from "./Header.data";

// ============================================================================
// HEADER COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HeaderProps
  extends React.ComponentProps<"header">,
    CommonComponentProps {}
export type HeaderComponent = React.FC<HeaderProps>;

// ============================================================================
// BASE HEADER COMPONENT
// ============================================================================

const BaseHeader: HeaderComponent = setDisplayName(function BaseHeader(props) {
  const { children, className, debugId, debugMode, ...rest } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  const isHomePage: boolean = usePathname() === AVATAR_COMPONENT_LABELS.link;

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

  const element = (
    <>
      <header
        {...rest}
        className={cn(
          "pointer-events-none relative z-50 flex flex-none flex-col",
          className
        )}
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
        {...createComponentProps(componentId, "header", isDebugMode)}
      >
        {isHomePage ? (
          <>
            <div
              ref={avatarRef}
              className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
              {...createComponentProps(
                componentId,
                "header-avatar-div",
                debugMode
              )}
            />
            <Container
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
              className="top-0 order-last -mb-3 pt-3"
              debugId={componentId}
              debugMode={isDebugMode}
            >
              <div
                style={{
                  position:
                    "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
                className="top-(--avatar-top,--spacing(3)) w-full"
                {...createComponentProps(
                  componentId,
                  "header-avatar-positioning-div",
                  debugMode
                )}
              >
                <div
                  className="relative"
                  {...createComponentProps(
                    componentId,
                    "header-avatar-relative-div",
                    debugMode
                  )}
                >
                  <HeaderAvatarContainer
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                    className="absolute top-3 left-0 origin-left transition-opacity"
                    debugId={componentId}
                    debugMode={isDebugMode}
                  />
                  <HeaderAvatar
                    large
                    style={{ transform: "var(--avatar-image-transform)" }}
                    className="block h-16 w-16 origin-left"
                    debugId={componentId}
                    debugMode={isDebugMode}
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
          {...createComponentProps(componentId, "header-section", debugMode)}
        >
          <Container
            className="top-(--header-top,--spacing(6)) w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
            debugId={componentId}
            debugMode={isDebugMode}
          >
            <div
              className="relative flex gap-4"
              {...createComponentProps(
                componentId,
                "header-content",
                debugMode
              )}
            >
              <div
                className="flex flex-1"
                {...createComponentProps(
                  componentId,
                  "header-left-section",
                  debugMode
                )}
              >
                {!isHomePage ? (
                  <HeaderAvatarContainer
                    debugId={componentId}
                    debugMode={isDebugMode}
                  >
                    <HeaderAvatar
                      debugId={componentId}
                      debugMode={isDebugMode}
                    />
                  </HeaderAvatarContainer>
                ) : null}
              </div>
              <div
                className="flex flex-1 justify-end md:justify-center"
                {...createComponentProps(
                  componentId,
                  "header-center-section",
                  debugMode
                )}
              >
                <HeaderMobileNav
                  className="pointer-events-auto md:hidden"
                  debugId={componentId}
                  debugMode={isDebugMode}
                />
                <HeaderDesktopNav
                  className="pointer-events-auto hidden md:block"
                  debugId={componentId}
                  debugMode={isDebugMode}
                />
              </div>
              <div
                className="flex justify-end md:flex-1"
                {...createComponentProps(
                  componentId,
                  "header-right-section",
                  debugMode
                )}
              >
                <div
                  className="pointer-events-auto"
                  {...createComponentProps(
                    componentId,
                    "header-theme-toggle-wrapper",
                    debugMode
                  )}
                >
                  <HeaderThemeToggle
                    debugId={componentId}
                    debugMode={isDebugMode}
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
        {children}
      </header>

      {isHomePage ? (
        <div
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
          {...createComponentProps(
            componentId,
            "header-content-offset",
            debugMode
          )}
        />
      ) : null}
    </>
  );

  return element;
});

// ============================================================================
// MEMOIZED HEADER COMPONENT
// ============================================================================

const MemoizedHeader = React.memo(BaseHeader);

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================

export const Header: HeaderComponent = setDisplayName(function Header(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedHeader : BaseHeader;
  const element = <Component {...rest}>{children}</Component>;
  return element;
});
