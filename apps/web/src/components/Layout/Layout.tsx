import React from "react";

import Image from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  formatDateSafely,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  Button,
  Card,
  Container,
  Footer,
  Form,
  Header,
  Icon,
  Link,
  List,
  ListItem,
  PhotoGallery,
  Prose,
  Resume,
} from "@web/components";
import portraitImage from "@web/images/portrait.jpg";
import { type ArticleWithSlug, cn } from "@web/utils";

import {
  COMMON_LAYOUT_COMPONENT_LABELS,
  PROJECTS_PAGE_LAYOUT_DATA,
  SOCIAL_LIST_COMPONENT_LABELS,
} from "./Layout.data";
import { LAYOUT_I18N } from "./Layout.i18n";

// ============================================================================
// LAYOUT COMPONENT
// ============================================================================

type LayoutElementType = "div";
type LayoutVariant =
  | "default"
  | "article"
  | "simple"
  | "home-page"
  | "projects-page"
  | "about-page";

export type LayoutProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "div" is allowed */
    as?: T;
    /** The variant of the layout */
    variant?: LayoutVariant;
    /** The article to display. */
    article?: ArticleWithSlug;
  };

export const Layout = setDisplayName(function Layout<
  T extends LayoutElementType,
>(props: LayoutProps<T>) {
  const {
    as: Component = "div",
    variant = "default",
    children,
    className,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Layout component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  // Define a mapping of variants to components
  const variantComponentMap: Record<LayoutVariant, React.ElementType> = {
    default: Component,
    article: ArticleLayout,
    simple: SimpleLayout,
    "about-page": AboutPageLayout,
    "home-page": HomePageLayout,
    "projects-page": ProjectsPageLayout,
  };

  // Choose the component based on a variant
  const VariantComponent = variantComponentMap[variant] || Component;

  // For the default variant, use a string element directly
  // Respect the `as` prop if provided, otherwise use "div" from a variant map
  if (variant === "default") {
    return (
      <Component
        {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
        className={cn("flex w-full", className)}
        {...createComponentProps(componentId, `layout-${variant}`, isDebugMode)}
      >
        <div
          className="fixed inset-0 flex justify-center sm:px-8"
          {...createComponentProps(
            componentId,
            `layout-${variant}-background-wrapper`,
            isDebugMode
          )}
        >
          <Link
            href={`#${componentId}-layout-main`}
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
            aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
            {...createComponentProps(
              componentId,
              `layout-${variant}-link`,
              isDebugMode
            )}
          >
            {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
          </Link>
          <div
            className="flex w-full max-w-7xl lg:px-8"
            {...createComponentProps(
              componentId,
              `layout-${variant}-background-wrapper`,
              isDebugMode
            )}
          >
            <div
              className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
              {...createComponentProps(
                componentId,
                `layout-${variant}-background-content`,
                isDebugMode
              )}
            />
          </div>
        </div>
        <div
          className="relative flex w-full flex-col"
          {...createComponentProps(
            componentId,
            `layout-${variant}-content-wrapper`,
            isDebugMode
          )}
        >
          <Header role="banner" debugId={componentId} debugMode={isDebugMode} />
          <main
            role="main"
            className="flex-auto"
            {...createComponentProps(
              componentId,
              `layout-${variant}-main-root`,
              isDebugMode
            )}
          >
            {children}
          </main>
          <Footer
            role="contentinfo"
            debugId={componentId}
            debugMode={isDebugMode}
          />
        </div>
      </Component>
    );
  }

  const variantProps = {
    ...rest,
    as: Component,
    variant,
    debugId,
    debugMode,
  };

  return <VariantComponent {...variantProps}>{children}</VariantComponent>;
});

// ============================================================================
// MEMOIZED LAYOUT COMPONENT
// ============================================================================

export const MemoizedLayout = React.memo(Layout);

// ============================================================================
// ABOUT PAGE LAYOUT COMPONENT
// ============================================================================

const AboutPageLayout = setDisplayName(function AboutPageLayout(
  props: LayoutProps<LayoutElementType>
) {
  const {
    as: Component = Container,
    variant,
    className,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Layout component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      className={cn("mt-16 sm:mt-32", className)}
      debugId={componentId}
      debugMode={isDebugMode}
    >
      <div
        className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12"
        {...createComponentProps(
          componentId,
          `about-page-layout-${variant}-content`,
          isDebugMode
        )}
      >
        <div
          className="lg:pl-20"
          {...createComponentProps(
            componentId,
            `about-page-layout-${variant}-content-image`,
            isDebugMode
          )}
        >
          <div
            className="max-w-xs px-2.5 lg:max-w-none"
            {...createComponentProps(
              componentId,
              `about-page-layout-${variant}-content-image-container`,
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
            `about-page-layout-${variant}-content-text`,
            isDebugMode
          )}
        >
          <h1
            className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            {...createComponentProps(
              componentId,
              `about-page-layout-${variant}-content-text-heading`,
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
              `about-page-layout-${variant}-content-text-paragraphs`,
              isDebugMode
            )}
          >
            <p
              {...createComponentProps(
                componentId,
                `about-page-layout-${variant}-content-text-paragraph`,
                isDebugMode
              )}
            >
              I’ve loved making things for as long as I can remember, and wrote
              my first program when I was 6 years old, just two weeks after my
              mom brought home the brand new Macintosh LC 550 that I taught
              myself to type on.
            </p>
            <p
              {...createComponentProps(
                componentId,
                `about-page-layout-${variant}-content-text-paragraph`,
                isDebugMode
              )}
            >
              The only thing I loved more than computers as a kid was space.
              When I was 8, I climbed the 40-foot oak tree at the back of our
              yard while wearing my older sister’s motorcycle helmet, counted
              down from three, and jumped — hoping the tree was tall enough that
              with just a bit of momentum I’d be able to get to orbit.
            </p>
            <p
              {...createComponentProps(
                componentId,
                `about-page-layout-${variant}-content-text-paragraph`,
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
                `about-page-layout-${variant}-content-text-paragraph`,
                isDebugMode
              )}
            >
              Today, I’m the founder of Planetaria, where we’re working on
              civilian space suits and manned shuttle kits you can assemble at
              home so that the next generation of kids really <em>can</em> make
              it to orbit — from the comfort of their own backyards.
            </p>
          </div>
        </div>
        <div
          className="lg:pl-20"
          {...createComponentProps(
            componentId,
            `about-page-layout-${variant}-content-social-links`,
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
                ({ href, icon, ...rest }, index) => (
                  <ListItem
                    variant="social"
                    key={`${href}-${index}`}
                    className={cn(
                      "flex",
                      icon === "instagram" && "mt-4",
                      icon === "github" && "mt-4",
                      icon === "linkedin" && "mt-4",
                      icon === "mail" &&
                        "mt-8 flex border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                    )}
                  >
                    <Link
                      href={href}
                      {...rest}
                      variant="social"
                      className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
                      debugId={componentId}
                      debugMode={isDebugMode}
                      hasLabel
                      {...(icon === "mail" && { page: "about" })}
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
});

// ============================================================================
// ARTICLE PAGE LAYOUT COMPONENT
// ============================================================================

const ArticleLayout = setDisplayName(function ArticleLayout(
  props: LayoutProps<LayoutElementType>
) {
  const {
    as: Component = Container,
    variant,
    article,
    className,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Layout component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!article || !children) return null;

  const articleData = {
    title: article.title.trim(),
    date: article.date.trim(),
  };

  if (articleData.title.length === 0 && articleData.date.length === 0)
    return null;

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role="main"
      className={cn("mt-16 lg:mt-32", className)}
      debugId={debugId}
      debugMode={debugMode}
      aria-label={LAYOUT_I18N.articleLayout}
      aria-labelledby={`layout-${variant}`}
      {...createComponentProps(componentId, `layout-${variant}`, isDebugMode)}
    >
      <div
        role="region"
        className="xl:relative"
        aria-label={LAYOUT_I18N.articleContent}
        {...createComponentProps(
          componentId,
          `layout-${variant}-wrapper`,
          isDebugMode
        )}
      >
        <div
          role="region"
          className="mx-auto max-w-2xl"
          aria-label={LAYOUT_I18N.articleLayout}
          {...createComponentProps(
            componentId,
            `layout-${variant}-content`,
            isDebugMode
          )}
        >
          <Button
            variant="article-nav"
            debugMode={debugMode}
            debugId={debugId}
          />

          {article ? (
            <article
              role="article"
              aria-labelledby={`${componentId}-article-title`}
              aria-describedby={`${componentId}-article-date`}
              {...createComponentProps(
                componentId,
                `layout-${variant}-article`,
                isDebugMode
              )}
            >
              <header
                role="banner"
                className="flex flex-col"
                aria-label={LAYOUT_I18N.articleHeader}
                {...createComponentProps(
                  componentId,
                  `layout-${variant}-article-header`,
                  isDebugMode
                )}
              >
                <h1
                  id={`${componentId}-article-title`}
                  className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
                  aria-level={1}
                  {...createComponentProps(
                    componentId,
                    `layout-${variant}-article-title`,
                    isDebugMode
                  )}
                >
                  {articleData.title}
                </h1>

                <time
                  id={`${componentId}-article-date`}
                  className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                  dateTime={articleData.date}
                  aria-label={`${LAYOUT_I18N.articleDate} ${formatDateSafely(articleData.date)}`}
                  {...createComponentProps(
                    componentId,
                    `layout-${variant}-article-date`,
                    isDebugMode
                  )}
                >
                  <span
                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                    aria-hidden="true"
                    {...createComponentProps(
                      componentId,
                      `layout-${variant}-date-separator`,
                      isDebugMode
                    )}
                  />
                  <span
                    className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
                    aria-label={LAYOUT_I18N.articlePublished}
                    {...createComponentProps(
                      componentId,
                      `layout-${variant}-date-text`,
                      isDebugMode
                    )}
                  >
                    {formatDateSafely(articleData.date)}
                  </span>
                </time>
              </header>

              <Prose
                role="region"
                className="mx-auto max-w-2xl"
                aria-label={LAYOUT_I18N.articleContent}
                aria-labelledby={
                  articleData.title.length > 0
                    ? `layout-${variant}-prose-title`
                    : undefined
                }
                debugId={componentId}
                debugMode={debugMode}
              >
                {children}
              </Prose>
            </article>
          ) : children ? (
            <Prose
              role="region"
              className="mx-auto max-w-2xl"
              aria-label={LAYOUT_I18N.articleContent}
              debugId={componentId}
              debugMode={debugMode}
            >
              {children}
            </Prose>
          ) : null}
        </div>
      </div>
    </Component>
  );
});

// ============================================================================
// SIMPLE LAYOUT COMPONENT
// ============================================================================

export type SimpleLayoutProps = LayoutProps<LayoutElementType> & {
  /** Page title */
  title: string;
  /** Page introduction */
  intro: string;
};

const SimpleLayout = setDisplayName(function SimpleLayout(
  props: SimpleLayoutProps
) {
  const {
    as: Component = Container,
    variant,
    children,
    className,
    title,
    intro,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Layout component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  return (
    <Component
      {...rest}
      className={cn("mt-16 sm:mt-32", className)}
      {...createComponentProps(componentId, `layout-${variant}`, isDebugMode)}
    >
      <Link
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
        aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        {...createComponentProps(
          componentId,
          `layout-${variant}-link`,
          isDebugMode
        )}
      >
        {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
      </Link>

      <header className="max-w-2xl">
        {title && title.trim() !== "" && title.length > 0 ? (
          <h1
            className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            {...createComponentProps(
              componentId,
              "simple-layout-title",
              isDebugMode
            )}
          >
            {title}
          </h1>
        ) : null}

        {intro && intro.trim() !== "" && intro.length > 0 ? (
          <p
            className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
            {...createComponentProps(
              componentId,
              "simple-layout-intro",
              isDebugMode
            )}
          >
            {intro}
          </p>
        ) : null}
      </header>

      {children ? (
        <main
          role="main"
          className="mt-16 sm:mt-20"
          {...createComponentProps(
            componentId,
            "simple-layout-content",
            isDebugMode
          )}
        >
          {children}
        </main>
      ) : null}
    </Component>
  );
});

// ============================================================================
// HOME PAGE LAYOUT COMPONENT
// ============================================================================

const HomePageLayout = setDisplayName(function HomePageLayout(
  props: LayoutProps<LayoutElementType>
) {
  const {
    as: Component = "div",
    variant,
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Layout component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  if (!children) return null;

  return (
    <Component
      {...createComponentProps(componentId, `layout-${variant}`, isDebugMode)}
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
    >
      <Container className="mt-9" debugId={componentId} debugMode={isDebugMode}>
        <div
          className="max-w-2xl"
          {...createComponentProps(
            componentId,
            `home-page-layout-${variant}-content`,
            isDebugMode
          )}
        >
          <h1
            className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
            {...createComponentProps(
              componentId,
              `home-page-layout-${variant}-content-heading`,
              isDebugMode
            )}
          >
            Software designer, founder, and amateur astronaut.
          </h1>
          <p
            className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
            {...createComponentProps(
              componentId,
              `home-page-layout-${variant}-content-paragraph`,
              isDebugMode
            )}
          >
            I’m Spencer, a software designer and entrepreneur based in New York
            City. I’m the founder and CEO of Planetaria, where we develop
            technologies that empower regular people to explore space on their
            own terms.
          </p>

          {SOCIAL_LIST_COMPONENT_LABELS ? (
            <List variant="social" className="mt-6 flex gap-6">
              {SOCIAL_LIST_COMPONENT_LABELS.filter(
                ({ icon }) => icon !== "mail"
              ).map((value, index) => (
                <ListItem
                  key={`${value.icon}-${index}`}
                  variant="social"
                  className="group -m-1 p-1"
                >
                  <Link variant="social" {...value} />
                </ListItem>
              ))}
            </List>
          ) : null}
        </div>
      </Container>
      <PhotoGallery />
      <Container className="mt-24 md:mt-28">
        <div
          className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
          {...createComponentProps(
            componentId,
            `home-page-layout-${variant}-content-grid`,
            isDebugMode
          )}
        >
          <div
            className="flex flex-col gap-16"
            {...createComponentProps(
              componentId,
              `home-page-layout-${variant}-content-grid-left`,
              isDebugMode
            )}
          >
            {/* {articles?.map((article) => (
              <ArticleListItem key={article.slug} article={article} />
            ))} */}
          </div>
          <div
            className="space-y-10 lg:pl-16 xl:pl-24"
            {...createComponentProps(
              componentId,
              `home-page-layout-${variant}-content-grid-right`,
              isDebugMode
            )}
          >
            <Form variant="newsletter" />
            <Resume />
          </div>
        </div>
        {children}
      </Container>
    </Component>
  );
});

// ============================================================================
// PROJECTS PAGE LAYOUT COMPONENT
// ============================================================================

export type ProjectsPageLayoutProps = LayoutProps<"div"> &
  Pick<SimpleLayoutProps, "title" | "intro">;

const ProjectsPageLayout = setDisplayName(function ProjectsPageLayout(
  props: ProjectsPageLayoutProps
) {
  const { as: Component = SimpleLayout, debugId, debugMode, ...rest } = props;

  // Layout component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      title={PROJECTS_PAGE_LAYOUT_DATA.title}
      intro={PROJECTS_PAGE_LAYOUT_DATA.intro}
      debugId={componentId}
      debugMode={isDebugMode}
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {PROJECTS_PAGE_LAYOUT_DATA.projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <Icon
                name="link"
                className="h-6 w-6 flex-none"
                debugId={componentId}
                debugMode={isDebugMode}
              />
              <span className="ml-2">{project.link.label}</span>
            </p>
          </Card>
        ))}
      </ul>
    </Component>
  );
});
