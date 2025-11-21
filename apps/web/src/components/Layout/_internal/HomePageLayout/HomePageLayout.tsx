import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import {
  Container,
  Link,
  List,
  ListItem,
  NewsletterForm,
  PhotoGallery,
  Resume,
} from "@web/components";

import { SOCIAL_LIST_COMPONENT_LABELS } from "../../Layout.data";

// ============================================================================
// HOME LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface HomePageLayoutProps
  extends React.ComponentPropsWithRef<typeof React.Fragment>,
    CommonComponentProps {}
export type HomePageLayoutComponent = React.FC<HomePageLayoutProps>;

// ============================================================================
// BASE HOME PAGE LAYOUT COMPONENT
// ============================================================================

const BaseHomePageLayout: HomePageLayoutComponent = setDisplayName(
  function BaseHomePageLayout(props) {
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

            {SOCIAL_LIST_COMPONENT_LABELS ? (
              <List variant="social" className="mt-6 flex gap-6">
                {SOCIAL_LIST_COMPONENT_LABELS.filter(
                  ({ slug }) => slug !== "email"
                ).map(({ slug, ...rest }, index) => (
                  <ListItem
                    key={`${slug}-${index}`}
                    variant="social"
                    className="group -m-1 p-1"
                  >
                    <Link variant="social" {...rest} />
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
              <NewsletterForm />
              <Resume />
            </div>
          </div>
        </Container>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED HOME PAGE LAYOUT COMPONENT
// ============================================================================

const MemoizedHomePageLayout = React.memo(BaseHomePageLayout);

// ============================================================================
// MAIN HOME PAGE LAYOUT COMPONENT
// ============================================================================

export const HomePageLayout: HomePageLayoutComponent = setDisplayName(
  function HomePageLayout(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedHomePageLayout : BaseHomePageLayout;
    const element = <Component {...rest} />;
    return element;
  }
);
