/**
 * @file apps/jobs/src/components/ActiveNav.tsx
 * @author Guy Romelle Magayano
 * @description Primary jobs navigation with button variants.
 */

import { NavLink } from "react-router";

import { buttonVariants } from "@jobs/components/ui/Button";
import { cn } from "@jobs/lib/utils";

type NavItem = {
  href: string;
  label: string;
  description: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: "/",
    label: "Jobs",
    description: "Search direct ATS postings.",
  },
  {
    href: "/tracker",
    label: "Tracker",
    description: "Saved and applied workflow.",
  },
  {
    href: "/sources",
    label: "Sources",
    description: "Registry health and verification.",
  },
  {
    href: "/settings",
    label: "Settings",
    description: "Single-user defaults and preferences.",
  },
];

export function ActiveNav() {
  return (
    <nav
      aria-label="Jobs platform sections"
      className="flex flex-wrap items-center gap-3"
      role="navigation"
    >
      {NAV_ITEMS.map((item) => {
        return (
          <NavLink
            key={item.href}
            className={({ isActive }) =>
              cn(
                buttonVariants({
                  size: "sm",
                  variant: isActive ? "default" : "secondary",
                }),
                "rounded-full"
              )
            }
            to={item.href}
            title={item.description}
          >
            {item.label}
          </NavLink>
        );
      })}
    </nav>
  );
}
