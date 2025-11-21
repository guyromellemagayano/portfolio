import React from "react";

import {
  Popover,
  PopoverBackdrop,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";

import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  filterValidNavigationLinks,
  hasValidNavigationLinks,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Icon } from "@web/components/Icon";

import {
  type HeaderComponentNavLinks,
  MOBILE_HEADER_NAV_LINKS,
  MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS,
} from "../../Header.data";
import { type CommonHeaderNavProps } from "../../Header.types";
import { HeaderMobileNavItem } from "../HeaderMobileNavItem";

// ============================================================================
// HEADER MOBILE NAV COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HeaderMobileNavProps
  extends React.ComponentPropsWithRef<typeof Popover>,
    CommonHeaderNavProps {}
export type HeaderMobileNavComponent = React.FC<HeaderMobileNavProps>;

// ============================================================================
// BASE HEADER MOBILE NAV COMPONENT
// ============================================================================

const BaseHeaderMobileNav: HeaderMobileNavComponent = setDisplayName(
  function BaseHeaderMobileNav(props) {
    const { debugId, debugMode, ...rest } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const navLinks: HeaderComponentNavLinks = MOBILE_HEADER_NAV_LINKS;
    const validLinks = filterValidNavigationLinks(navLinks);
    if (!hasValidNavigationLinks(validLinks)) return null;

    const element = (
      <Popover
        {...rest}
        {...createComponentProps(componentId, "header-mobile-nav", isDebugMode)}
      >
        <PopoverButton
          className="group flex items-center rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg ring-1 shadow-zinc-800/5 ring-zinc-900/5 backdrop-blur-sm dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20"
          {...createComponentProps(
            componentId,
            "header-mobile-nav-button",
            isDebugMode
          )}
        >
          {MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS?.menu ?? null}
          <Icon
            name="ChevronDown"
            className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
          />
        </PopoverButton>
        <PopoverBackdrop
          transition
          className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur-xs duration-150 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-black/80"
          {...createComponentProps(
            componentId,
            "header-mobile-nav-backdrop",
            isDebugMode
          )}
        />
        <PopoverPanel
          focus
          transition
          className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-white p-8 ring-1 ring-zinc-900/5 duration-150 data-closed:scale-95 data-closed:opacity-0 data-enter:ease-out data-leave:ease-in dark:bg-zinc-900 dark:ring-zinc-800"
          {...createComponentProps(
            componentId,
            "header-mobile-nav-panel",
            isDebugMode
          )}
        >
          <div className="flex flex-row-reverse items-center justify-between">
            <PopoverButton
              aria-label={
                MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS?.closeMenu ??
                undefined
              }
              className="-m-1 p-1"
              {...createComponentProps(
                componentId,
                "header-mobile-nav-close-button",
                isDebugMode
              )}
            >
              <Icon
                name="Close"
                className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
              />
            </PopoverButton>

            {MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS?.navigation ? (
              <h2
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400"
                {...createComponentProps(
                  componentId,
                  "header-mobile-nav-title",
                  isDebugMode
                )}
              >
                {MOBILE_HEADER_NAVIGATION_COMPONENT_LABELS.navigation}
              </h2>
            ) : null}
          </div>
          <nav
            className="mt-6"
            {...createComponentProps(
              componentId,
              "header-mobile-nav-nav",
              isDebugMode
            )}
          >
            <ul
              className="-my-2 divide-y divide-zinc-100 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300"
              {...createComponentProps(
                componentId,
                "header-mobile-nav-list",
                isDebugMode
              )}
            >
              {validLinks.map(({ label, href }) => (
                <HeaderMobileNavItem
                  key={`${label}:${href}`}
                  href={href}
                  debugId={componentId}
                  debugMode={isDebugMode}
                >
                  {label}
                </HeaderMobileNavItem>
              ))}
            </ul>
          </nav>
        </PopoverPanel>
      </Popover>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HEADER MOBILE NAV COMPONENT
// ============================================================================

const MemoizedHeaderMobileNav = React.memo(BaseHeaderMobileNav);

// ============================================================================
// MAIN HEADER MOBILE NAV COMPONENT
// ============================================================================

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
