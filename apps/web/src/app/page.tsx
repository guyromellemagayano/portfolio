/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/page.tsx
 * @author Guy Romelle Magayano
 * @description Static portfolio homepage rendered from the canonical portfolio snapshot API.
 */

import type { Metadata } from "next";
import Link from "next/link";

import { SimpleLayout } from "@web/components/layout";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "./_lib/portfolio-brochure";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("");

  return buildPortfolioPageMetadata(page);
}

export default async function HomePage() {
  const { snapshot, page } = await getPortfolioBrochurePage("");
  const featuredServices = snapshot.serviceOfferings
    .filter((service) => service.status === "published")
    .sort((left, right) => left.order - right.order)
    .slice(0, 3);
  const featuredApps = snapshot.showcaseApps
    .filter((app) => app.status === "published")
    .sort((left, right) => left.order - right.order)
    .slice(0, 3);
  const socialLinks = snapshot.socialLinks
    .slice()
    .sort((left, right) => left.order - right.order);

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={snapshot.profile.role}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="home-profile-heading"
        className="mt-12 rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
        role="region"
      >
        <h2
          id="home-profile-heading"
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {snapshot.profile.name}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          {snapshot.profile.heroIntro}
        </p>
        {snapshot.profile.location ? (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            Based in {snapshot.profile.location}
          </p>
        ) : null}
        <div
          aria-label="Primary social links"
          className="mt-6 flex flex-wrap gap-3"
          role="list"
        >
          {socialLinks.map((socialLink) => (
            <a
              key={socialLink.id}
              className="rounded-full border border-zinc-200 px-4 py-2 text-sm text-zinc-700 transition hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-200 dark:hover:text-zinc-50"
              href={socialLink.href}
              rel={
                socialLink.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              role="listitem"
              target={socialLink.href.startsWith("http") ? "_blank" : undefined}
            >
              {socialLink.label}
            </a>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="home-services-heading"
        className="mt-20"
        role="region"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2
              id="home-services-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              What I help with
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Strategic review, ongoing advisory, and direct implementation for
              product systems that need stronger frontend and platform shape.
            </p>
          </div>
          <Link
            className="text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
            href="/services"
          >
            View all services
          </Link>
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <article
              key={service.id}
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {service.summary}
              </p>
              <ul
                aria-label={`${service.name} deliverables`}
                className="mt-4 space-y-2 text-sm text-zinc-500 dark:text-zinc-400"
                role="list"
              >
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
              <Link
                className="mt-5 inline-flex text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
                href={service.href}
              >
                {service.ctaLabel}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="home-apps-heading"
        className="mt-20"
        role="region"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2
              id="home-apps-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Monorepo systems in public
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              The portfolio is framed as one coherent product system instead of
              a shelf of disconnected demos.
            </p>
          </div>
          <Link
            className="text-sm font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-50"
            href="/projects"
          >
            Browse projects
          </Link>
        </div>
        <div className="mt-8 grid gap-6 xl:grid-cols-3">
          {featuredApps.map((app) => (
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
              <ul
                aria-label={`${app.name} proof points`}
                className="mt-4 space-y-2 text-sm text-zinc-500 dark:text-zinc-400"
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
        aria-labelledby="home-cta-heading"
        className="mt-20 rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
        role="region"
      >
        <h2
          id="home-cta-heading"
          className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Need a clean next step?
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
          If the product needs stronger system boundaries, reusable UI, or
          clearer delivery direction, start with the hire flow and I’ll help
          narrow the next move.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            href="/hire"
          >
            Start the conversation
          </Link>
          <Link
            className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-200"
            href="/book"
          >
            Compare starting paths
          </Link>
        </div>
      </section>
    </SimpleLayout>
  );
}
