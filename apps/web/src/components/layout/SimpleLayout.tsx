/**
 * @file apps/web/src/components/layout/SimpleLayout.tsx
 * @author Guy Romelle Magayano
 * @description Renders a simple, consistent page layout with optional subheading, title, and intro, primarily used for brochure-style routes.
 */

import { Container } from "@web/components/container";
import { type LayoutProps } from "@web/components/layout/Layout";
import { type CommonLayoutComponentData } from "@web/data/page";
import { cn } from "@web/utils/helpers";

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
      {...(rest as React.ComponentPropsWithoutRef<SimpleLayoutElementType>)}
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
