import React from "react";

import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { cn } from "@web/lib";

import { CommonHeaderNavProps, DESKTOP_HEADER_NAV_LINKS } from "../../_data";
import { HeaderDesktopNavItem } from "../HeaderDesktopNavItem";
import styles from "./HeaderDesktopNav.module.css";

interface HeaderDesktopNavProps extends CommonHeaderNavProps {}
type HeaderDesktopNavComponent = React.FC<HeaderDesktopNavProps>;

/** A desktop navigation component that displays a list of navigation links. */
const HeaderDesktopNav: HeaderDesktopNavComponent = setDisplayName(
  function HeaderDesktopNav(props) {
    const { className, internalId, debugMode, ...rest } = props;

    const { id, isDebugMode } = useComponentId({
      internalId,
      debugMode,
    });

    const element = (
      <nav
        {...rest}
        className={cn(styles.HeaderDesktopNavList, className)}
        data-desktop-header-nav-id={id}
        data-debug-mode={isDebugMode ? "true" : undefined}
        data-testid="desktop-header-nav-root"
      >
        {DESKTOP_HEADER_NAV_LINKS &&
          DESKTOP_HEADER_NAV_LINKS.map(({ label, href }) => (
            <HeaderDesktopNavItem key={`${label}:${href}`} href={href}>
              {label}
            </HeaderDesktopNavItem>
          ))}
      </nav>
    );

    return element;
  }
);

export { HeaderDesktopNav };
