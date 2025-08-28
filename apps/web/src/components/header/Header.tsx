"use client";

import React, { useRef } from "react";

import { usePathname } from "next/navigation";

import { useComponentId } from "@guyromellemagayano/hooks";
import { type ComponentProps, setDisplayName } from "@guyromellemagayano/utils";

import { Container } from "@web/components";
import { cn } from "@web/lib";

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
// BASE HEADER COMPONENT
// ============================================================================

interface HeaderProps
  extends Omit<React.ComponentProps<"header">, "children">,
    ComponentProps {}
type HeaderComponent = React.FC<HeaderProps>;

/** A base header component (client, minimal effects split out). */
const BaseHeader: HeaderComponent = setDisplayName(function BaseHeader(props) {
  const { className, internalId, debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  const isHomePage: React.ComponentProps<typeof HeaderEffects>["isHomePage"] =
    usePathname() === AVATAR_COMPONENT_LABELS.link;

  // Refs used by the effects component
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
        data-header-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="header-root"
      >
        {isHomePage && (
          <>
            <div ref={avatarRef} className={styles.avatarSection} data-avatar />
            <Container
              className={styles.avatarContainer}
              style={{
                position:
                  "var(--header-position)" as React.CSSProperties["position"],
              }}
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
                    className={styles.avatarBorderContainer}
                    style={{
                      opacity: "var(--avatar-border-opacity, 0)",
                      transform: "var(--avatar-border-transform)",
                    }}
                  />
                  <HeaderAvatar
                    large
                    className={styles.avatarImage}
                    style={{ transform: "var(--avatar-image-transform)" }}
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
                  <HeaderAvatarContainer>
                    <HeaderAvatar />
                  </HeaderAvatarContainer>
                )}
              </div>
              <div className={styles.headerCenterSection}>
                <HeaderMobileNav className={styles.mobileNavigation} />
                <HeaderDesktopNav className={styles.desktopNavigation} />
              </div>
              <div className={styles.headerRightSection}>
                <div className={styles.themeToggleWrapper}>
                  <HeaderThemeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && (
        <div
          className={styles.contentOffset}
          style={{ height: "var(--content-offset)" }}
        />
      )}
      {/* Effects (throttled via rAF) */}
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

/** A header component. */
const Header: HeaderComponent = setDisplayName(function Header(props) {
  const { isMemoized = false, internalId, debugMode, ...rest } = props;

  const { id, isDebugMode } = useComponentId({
    internalId,
    debugMode,
  });

  const updatedProps = {
    ...rest,
    internalId: id,
    debugMode: isDebugMode,
  };

  const element = isMemoized ? (
    <MemoizedHeader {...updatedProps} />
  ) : (
    <BaseHeader {...updatedProps} />
  );

  return element;
});

export { Header };
