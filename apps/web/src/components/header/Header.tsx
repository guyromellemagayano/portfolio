"use client";

import React, { useRef } from "react";

import { usePathname } from "next/navigation";

import {
  Div,
  type DivRef,
  Header as HeaderComponent,
} from "@guyromellemagayano/components";

import { Container } from "@web/components";
import {
  Avatar,
  AVATAR_COMPONENT_LABELS,
  AvatarContainer,
  DesktopHeaderNav,
  HeaderEffects,
  type HeaderProps,
  type HeaderRef,
  HeaderThemeToggle,
  MobileHeaderNav,
} from "@web/components/header";
import { cn } from "@web/lib";

import styles from "./Header.module.css";

/** A base header component (client, minimal effects split out). */
const BaseHeader = React.forwardRef<HeaderRef, HeaderProps>(
  function BaseHeader(props, ref) {
    const { className, ...rest } = props;

    const isHomePage = usePathname() === "/";

    // Refs used by the effects component
    const headerRef = useRef<DivRef | null>(null);
    const avatarRef = useRef<DivRef | null>(null);

    const element = (
      <>
        <HeaderComponent
          ref={ref}
          className={cn(styles.headerComponent, className)}
          style={{
            height: "var(--header-height)",
            marginBottom: "var(--header-mb)",
          }}
          {...rest}
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
  React.forwardRef<HeaderRef, HeaderProps>(function MemoizedHeader(props, ref) {
    const { ...rest } = props;
    return <BaseHeader ref={ref} {...rest} />;
  })
);

MemoizedHeader.displayName = "MemoizedHeader";

/** Public Header component. */
export const Header = React.forwardRef<HeaderRef, HeaderProps>(
  function Header(props, ref) {
    const { isMemoized = false, ...rest } = props;
    return isMemoized ? (
      <MemoizedHeader ref={ref} {...rest} />
    ) : (
      <BaseHeader ref={ref} {...rest} />
    );
  }
);

Header.displayName = "Header";
