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
  AvatarContainer,
  DesktopHeaderNav,
  HeaderEffects,
  HeaderThemeToggle,
  MobileHeaderNav,
} from "@web/components/header/_internal";
import {
  AVATAR_COMPONENT_LABELS,
  type HeaderProps,
  type HeaderRef,
} from "@web/components/header/models";
import { cn } from "@web/lib";

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
          className={cn(
            "pointer-events-none relative z-50 flex flex-none flex-col",
            className
          )}
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
                className="order-last mt-[calc(--spacing(16)-(--spacing(3)))]"
                data-avatar
              />
              <Container
                className="top-0 order-last -mb-3 pt-3"
                style={{
                  position:
                    "var(--header-position)" as React.CSSProperties["position"],
                }}
              >
                <Div
                  className="top-(--avatar-top,--spacing(3)) w-full"
                  style={{
                    position:
                      "var(--header-inner-position)" as React.CSSProperties["position"],
                  }}
                >
                  <Div className="relative">
                    <AvatarContainer
                      className="absolute top-3 left-0 origin-left transition-opacity"
                      style={{
                        opacity: "var(--avatar-border-opacity, 0)",
                        transform: "var(--avatar-border-transform)",
                      }}
                    />
                    <Avatar
                      large
                      className="block h-16 w-16 origin-left"
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
            className="top-0 z-10 h-16 pt-6"
            style={{
              position:
                "var(--header-position)" as React.CSSProperties["position"],
            }}
            data-header
          >
            <Container
              className="top-(--header-top,--spacing(6)) w-full"
              style={{
                position:
                  "var(--header-inner-position)" as React.CSSProperties["position"],
              }}
            >
              <Div className="relative flex gap-4">
                <Div className="flex flex-1">
                  {!isHomePage && (
                    <AvatarContainer>
                      <Avatar href={AVATAR_COMPONENT_LABELS.link} />
                    </AvatarContainer>
                  )}
                </Div>

                <Div className="flex flex-1 justify-end md:justify-center">
                  <MobileHeaderNav className="pointer-events-auto md:hidden" />
                  <DesktopHeaderNav className="pointer-events-auto hidden md:block" />
                </Div>

                <Div className="flex justify-end md:flex-1">
                  <Div className="pointer-events-auto">
                    <HeaderThemeToggle />
                  </Div>
                </Div>
              </Div>
            </Container>
          </Div>
        </HeaderComponent>

        {isHomePage && (
          <Div
            className="flex-none"
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

/** A memoized header component. */
const MemoizedHeader = React.memo(
  React.forwardRef<HeaderRef, HeaderProps>(function MemoizedHeader(props, ref) {
    const { ...rest } = props;
    return <BaseHeader ref={ref} {...rest} />;
  })
);

/** Public Header component. */
export const Header = React.forwardRef<HeaderRef, HeaderProps>(
  function Header(props, ref) {
    const { isMemoized, ...rest } = props;
    return isMemoized ? (
      <MemoizedHeader ref={ref} {...rest} />
    ) : (
      <BaseHeader ref={ref} {...rest} />
    );
  }
);
