import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  Container,
  Icon,
  Link,
  NewsletterForm,
  PhotoGallery,
  Resume,
} from "@web/components";

// ============================================================================
// HOME LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HomeLayoutProps
  extends React.ComponentPropsWithRef<typeof React.Fragment>,
    CommonComponentProps {}
export type HomeLayoutComponent = React.FC<HomeLayoutProps>;

// ============================================================================
// BASE HOME PAGE COMPONENT
// ============================================================================

const BaseHomeLayout: HomeLayoutComponent = setDisplayName(
  function BaseHomeLayout(props) {
    const {
      as: Component = React.Fragment,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component {...rest}>
        <Container
          className="mt-9"
          debugId={componentId}
          debugMode={isDebugMode}
        >
          <div
            className="max-w-2xl"
            {...createComponentProps(
              componentId,
              "container-content",
              isDebugMode
            )}
          >
            <h1
              className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              {...createComponentProps(componentId, "heading", isDebugMode)}
            >
              Software designer, founder, and amateur astronaut.
            </h1>
            <p
              className="mt-6 text-base text-zinc-600 dark:text-zinc-400"
              {...createComponentProps(componentId, "paragraph", isDebugMode)}
            >
              I’m Spencer, a software designer and entrepreneur based in New
              York City. I’m the founder and CEO of Planetaria, where we develop
              technologies that empower regular people to explore space on their
              own terms.
            </p>
            <div
              className="mt-6 flex space-x-4"
              {...createComponentProps(componentId, "link-list", isDebugMode)}
            >
              <Link.Social
                isMemoized
                href="#"
                aria-label="Follow on X"
                icon={Icon.X}
                debugId={componentId}
                debugMode={isDebugMode}
              />
              <Link.Social
                isMemoized
                href="#"
                aria-label="Follow on Instagram"
                icon={Icon.Instagram}
                debugId={componentId}
                debugMode={isDebugMode}
              />
              <Link.Social
                isMemoized
                href="#"
                aria-label="Follow on GitHub"
                icon={Icon.GitHub}
                debugId={componentId}
                debugMode={isDebugMode}
              />
              <Link.Social
                isMemoized
                href="#"
                aria-label="Follow on LinkedIn"
                icon={Icon.LinkedIn}
                debugId={componentId}
                debugMode={isDebugMode}
              />
            </div>
          </div>
        </Container>
        <PhotoGallery
          isMemoized
          debugId={componentId}
          debugMode={isDebugMode}
        />
        <Container
          className="mt-24 md:mt-28"
          debugId={componentId}
          debugMode={isDebugMode}
        >
          <div
            className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2"
            {...createComponentProps(componentId, "content-grid", isDebugMode)}
          >
            <div
              className="flex flex-col gap-16"
              {...createComponentProps(
                componentId,
                "content-grid-left",
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
                "content-grid-right",
                isDebugMode
              )}
            >
              <NewsletterForm
                isMemoized
                debugId={componentId}
                debugMode={isDebugMode}
              />
              <Resume
                isMemoized
                debugId={componentId}
                debugMode={isDebugMode}
              />
            </div>
          </div>
        </Container>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HOME PAGE COMPONENT
// ============================================================================

const MemoizedBaseHomeLayout = React.memo(BaseHomeLayout);

// ============================================================================
// MAIN HOME PAGE COMPONENT
// ============================================================================

export const HomeLayout: HomeLayoutComponent = setDisplayName(
  function HomeLayout(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedBaseHomeLayout : BaseHomeLayout;
    const element = <Component {...rest} />;
    return element;
  }
);
