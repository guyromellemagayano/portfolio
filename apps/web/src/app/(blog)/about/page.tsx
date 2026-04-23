/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/about/page.tsx
 * @author Guy Romelle Magayano
 * @description About page rendered from direct local portfolio content.
 */

import type { Metadata } from "next";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";
import { SimpleLayout } from "@web/components/layout";

export const dynamic = "force-static";

function formatRoleDate(value?: string): string {
  if (!value) {
    return "Present";
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
  }).format(new Date(value));
}

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
      className="pb-16"
      subheading={page.subheading}
      title={page.title}
      intro={snapshot.profile.heroIntro}
    >
      <section
        aria-labelledby="about-summary-heading"
        className="grid gap-4 pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
        role="region"
      >
        <div className="rounded-lg border border-zinc-950/10 bg-white p-6">
          <h2
            id="about-summary-heading"
            className="text-xl font-medium tracking-tight text-zinc-950"
          >
            {snapshot.profile.name}
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            {snapshot.profile.role}
          </p>
          <p className="mt-5 text-sm leading-7 text-zinc-600">
            I work across frontend architecture, platform foundations, content
            modeling, and delivery systems. The common thread is making the
            product easier to extend without creating a maze of exceptions.
          </p>
        </div>

        <div className="rounded-lg border border-zinc-950/10 bg-white p-6">
          <h2 className="text-sm font-semibold text-zinc-950">Focus areas</h2>
          <div className="mt-4 flex flex-wrap gap-2" role="list">
            {snapshot.focusAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-zinc-950/10 px-3 py-2 text-sm text-zinc-700"
                role="listitem"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="about-experience-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <h2
          id="about-experience-heading"
          className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
        >
          Experience timeline
        </h2>
        <div className="mt-10 space-y-4">
          {workExperience.map((entry) => (
            <article
              key={entry.id}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-medium tracking-tight text-zinc-950">
                    {entry.role}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">{entry.company}</p>
                </div>
                <p className="text-sm text-zinc-500">
                  {formatRoleDate(entry.startDate)} -{" "}
                  {entry.isCurrentRole
                    ? "Present"
                    : formatRoleDate(entry.endDate)}
                </p>
              </div>
              {entry.summary ? (
                <p className="mt-4 text-sm leading-7 text-zinc-600">
                  {entry.summary}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="about-principles-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <h2
              id="about-principles-heading"
              className="text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              The working rules behind the portfolio.
            </h2>
          </div>
          <div className="space-y-4">
            {snapshot.operatingPrinciples.map((principle) => (
              <div
                key={principle}
                className="rounded-lg border border-zinc-950/10 bg-white p-5 text-sm leading-7 text-zinc-600"
              >
                {principle}
              </div>
            ))}
          </div>
        </div>
      </section>
    </SimpleLayout>
  );
}
