"use client";

import React from "react";

import {
  Footer as FooterComponent,
  type FooterProps as FooterComponentProps,
  type FooterRef as FooterComponentRef,
} from "@guyromellemagayano/components";

import type { CommonWebAppComponentProps } from "@web/@types/components";
import {
  FOOTER_COMPONENT_NAV_LINKS,
  type FooterLink,
} from "@web/components/footer/Footer.data";
import { useComponentId } from "@web/hooks/useComponentId";
import { cn } from "@web/lib";

import styles from "./Footer.module.css";

type FooterRef = FooterComponentRef;

interface FooterProps extends FooterComponentProps, CommonWebAppComponentProps {
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

/** Internal footer component with all props */
const InternalFooter = React.forwardRef<FooterRef, InternalFooterProps>(
  function InternalFooter(props, ref) {
    const {
      className,
      componentId,
      isDebugMode,
      brandName = "Guy Romelle Magayano",
      legalText = "All rights reserved.",
      navLinks = FOOTER_COMPONENT_NAV_LINKS,
      ...rest
    } = props;

    const element = (
      <FooterComponent
        {...rest}
        ref={ref}
        className={cn(styles.footerComponent, className)}
        data-footer-id={componentId}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="footer-root"
      >
        <div className={styles.footerContent}>
          <div className={styles.footerBrand}>
            <span className={styles.brandName}>{brandName}</span>
            <span className={styles.legalText}>{legalText}</span>
          </div>

          {navLinks.length > 0 && (
            <nav className={styles.footerNav}>
              <ul className={styles.navList}>
                {navLinks.map((link) => {
                  const isExternal = link.kind === "external";
                  const href = isExternal ? link.href : link.href.toString();

                  return (
                    <li key={href} className={styles.navItem}>
                      <a
                        href={href}
                        target={isExternal && link.newTab ? "_blank" : "_self"}
                        rel={
                          isExternal && link.newTab
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className={styles.navLink}
                      >
                        {link.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}
        </div>
      </FooterComponent>
    );

    return element;
  }
);

InternalFooter.displayName = "InternalFooter";

/** Public footer component with useComponentId integration */
export const Footer = React.forwardRef<FooterRef, FooterProps>(
  function Footer(props, ref) {
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
  }
);

Footer.displayName = "Footer";
