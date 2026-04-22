/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/projects/page.tsx
 * @author Guy Romelle Magayano
 * @description Projects page rendered from direct local portfolio content.
 */

import type { Metadata } from "next";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";
import { SimpleLayout } from "@web/components/layout";

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
      className="pb-16"
      subheading={page.subheading}
      title="One platform story, several product surfaces."
      intro={page.intro}
    >
      <section
        aria-labelledby="projects-showcase-heading"
        className="py-12"
        role="region"
      >
        <h2
          id="projects-showcase-heading"
          className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
        >
          Monorepo product surfaces
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {showcaseApps.map((app) => (
            <article
              key={app.id}
              id={app.anchor}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <p className="text-xs font-semibold tracking-[0.24em] text-zinc-500 uppercase">
                {app.path}
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-zinc-950">
                {app.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {app.summary}
              </p>
              <ul
                aria-label={`${app.name} proof points`}
                className="mt-5 space-y-2 text-sm leading-6 text-zinc-600"
                role="list"
              >
                {app.proofPoints.map((proofPoint) => (
                  <li key={proofPoint}>{proofPoint}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="projects-catalog-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <h2
          id="projects-catalog-heading"
          className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
        >
          Broader project catalog
        </h2>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <h3 className="text-xl font-medium tracking-tight text-zinc-950">
                {project.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {project.description || project.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2" role="list">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-950/10 px-3 py-2 text-xs text-zinc-600"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                {project.website ? (
                  <a
                    href={project.website.href}
                    rel={project.website.rel}
                    target={project.website.target}
                    className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
                  >
                    {project.website.label}
                  </a>
                ) : null}
                {project.repository ? (
                  <a
                    href={project.repository.href}
                    rel={project.repository.rel}
                    target={project.repository.target}
                    className="font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
                  >
                    {project.repository.label}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
