/**
 * @file apps/jobs/src/components/ActiveNav.tsx
 * @author Guy Romelle Magayano
 * @description Client-side primary navigation with active route styling.
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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

/** Renders the jobs app navigation using Next.js client-side links. */
export function ActiveNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Jobs platform sections"
      className="flex flex-wrap items-center gap-3"
      role="navigation"
    >
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              isActive
                ? "border-zinc-900 bg-zinc-900 text-zinc-50"
                : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-950"
            }`}
            href={item.href}
            prefetch={false}
            title={item.description}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
