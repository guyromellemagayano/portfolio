/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/about/page.tsx
 * @author Guy Romelle Magayano
 * @description Static about page rendered from the canonical portfolio snapshot API.
 */

import type { Metadata } from "next";

import { SimpleLayout } from "@web/components/layout";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("about");

  return buildPortfolioPageMetadata(page);
}

export default async function AboutPage() {
  const { snapshot, page } = await getPortfolioBrochurePage("about");
  const workExperience = snapshot.workExperience
    .filter((item) => item.status === "published")
    .sort((left, right) => left.order - right.order);

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="about-profile-heading"
        className="mt-12 rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
        role="region"
      >
        <h2
          id="about-profile-heading"
          className="text-xl font-semibold text-zinc-900 dark:text-zinc-50"
        >
          {snapshot.profile.name}
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {snapshot.profile.role}
        </p>
        {snapshot.profile.location ? (
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            {snapshot.profile.location}
          </p>
        ) : null}
        <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {snapshot.profile.heroIntro}
        </p>
      </section>

      <section
        aria-labelledby="about-experience-heading"
        className="mt-20"
        role="region"
      >
        <h2
          id="about-experience-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Experience timeline
        </h2>
        <div className="mt-8 space-y-6">
          {workExperience.map((entry) => (
            <article
              key={entry.id}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {entry.role}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {entry.company}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {entry.startDate} -{" "}
                  {entry.isCurrentRole ? "Present" : entry.endDate || "Present"}
                </p>
              </div>
              {entry.summary ? (
                <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {entry.summary}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
