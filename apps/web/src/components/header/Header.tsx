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

import { AVATAR_COMPONENT_LABELS } from "./_data";
import {
  HeaderAvatar,
  HeaderAvatarContainer,
  HeaderDesktopNav,
  HeaderEffects,
  HeaderMobileNav,
  HeaderThemeToggle,
} from "./_internal";
import styles from "./Header.module.css";

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

/** A responsive site header with avatar, navigation, and theme toggle */
const BaseHeader: HeaderComponent = setDisplayName(function BaseHeader(props) {
  const { children, className, internalId, debugMode, ...rest } = props;

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
        className={cn(styles.headerComponent, className)}
        style={{
          height: "var(--header-height)",
          marginBottom: "var(--header-mb)",
        }}
        {...createComponentProps(internalId, "header", debugMode)}
      >
        {isHomePage && (
          <>
            <div ref={avatarRef} className={styles.avatarSection} />
            <Container
              className={styles.avatarContainer}
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
              internalId={internalId}
              debugMode={debugMode}
            >
              <div
                className={styles.avatarPositioningWrapper}
                style={{
                  position:
                    "var(--header-inner-position)" as React.CSSProperties["position"],
                }}
              >
                <div className={styles.avatarRelativeContainer}>
                  <HeaderAvatarContainer
                    _internalId={internalId}
                    _debugMode={debugMode}
                    className={styles.avatarBorderContainer}
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <HeaderAvatar
                    _internalId={internalId}
                    _debugMode={debugMode}
                    className={styles.avatarImage}
                    style={{ transform: "var(--avatar-image-transform)" }}
                    large
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
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
            <div className={styles.headerContent}>
              <div className={styles.headerLeftSection}>
                {!isHomePage && (
                  <HeaderAvatarContainer
                    _internalId={internalId}
                    _debugMode={debugMode}
                  >
                    <HeaderAvatar
                      _internalId={internalId}
                      _debugMode={debugMode}
                    />
                  </HeaderAvatarContainer>
                )}
              </div>
              <div className={styles.headerCenterSection}>
                <HeaderMobileNav
                  _internalId={internalId}
                  _debugMode={debugMode}
                  className={styles.mobileNavigation}
                />
                <HeaderDesktopNav
                  _internalId={internalId}
                  _debugMode={debugMode}
                  className={styles.desktopNavigation}
                />
              </div>
              <div className={styles.headerRightSection}>
                <div className={styles.themeToggleWrapper}>
                  <HeaderThemeToggle
                    _internalId={internalId}
                    _debugMode={debugMode}
                  />
                </div>
              </div>
            </div>
          </Container>
        </div>
        {children}
      </header>
      {isHomePage && (
        <div
          className={styles.contentOffset}
          style={{ height: "var(--content-offset)" }}
        />
      )}
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

  // Header component renders its own internal structure regardless of children
  // Children are optional and used for additional content inside the header

  const updatedProps = {
    ...rest,
    children,
    internalId: id,
    debugMode: isDebugMode,
  };

  const Component = isMemoized ? MemoizedHeader : BaseHeader;
  const element = <Component {...updatedProps}>{children}</Component>;
  return element;
});
