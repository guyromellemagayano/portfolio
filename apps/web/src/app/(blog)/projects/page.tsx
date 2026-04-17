/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/projects/page.tsx
 * @author Guy Romelle Magayano
 * @description Static projects page rendered from the canonical portfolio snapshot API.
 */

import type { Metadata } from "next";

import { SimpleLayout } from "@web/components/layout";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("projects");

  return buildPortfolioPageMetadata(page);
}

export default async function ProjectsPage() {
  const { snapshot, page } = await getPortfolioBrochurePage("projects");
  const featuredProjects = snapshot.projects
    .filter((project) => project.status === "published")
    .sort((left, right) => left.order - right.order);
  const showcaseApps = snapshot.showcaseApps
    .filter((app) => app.status === "published")
    .sort((left, right) => left.order - right.order);

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="projects-cards-heading"
        className="mt-12"
        role="region"
      >
        <h2
          id="projects-cards-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Project work
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {project.description || project.summary}
              </p>
              <div
                aria-label={`${project.name} tags`}
                className="mt-4 flex flex-wrap gap-2"
                role="list"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-200 px-3 py-1 text-xs text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                {project.website ? (
                  <a
                    className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                    href={project.website.href}
                    rel={project.website.rel}
                    target={project.website.target}
                  >
                    {project.website.label}
                  </a>
                ) : null}
                {project.repository ? (
                  <a
                    className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                    href={project.repository.href}
                    rel={project.repository.rel}
                    target={project.repository.target}
                  >
                    {project.repository.label}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="projects-systems-heading"
        className="mt-20"
        role="region"
      >
        <h2
          id="projects-systems-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Monorepo product surfaces
        </h2>
        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {showcaseApps.map((app) => (
            <article
              key={app.id}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
              id={app.anchor}
            >
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {app.path}
              </p>
              <h3 className="mt-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {app.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {app.summary}
              </p>
            </article>
          ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
