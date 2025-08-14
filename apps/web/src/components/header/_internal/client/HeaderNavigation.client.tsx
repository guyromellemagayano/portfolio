"use client";

import React from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Div,
  Heading,
  Li,
  Nav,
  Span,
  Ul,
} from "@guyromellemagayano/components";

import {
  ChevronDownIcon,
  CloseIcon,
  DESKTOP_HEADER_NAV_LINKS,
  type DesktopHeaderNavItemProps,
  type DesktopHeaderNavItemRef,
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS,
  MOBILE_HEADER_NAV_LINKS,
  type MobileHeaderNavItemProps,
  type MobileHeaderNavItemRef,
} from "@web/components/header";
import { cn, isActivePath } from "@web/lib";

import styles from "./HeaderNavigation.client.module.css";

/** A mobile navigation item component. */
export const MobileHeaderNavItem = React.forwardRef<
  MobileHeaderNavItemRef,
  MobileHeaderNavItemProps
>(function MobileHeaderNavItem(props, ref) {
  const { children, href = "#", target = "_self", title = "", ...rest } = props;

  if (!children && !href) return null;

  return (
    <Li ref={ref} {...rest}>
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
});

MobileHeaderNavItem.displayName = "MobileHeaderNavItem";

/** A mobile navigation component. */
export const MobileHeaderNav = React.forwardRef<
  MobileHeaderNavItemRef,
  MobileHeaderNavItemProps
>(function MobileHeaderNav(props, ref) {
  const { ...rest } = props;

  return (
    <Popover ref={ref} {...rest}>
      <PopoverButton className={styles.mobileHeaderNavButton}>
        {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.menu}
        <ChevronDownIcon className={styles.mobileHeaderNavChevron} />
      </PopoverButton>
      <PopoverBackdrop transition className={styles.mobileHeaderNavBackdrop} />
      <PopoverPanel focus transition className={styles.mobileHeaderNavPanel}>
        <Div className={styles.mobileHeaderNavHeader}>
          <PopoverButton
            aria-label={HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.closeMenu}
            className={styles.mobileHeaderNavCloseButton}
          >
            <CloseIcon className={styles.mobileHeaderNavCloseIcon} />
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
});

MobileHeaderNav.displayName = "MobileHeaderNav";

/** A desktop navigation item component. */
export const DesktopHeaderNavItem = React.forwardRef<
  DesktopHeaderNavItemRef,
  DesktopHeaderNavItemProps
>(function DesktopHeaderNavItem(props, ref) {
  const { children, href = "#", target = "_self", title = "", ...rest } = props;

  const pathname = usePathname();
  const isActive = isActivePath(pathname, href);

  if (!children && !href) return null;

  return (
    <Li ref={ref} {...rest}>
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
});

DesktopHeaderNavItem.displayName = "DesktopHeaderNavItem";

/** A desktop navigation component. */
export const DesktopHeaderNav = React.forwardRef<
  DesktopHeaderNavItemRef,
  DesktopHeaderNavItemProps
>(function DesktopHeaderNav(props, ref) {
  const { ...rest } = props;

  return (
    <Nav ref={ref} {...rest}>
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
});

DesktopHeaderNav.displayName = "DesktopHeaderNav";
