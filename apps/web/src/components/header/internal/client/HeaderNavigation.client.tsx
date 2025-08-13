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

import { ChevronDownIcon, CloseIcon } from "@web/components/header/internal";
import {
  DESKTOP_HEADER_NAV_LINKS,
  type DesktopHeaderNavItemProps,
  type DesktopHeaderNavItemRef,
  HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS,
  MOBILE_HEADER_NAV_LINKS,
  type MobileHeaderNavItemProps,
  type MobileHeaderNavItemRef,
} from "@web/components/header/models";
import { isActivePath } from "@web/components/header/utils";
import { cn } from "@web/lib";

/** A mobile navigation item component. */
export const MobileHeaderNavItem = React.forwardRef<
  MobileHeaderNavItemRef,
  MobileHeaderNavItemProps
>(function MobileHeaderNavItem(props, ref) {
  const { children, href = "#", target = "_self", title = "", ...rest } = props;

  if (!children && !href) return null;

  return (
    <Li ref={ref} {...rest}>
      <Link href={href} target={target} title={title} className="block py-2">
        {children}
      </Link>
    </Li>
  );
});

/** A mobile navigation component. */
export const MobileHeaderNav = React.forwardRef<
  MobileHeaderNavItemRef,
  MobileHeaderNavItemProps
>(function MobileHeaderNav(props, ref) {
  const { ...rest } = props;

  return (
    <Popover ref={ref} {...rest}>
      <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
        {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.menu}
        <ChevronDownIcon className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400" />
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/80"
      />
      <PopoverPanel
        focus
        transition
        className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
      >
        <Div className="flex flex-row-reverse items-center justify-between">
          <PopoverButton
            aria-label={HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.closeMenu}
            className="-m-1 p-1"
          >
            <CloseIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
          </PopoverButton>
          <Heading
            as={"h2"}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
          >
            {HEADER_MOBILE_NAVIGATION_COMPONENT_LABELS.navigation}
          </Heading>
        </Div>

        {MOBILE_HEADER_NAV_LINKS.length > 0 && (
          <Nav className="mt-6">
            <Ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
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
          "relative block px-3 py-2 transition",
          isActive
            ? "text-teal-500 dark:text-teal-400"
            : "hover:text-teal-500 dark:hover:text-teal-400"
        )}
      >
        {children}
        {isActive && (
          <Span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-teal-500/0 via-teal-500/40 to-teal-500/0 dark:from-teal-400/0 dark:via-teal-400/40 dark:to-teal-400/0" />
        )}
      </Link>
    </Li>
  );
});

/** A desktop navigation component. */
export const DesktopHeaderNav = React.forwardRef<
  DesktopHeaderNavItemRef,
  DesktopHeaderNavItemProps
>(function DesktopHeaderNav(props, ref) {
  const { ...rest } = props;

  return (
    <Nav ref={ref} {...rest}>
      <Ul className="flex rounded-full bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
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
