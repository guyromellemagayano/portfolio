/**
 * @file apps/web/src/components/layout/Layout.tsx
 * @author Guy Romelle Magayano
 * @description Shared portfolio shell and simple page layout components for the web app.
 */

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type ReactNode,
} from "react";

import { SkipToMainContentButton } from "@web/components/button";
import { Container } from "@web/components/container";
import { Link } from "@web/components/link";
import { type CommonLayoutComponentData } from "@web/data/page";
import { cn } from "@web/utils/helpers";

type InternalHref = string;

export type LayoutNavLink = Readonly<{
  href: InternalHref;
  label: string;
}>;

export type LayoutSocialLink = Readonly<{
  href: string;
  label: string;
}>;

export type LayoutElementType = "div" | "section";
export type LayoutProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<LayoutElementType>,
  "as"
> &
  P & {
    as?: LayoutElementType;
    headerProps?: {
      avatarAlt?: string;
      avatarHref?: string;
      avatarSrc?: string;
      brandName?: string;
      navLinks?: ReadonlyArray<LayoutNavLink>;
    };
    footerProps?: {
      legalText?: string;
      navLinks?: ReadonlyArray<LayoutNavLink>;
      socialLinks?: ReadonlyArray<LayoutSocialLink>;
    };
  };

/** Returns a compact brand mark label for the shell logo chip. */
function getBrandMarkLabel(brandName?: string): string {
  if (!brandName) {
    return "GM";
  }

  const initials = brandName
    .split(/\s+/)
    .filter((segment) => segment.length > 0)
    .slice(0, 2)
    .map((segment) => segment[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "GM";
}

/** Renders a primary shell CTA link with Radiant-inspired pill styling. */
function ShellActionLink(props: {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  const { children, href, variant = "secondary" } = props;

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition",
        variant === "primary"
          ? "bg-zinc-950 text-white hover:bg-zinc-800"
          : "border border-zinc-900/10 bg-white/80 text-zinc-900 hover:border-zinc-900/30 hover:bg-white"
      )}
    >
      {children}
    </Link>
  );
}

/** Renders the app shell with a lighter, template-driven portfolio frame. */
export function Layout<P extends Record<string, unknown> = {}>(
  props: LayoutProps<P>
) {
  const {
    as: Component = "div",
    children,
    className,
    headerProps,
    footerProps,
    ...rest
  } = props;

  if (children == null || children === false || children === "") return null;

  const headerNavLinks = headerProps?.navLinks ?? [];
  const footerNavLinks = footerProps?.navLinks ?? [];
  const footerSocialLinks = footerProps?.socialLinks ?? [];
  const brandName = headerProps?.brandName ?? "Guy Romelle";
  const brandMarkLabel = getBrandMarkLabel(brandName);

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<LayoutElementType>)}
      className={cn("min-h-screen bg-stone-50 text-zinc-950", className)}
    >
      <SkipToMainContentButton href="#main" />
      <div className="relative flex min-h-screen flex-col">
        <header
          className="border-b border-zinc-950/10 bg-stone-50/95 backdrop-blur"
          role="banner"
        >
          <Container as="nav" aria-label="Primary navigation" className="py-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <Link
                  aria-label={headerProps?.avatarAlt ?? `${brandName} home`}
                  href={headerProps?.avatarHref || "/"}
                  className="inline-flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-950/10 bg-white text-sm font-semibold tracking-[0.16em] text-zinc-950">
                    {brandMarkLabel}
                  </span>
                  <span className="hidden text-sm font-medium text-zinc-700 sm:inline">
                    {brandName}
                  </span>
                </Link>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div className="flex flex-wrap items-center gap-2">
                  {headerNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-full px-3 py-2 text-sm text-zinc-600 transition hover:bg-white hover:text-zinc-950"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <ShellActionLink href="/hire" variant="primary">
                  Start a project
                </ShellActionLink>
              </div>
            </div>
          </Container>
        </header>

        <main id="main" role="main" tabIndex={-1} className="flex-1 pb-20">
          {children}
        </main>

        <footer
          className="border-t border-zinc-950/10 bg-white/80"
          role="contentinfo"
        >
          <Container className="py-16">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <section
                aria-labelledby="portfolio-footer-cta"
                className="max-w-2xl"
              >
                <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
                  Build cleanly
                </p>
                <h2
                  id="portfolio-footer-cta"
                  className="mt-4 text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
                >
                  Clear system boundaries, stronger product surfaces, fewer
                  expensive detours.
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
                  I help teams sharpen architecture, simplify frontends, and
                  deliver product work that still makes sense six months later.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ShellActionLink href="/book" variant="primary">
                    Choose a starting path
                  </ShellActionLink>
                  <ShellActionLink href="/services">
                    Explore services
                  </ShellActionLink>
                </div>
              </section>

              <div className="grid gap-10 sm:grid-cols-2">
                <section aria-labelledby="portfolio-footer-nav">
                  <h2
                    id="portfolio-footer-nav"
                    className="text-sm font-semibold text-zinc-950"
                  >
                    Navigation
                  </h2>
                  <ul className="mt-4 space-y-3" role="list">
                    {footerNavLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-zinc-600 transition hover:text-zinc-950"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="portfolio-footer-social">
                  <h2
                    id="portfolio-footer-social"
                    className="text-sm font-semibold text-zinc-950"
                  >
                    Contact
                  </h2>
                  <ul className="mt-4 space-y-3" role="list">
                    {footerSocialLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          rel={
                            link.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          target={
                            link.href.startsWith("http") ? "_blank" : undefined
                          }
                          className="text-sm text-zinc-600 transition hover:text-zinc-950"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>

            <div className="mt-12 border-t border-zinc-950/10 pt-6 text-sm text-zinc-500">
              {footerProps?.legalText || `Built and written by ${brandName}.`}
            </div>
          </Container>
        </footer>
      </div>
    </Component>
  );
}

Layout.displayName = "Layout";

export type SimpleLayoutElementType = typeof Container;
export type SimpleLayoutProps<P extends Record<string, unknown> = {}> = Omit<
  LayoutProps<P>,
  "as"
> &
  P &
  CommonLayoutComponentData & {
    as?: SimpleLayoutElementType;
  };

/** Renders consistent page headings and intro copy for brochure routes. */
export function SimpleLayout<P extends Record<string, unknown> = {}>(
  props: SimpleLayoutProps<P>
) {
  const {
    as: Component = Container,
    subheading,
    title,
    intro,
    children,
    className,
    ...rest
  } = props;

  const hasSubheading =
    typeof subheading === "string" && subheading.trim().length > 0;
  const hasTitle = typeof title === "string" && title.trim().length > 0;
  const hasIntro = typeof intro === "string" && intro.trim().length > 0;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SimpleLayoutElementType>)}
      className={cn("pt-16 sm:pt-24", className)}
    >
      <section className="border-b border-zinc-950/10 pb-10 sm:pb-14">
        {hasSubheading ? (
          <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
            {subheading}
          </p>
        ) : null}
        {hasTitle ? (
          <h1 className="mt-4 max-w-4xl text-4xl font-medium tracking-tight text-zinc-950 sm:text-6xl">
            {title}
          </h1>
        ) : null}
        {hasIntro ? (
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl">
            {intro}
          </p>
        ) : null}
      </section>

      {children}
    </Component>
  );
}

SimpleLayout.displayName = "SimpleLayout";
