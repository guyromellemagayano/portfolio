"use client";

import React, { useRef } from "react";

import { usePathname } from "next/navigation";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container } from "@web/components";
import { cn } from "@web/utils";

import { AVATAR_COMPONENT_LABELS } from "./data";
import {
  HeaderAvatar,
  HeaderAvatarContainer,
  HeaderDesktopNav,
  HeaderEffects,
  HeaderMobileNav,
  HeaderThemeToggle,
} from "./internal";

// ============================================================================
// HEADER COMPONENT TYPES & INTERFACES
// ============================================================================

/** `HeaderProps` component props. */
export interface HeaderProps
  extends React.ComponentProps<"header">,
    CommonComponentProps {}

/** `HeaderComponent` component type. */
export type HeaderComponent = React.FC<HeaderProps>;

// ============================================================================
// BASE HEADER COMPONENT
// ============================================================================

/** A responsive site header with avatar, navigation, and theme toggle */
const BaseHeader: HeaderComponent = setDisplayName(function BaseHeader(props) {
  const { children, className, debugId, debugMode, ...rest } = props;

  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  const isHomePage: React.ComponentProps<typeof HeaderEffects>["isHomePage"] =
    usePathname() === AVATAR_COMPONENT_LABELS.link;

  let headerRef: React.ComponentProps<typeof HeaderEffects>["headerEl"] =
    useRef(null);
  let avatarRef: React.ComponentProps<typeof HeaderEffects>["avatarEl"] =
    useRef(null);
  let isInitialRender: React.ComponentProps<
    typeof HeaderEffects
  >["isInitialRender"] = useRef(true);

  const element = (
    <>
      <header
        {...rest}
        id={`${componentId}-header-root`}
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
            />
            <Container
              id={`${componentId}-header-avatar-container`}
              className="top-0 order-last -mb-3 pt-3"
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
              debugId={debugId}
              debugMode={debugMode}
              {...createComponentProps(
                componentId,
                "header-avatar-container",
                debugMode
              )}
            >
              <div
                id={`${componentId}-header-avatar-positioning-wrapper`}
                className="top-(--avatar-top,--spacing(3)) w-full"
                style={{
                  position:
                    "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
                {...createComponentProps(
                  componentId,
                  "header-avatar-positioning-wrapper",
                  debugMode
                )}
              >
                <div
                  id={`${componentId}-header-avatar-relative-container`}
                  className="relative"
                  {...createComponentProps(
                    componentId,
                    "header-avatar-relative-container",
                    debugMode
                  )}
                >
                  <HeaderAvatarContainer
                    debugId={debugId}
                    debugMode={debugMode}
                    id={`${componentId}-header-avatar-border-container`}
                    className="absolute top-3 left-0 origin-left transition-opacity"
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                    {...createComponentProps(
                      componentId,
                      "header-avatar-border-container",
                      debugMode
                    )}
                  />
                  <HeaderAvatar
                    debugId={debugId}
                    debugMode={debugMode}
                    id={`${componentId}-header-avatar-image`}
                    className="block h-16 w-16 origin-left"
                    style={{ transform: "var(--avatar-image-transform)" }}
                    large
                    {...createComponentProps(
                      componentId,
                      "header-avatar-image",
                      debugMode
                    )}
                  />
                </div>
              </div>
            </Container>
          </>
        ) : null}
        <div
          ref={headerRef}
          id={`${componentId}-header-section`}
          className="top-0 z-10 h-16 pt-6"
          style={{
            position:
              "var(--header-position)" as React.CSSProperties["position"],
          }}
          {...createComponentProps(componentId, "header-section", debugMode)}
        >
          <Container
            id={`${componentId}-header-container`}
            className="top-(--header-top,--spacing(6)) w-full"
            style={{
              position:
                "var(--header-inner-position)" as React.CSSProperties["position"],
            }}
          >
            <div
              id={`${componentId}-header-content`}
              className="relative flex gap-4"
              {...createComponentProps(
                componentId,
                "header-content",
                debugMode
              )}
            >
              <div
                id={`${componentId}-header-left-section`}
                className="flex flex-1"
                {...createComponentProps(
                  componentId,
                  "header-left-section",
                  debugMode
                )}
              >
                {!isHomePage ? (
                  <HeaderAvatarContainer
                    debugId={debugId}
                    debugMode={debugMode}
                  >
                    <HeaderAvatar debugId={debugId} debugMode={debugMode} />
                  </HeaderAvatarContainer>
                ) : null}
              </div>
              <div
                id={`${componentId}-header-center-section`}
                className="flex flex-1 justify-end md:justify-center"
                {...createComponentProps(
                  componentId,
                  "header-center-section",
                  debugMode
                )}
              >
                <HeaderMobileNav
                  debugId={debugId}
                  debugMode={debugMode}
                  className="pointer-events-auto md:hidden"
                />
                <HeaderDesktopNav
                  debugId={debugId}
                  debugMode={debugMode}
                  className="pointer-events-auto hidden md:block"
                />
              </div>
              <div
                id={`${componentId}-header-right-section`}
                className="flex justify-end md:flex-1"
                {...createComponentProps(
                  componentId,
                  "header-right-section",
                  debugMode
                )}
              >
                <div
                  id={`${componentId}-header-theme-toggle-wrapper`}
                  className="pointer-events-auto"
                  {...createComponentProps(
                    componentId,
                    "header-theme-toggle-wrapper",
                    debugMode
                  )}
                >
                  <HeaderThemeToggle debugId={debugId} debugMode={debugMode} />
                </div>
              </div>
            </div>
          </Container>
        </div>
        {children}
      </header>
      {isHomePage ? (
        <div
          id={`${componentId}-header-content-offset`}
          className="flex-none"
          style={{ height: "var(--content-offset)" }}
          {...createComponentProps(
            componentId,
            "header-content-offset",
            debugMode
          )}
        />
      ) : null}
      <HeaderEffects
        headerEl={headerRef}
        avatarEl={avatarRef}
        isHomePage={isHomePage}
        isInitialRender={isInitialRender}
      />
    </>
  );

  return element;
});

// ============================================================================
// MEMOIZED HEADER COMPONENT
// ============================================================================

/** A memoized header component. */
const MemoizedHeader = React.memo(BaseHeader);

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================

/** The main header component for the application. */
export const Header: HeaderComponent = setDisplayName(function Header(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedHeader : BaseHeader;
  const element = <Component {...rest}>{children}</Component>;
  return element;
});
