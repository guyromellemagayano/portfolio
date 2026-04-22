/**
 * @file apps/web/src/components/layout/Layout.tsx
 * @author Guy Romelle Magayano
 * @description Server-safe layout shell and simple layout components.
 */

import {
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

import { SVGBg } from "@web/components/bg";
import { SkipToMainContentButton } from "@web/components/button";
import { Container } from "@web/components/container";
import { Footer, type FooterProps } from "@web/components/footer";
import { Header, type HeaderProps } from "@web/components/header";
import { Heading, Lead, SubHeading } from "@web/components/text";
import { type CommonLayoutComponentData } from "@web/data/page";
import { cn } from "@web/utils/helpers";

// ============================================================================
// LAYOUT COMPONENT
// ============================================================================

export type LayoutElementType = "div" | "section";
export type LayoutProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<LayoutElementType>,
  "as"
> &
  P & {
    as?: LayoutElementType;
    headerProps?: Pick<
      HeaderProps,
      "navLinks" | "avatarHref" | "avatarAlt" | "avatarSrc"
    >;
    footerProps?: Pick<FooterProps, "navLinks" | "legalText">;
  };

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

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<LayoutElementType>)}
      className={cn("flex w-full", className)}
    >
      <SkipToMainContentButton href="#main" />
      <SVGBg />
      <div className="relative flex w-full flex-col">
        <Header {...headerProps} role="banner" />
        <main id="main" role="main" tabIndex={-1}>
          {children}
        </main>
        <Footer {...footerProps} role="contentinfo" />
      </div>
    </Component>
  );
}

Layout.displayName = "Layout";

// ============================================================================
// SIMPLE LAYOUT COMPONENT
// ============================================================================

export type SimpleLayoutElementType = typeof Container;
export type SimpleLayoutProps<P extends Record<string, unknown> = {}> = Omit<
  LayoutProps<P>,
  "as"
> &
  P &
  CommonLayoutComponentData & {
    as?: SimpleLayoutElementType;
  };

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
    subheading && subheading.trim() !== "" && subheading.length > 0;
  const hasTitle = title && title.trim() !== "" && title.length > 0;
  const hasIntro = intro && intro.trim() !== "" && intro.length > 0;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<SimpleLayoutElementType>)}
      className={cn(className)}
    >
      <section className="max-w-3xl">
        {hasSubheading ? <SubHeading>{subheading}</SubHeading> : null}
        {hasTitle ? (
          <Heading className="mt-2 text-4xl font-bold tracking-tight text-pretty text-zinc-950 sm:text-5xl dark:text-white">
            {title}
          </Heading>
        ) : null}
        {hasIntro ? <Lead className="my-6">{intro}</Lead> : null}
      </section>

      {children}
    </Component>
  );
}

SimpleLayout.displayName = "SimpleLayout";
