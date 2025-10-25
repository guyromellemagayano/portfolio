import React from "react";

import Link from "next/link";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Footer, Header } from "@web/components";
import { cn } from "@web/utils";

import {
  AboutPageLayout,
  ArticleLayout,
  HomePageLayout,
  ProjectsPageLayout,
  SimpleLayout,
} from "./_internal";
import { COMMON_LAYOUT_COMPONENT_LABELS } from "./Layout.data";

// ============================================================================
// LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface LayoutProps
  extends React.ComponentPropsWithRef<"div">,
    CommonComponentProps {}
export type LayoutComponent = React.FC<LayoutProps>;

// ============================================================================
// BASE LAYOUT COMPONENT
// ============================================================================

const BaseLayout: LayoutComponent = setDisplayName(function BaseLayout(props) {
  const {
    as: Component = "div",
    children,
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
      className={cn("flex w-full", className)}
      {...createComponentProps(componentId, "layout", isDebugMode)}
    >
      <div
        className="fixed inset-0 flex justify-center sm:px-8"
        {...createComponentProps(
          componentId,
          "layout-background-wrapper",
          isDebugMode
        )}
      >
        <Link
          href={`#${componentId}-layout-main`}
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-white dark:focus:bg-zinc-100 dark:focus:text-zinc-900"
          aria-label={COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
          {...createComponentProps(componentId, "link", isDebugMode)}
        >
          {COMMON_LAYOUT_COMPONENT_LABELS.skipToMainContent}
        </Link>
        <div
          className="flex w-full max-w-7xl lg:px-8"
          {...createComponentProps(
            componentId,
            "layout-background-wrapper",
            isDebugMode
          )}
        >
          <div
            className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20"
            {...createComponentProps(
              componentId,
              "layout-background-content",
              isDebugMode
            )}
          />
        </div>
      </div>
      <div
        className="relative flex w-full flex-col"
        {...createComponentProps(
          componentId,
          "layout-content-wrapper",
          isDebugMode
        )}
      >
        <Header role="banner" debugId={componentId} debugMode={isDebugMode} />
        <main
          role="main"
          className="flex-auto"
          {...createComponentProps(
            componentId,
            "layout-main-root",
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

  return element;
});

// ============================================================================
// MEMOIZED LAYOUT COMPONENT
// ============================================================================

const MemoizedBaseLayout = React.memo(BaseLayout);

// ============================================================================
// MAIN LAYOUT COMPONENT
// ============================================================================

export const Layout = setDisplayName(function Layout(props) {
  const { children, isMemoized = false, ...rest } = props;

  const Component = isMemoized ? MemoizedBaseLayout : BaseLayout;
  const element = <Component {...rest}>{children}</Component>;
  return element;
} as LayoutCompoundComponent);

// ============================================================================
// LAYOUT COMPOUND COMPONENTS
// ============================================================================

type LayoutCompoundComponent = React.FC<LayoutProps> & {
  /** A article layout component that provides a consistent layout for the article page. */
  Article: typeof ArticleLayout;
  /** A simple layout component that provides a consistent layout for page content. */
  Simple: typeof SimpleLayout;
  /** A about page layout component that provides a consistent layout for the about page. */
  AboutPage: typeof AboutPageLayout;
  /** A home page layout component that provides a consistent layout for the home page. */
  HomePage: typeof HomePageLayout;
  /** A projects page layout component that provides a consistent layout for the projects page. */
  ProjectsPage: typeof ProjectsPageLayout;
};

Layout.Article = ArticleLayout;
Layout.Simple = SimpleLayout;
Layout.AboutPage = AboutPageLayout;
Layout.HomePage = HomePageLayout;
Layout.ProjectsPage = ProjectsPageLayout;
