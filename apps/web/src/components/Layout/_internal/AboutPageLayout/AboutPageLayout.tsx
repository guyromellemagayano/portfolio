import React from "react";

import Image from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Container, Link, List, ListItem } from "@web/components";
import portraitImage from "@web/images/portrait.jpg";
import { cn } from "@web/utils";

import { SOCIAL_LIST_COMPONENT_LABELS } from "../../Layout.data";

// ============================================================================
// ABOUT PAGE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface AboutPageLayoutProps
  extends React.ComponentPropsWithRef<typeof Container>,
    CommonComponentProps {}
export type AboutPageLayoutComponent = React.FC<AboutPageLayoutProps>;

// ============================================================================
// BASE ABOUT PAGE LAYOUT COMPONENT
// ============================================================================

const BaseAboutPageLayout: AboutPageLayoutComponent = setDisplayName(
  function BaseAboutPageLayout(props) {
    const {
      as: Component = Container,
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
        className={cn("mt-16 sm:mt-32", className)}
        debugId={componentId}
        debugMode={isDebugMode}
      >
        <div
          className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12"
          {...createComponentProps(
            componentId,
            "about-page-layout-content",
            isDebugMode
          )}
        >
          <div
            className="lg:pl-20"
            {...createComponentProps(
              componentId,
              "about-page-layout-content-image",
              isDebugMode
            )}
          >
            <div
              className="max-w-xs px-2.5 lg:max-w-none"
              {...createComponentProps(
                componentId,
                "about-page-layout-content-image-container",
                isDebugMode
              )}
            >
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div
            className="lg:order-first lg:row-span-2"
            {...createComponentProps(
              componentId,
              "about-page-layout-content-text",
              isDebugMode
            )}
          >
            <h1
              className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              {...createComponentProps(
                componentId,
                "about-page-layout-content-text-heading",
                isDebugMode
              )}
            >
              I’m Spencer Sharp. I live in New York City, where I design the
              future.
            </h1>
            <div
              className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400"
              {...createComponentProps(
                componentId,
                "about-page-layout-content-text-paragraphs",
                isDebugMode
              )}
            >
              <p
                {...createComponentProps(
                  componentId,
                  "about-page-layout-content-text-paragraph",
                  isDebugMode
                )}
              >
                I’ve loved making things for as long as I can remember, and
                wrote my first program when I was 6 years old, just two weeks
                after my mom brought home the brand new Macintosh LC 550 that I
                taught myself to type on.
              </p>
              <p
                {...createComponentProps(
                  componentId,
                  "about-page-layout-content-text-paragraph",
                  isDebugMode
                )}
              >
                The only thing I loved more than computers as a kid was space.
                When I was 8, I climbed the 40-foot oak tree at the back of our
                yard while wearing my older sister’s motorcycle helmet, counted
                down from three, and jumped — hoping the tree was tall enough
                that with just a bit of momentum I’d be able to get to orbit.
              </p>
              <p
                {...createComponentProps(
                  componentId,
                  "about-page-layout-content-text-paragraph",
                  isDebugMode
                )}
              >
                I spent the next few summers indoors working on a rocket design,
                while I recovered from the multiple surgeries it took to fix my
                badly broken legs. It took nine iterations, but when I was 15 I
                sent my dad’s Blackberry into orbit and was able to transmit a
                photo back down to our family computer from space.
              </p>
              <p
                {...createComponentProps(
                  componentId,
                  "about-page-layout-content-text-paragraph",
                  isDebugMode
                )}
              >
                Today, I’m the founder of Planetaria, where we’re working on
                civilian space suits and manned shuttle kits you can assemble at
                home so that the next generation of kids really <em>can</em>{" "}
                make it to orbit — from the comfort of their own backyards.
              </p>
            </div>
          </div>
          <div
            className="lg:pl-20"
            {...createComponentProps(
              componentId,
              "about-page-layout-content-social-links",
              isDebugMode
            )}
          >
            {SOCIAL_LIST_COMPONENT_LABELS ? (
              <List
                variant="social"
                debugId={componentId}
                debugMode={isDebugMode}
              >
                {SOCIAL_LIST_COMPONENT_LABELS.map(
                  ({ slug, ...rest }, index) => (
                    <ListItem
                      variant="social"
                      key={`${slug}-${index}`}
                      className={cn(
                        "flex",
                        slug === "instagram" && "mt-4",
                        slug === "github" && "mt-4",
                        slug === "linkedin" && "mt-4",
                        slug === "email" &&
                          "mt-8 flex border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                      )}
                    >
                      <Link
                        {...rest}
                        variant="social"
                        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                        debugId={componentId}
                        debugMode={isDebugMode}
                        hasLabel
                        {...(slug === "email" && { page: "about" })}
                      />
                    </ListItem>
                  )
                )}
              </List>
            ) : null}
          </div>
        </div>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED ABOUT PAGE LAYOUT COMPONENT
// ============================================================================

const MemoizedAboutPageLayout = React.memo(BaseAboutPageLayout);

// ============================================================================
// MAIN HOME PAGE LAYOUT COMPONENT
// ============================================================================

export const AboutPageLayout: AboutPageLayoutComponent = setDisplayName(
  function AboutPageLayout(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedAboutPageLayout
      : BaseAboutPageLayout;
    const element = <Component {...rest} />;
    return element;
  }
);
