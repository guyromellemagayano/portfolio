import React from "react";

import Image from "next/image";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import { setDisplayName } from "@guyromellemagayano/utils";

import { Card, Container, Icon, Layout } from "@web/components";

import { PROJECTS_COMPONENT_DATA } from "../../Layout.data";

// ============================================================================
// PROJECTS PAGE LAYOUT COMPONENT TYPES & INTERFACES
// ============================================================================

export interface ProjectsPageLayoutProps
  extends React.ComponentPropsWithRef<typeof Container>,
    CommonComponentProps {}
export type ProjectsPageLayoutComponent = React.FC<ProjectsPageLayoutProps>;

// ============================================================================
// BASE PROJECTS PAGE LAYOUT COMPONENT
// ============================================================================

const BaseProjectsPageLayout: ProjectsPageLayoutComponent = setDisplayName(
  function BaseProjectsPageLayout(props) {
    const {
      as: Component = Layout.Simple,
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
        title="Things I’ve made trying to put my dent in the universe."
        intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
        debugId={componentId}
        debugMode={isDebugMode}
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROJECTS_COMPONENT_DATA.map((project) => (
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
                <Icon name="Link" className="h-6 w-6 flex-none" />
                <span className="ml-2">{project.link.label}</span>
              </p>
            </Card>
          ))}
        </ul>
      </Component>
    );

    return element;
  }
);

// ============================================================================
// MEMOIZED PROJECTS PAGE LAYOUT COMPONENT
// ============================================================================

const MemoizedProjectsPageLayout = React.memo(BaseProjectsPageLayout);

// ============================================================================
// MAIN PROJECTS PAGE LAYOUT COMPONENT
// ============================================================================

export const ProjectsPageLayout: ProjectsPageLayoutComponent = setDisplayName(
  function ProjectsPageLayout(props) {
    const { isMemoized = false, ...rest } = props;

    const Component = isMemoized
      ? MemoizedProjectsPageLayout
      : BaseProjectsPageLayout;
    const element = <Component {...rest} />;
    return element;
  }
);
