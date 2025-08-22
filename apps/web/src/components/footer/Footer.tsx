"use client";

import React from "react";

import {
  A,
  Div,
  Footer as GRMFooterComponent,
  Li,
  Nav,
  P,
} from "@guyromellemagayano/components";
import { setDisplayName, useComponentId } from "@guyromellemagayano/hooks";
import { getLinkTargetProps, isValidLink } from "@guyromellemagayano/utils";

import type { CommonWebAppComponentProps } from "@web/@types";
import { Container } from "@web/components/container";
import { cn } from "@web/lib";

import {
  FOOTER_COMPONENT_LABELS,
  FOOTER_COMPONENT_NAV_LINKS,
  type FooterLink,
} from "./Footer.data";
import styles from "./Footer.module.css";

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

type FooterRef = React.ComponentRef<typeof GRMFooterComponent>;
interface FooterProps
  extends React.ComponentPropsWithoutRef<typeof GRMFooterComponent>,
    CommonWebAppComponentProps {
  /** Optional custom brand name override */
  brandName?: string;
  /** Optional custom legal text override */
  legalText?: string;
  /** Optional navigation links override */
  navLinks?: ReadonlyArray<FooterLink>;
}

interface InternalFooterProps extends FooterProps {
  /** Internal component ID passed from parent */
  componentId?: string;
  /** Internal debug mode passed from parent */
  isDebugMode?: boolean;
}

type InternalFooterComponent = React.ForwardRefExoticComponent<
  InternalFooterProps & React.RefAttributes<FooterRef>
>;

/** Internal footer component with all props */
const InternalFooter = setDisplayName(
  React.forwardRef<FooterRef, InternalFooterProps>(
    function InternalFooter(props, ref) {
      const {
        className,
        componentId,
        isDebugMode,
        navLinks = FOOTER_COMPONENT_NAV_LINKS,
        ...rest
      } = props;

      const element = (
        <GRMFooterComponent
          {...rest}
          ref={ref}
          className={cn(styles.footerComponent, className)}
          data-footer-id={componentId}
          data-debug-mode={isDebugMode ? "true" : undefined}
          data-testid="footer-root"
        >
          <Container.Outer>
            <Div className={styles.footerContentWrapper}>
              <Container.Inner>
                {navLinks.length > 0 && (
                  <Div className={styles.footerLayout}>
                    <Nav className={styles.footerNavigationList}>
                      {navLinks.map((link) => {
                        const isExternal = link.kind === "external";
                        const href = isExternal
                          ? link.href
                          : link.href.toString();

                        if (!isValidLink(href)) return null;

                        const linkTargetProps = getLinkTargetProps(
                          href,
                          isExternal && link.newTab ? "_blank" : "_self"
                        );

                        const element = (
                          <Li key={href} className={styles.navItem}>
                            <A
                              href={href}
                              target={linkTargetProps.target}
                              rel={linkTargetProps.rel}
                              className={styles.navLink}
                            >
                              {link.label}
                            </A>
                          </Li>
                        );

                        return element;
                      })}
                    </Nav>
                    <P
                      className={styles.footerLegalText}
                      dangerouslySetInnerHTML={{
                        __html: FOOTER_COMPONENT_LABELS.legalText,
                      }}
                    />
                  </Div>
                )}
              </Container.Inner>
            </Div>
          </Container.Outer>
        </GRMFooterComponent>
      );

      return element;
    }
  ),
  "InternalFooter"
) as InternalFooterComponent;

type FooterComponent = React.ForwardRefExoticComponent<
  FooterProps & React.RefAttributes<FooterRef>
>;

/** Public footer component with `useComponentId` integration */
export const Footer: FooterComponent = setDisplayName(
  React.forwardRef(function Footer(props, ref) {
    const { _internalId, _debugMode, ...rest } = props;

    // Use shared hook for ID generation and debug logging
    // Component name will be auto-detected from export const declaration
    const { id, isDebugMode } = useComponentId({
      internalId: _internalId,
      debugMode: _debugMode,
    });

    const element = (
      <InternalFooter
        {...rest}
        ref={ref}
        componentId={id}
        isDebugMode={isDebugMode}
      />
    );

    return element;
  }),
  "Footer"
) as FooterComponent;
