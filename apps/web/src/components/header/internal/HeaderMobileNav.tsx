import React from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import {
  createComponentProps,
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components/Icon";

import {
  type CommonHeaderNavProps,
  type HeaderComponentNavLinks,
  MOBILE_HEADER_NAV_LINKS,
  MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS,
} from "../data";
import { HeaderMobileNavItem } from "./HeaderMobileNavItem";

// ============================================================================
// HEADER MOBILE NAV COMPONENT TYPES & INTERFACES
// ============================================================================

/** `HeaderMobileNavProps` component props. */
export interface HeaderMobileNavProps
  extends React.ComponentPropsWithRef<typeof Popover>,
    CommonHeaderNavProps {}

/** `HeaderMobileNavComponent` component type. */
export type HeaderMobileNavComponent = React.FC<HeaderMobileNavProps>;

// ============================================================================
// BASE HEADER MOBILE NAV COMPONENT
// ============================================================================

/** A mobile navigation component that displays a menu button and a list of links. */
const BaseHeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function BaseHeaderMobileNav(props) {
    const { links, debugId, debugMode, ...rest } = props;

    const navLinks: HeaderComponentNavLinks = MOBILE_HEADER_NAV_LINKS;
    const validLinks = filterValidNavigationLinks(navLinks);
    if (!hasValidNavigationLinks(validLinks)) return null;

    const element = (
      <Popover
        {...rest}
        {...createComponentProps(debugId, "header-mobile-nav", debugMode)}
      >
        <PopoverButton className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20">
          {MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS?.menu ?? null}
          <Icon.ChevronDown
            className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
            debugId={debugId}
            debugMode={debugMode}
          />
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
          <div className="flex flex-row-reverse items-center justify-between">
            <PopoverButton
              aria-label={
                MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS?.closeMenu ??
                undefined
              }
              className="-m-1 p-1"
            >
              <Icon.Close className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
            </PopoverButton>
            {MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS?.navigation ? (
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                {MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS.navigation}
              </h2>
            ) : null}
          </div>
          {hasValidNavigationLinks(links) ? (
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {links.map(({ label, href }) => (
                  <HeaderMobileNavItem
                    key={`${label}:${href}`}
                    href={href}
                    debugId={debugId}
                    debugMode={debugMode}
                  >
                    {label}
                  </HeaderMobileNavItem>
                ))}
              </ul>
            </nav>
          ) : null}
        </PopoverPanel>
      </Popover>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER MOBILE NAV COMPONENT
// ============================================================================

/** A memoized header mobile nav component. */
const MemoizedHeaderMobileNav = React.memo(BaseHeaderMobileNav);

// ============================================================================
// MAIN HEADER MOBILE NAV COMPONENT
// ============================================================================

/** A header mobile nav component that supports memoization and internal debug props. */
export const HeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function HeaderMobileNav(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedHeaderMobileNav
      : BaseHeaderMobileNav;
    const element = <Component {...rest} />;
    return element;
  }
);
