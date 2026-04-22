/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/page.tsx
 * @author Guy Romelle Magayano
 * @description Homepage rebuilt around direct local portfolio content with a Radiant-style shell and Joud-style data sections.
 */

import type { Metadata } from "next";
import Link from "next/link";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
} from "@web/app/_lib/portfolio-brochure";
import { Container } from "@web/components/container";
import { getAllArticles } from "@web/utils/articles";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("");

  return buildPortfolioPageMetadata(page);
}

export default async function HomePage() {
  const [{ page, snapshot }, articles] = await Promise.all([
    getPortfolioBrochurePage(""),
    getAllArticles(),
  ]);
  const featuredServices = snapshot.serviceOfferings
    .filter((service) => service.status === "published")
    .sort((left, right) => left.order - right.order)
    .slice(0, 3);
  const featuredApps = snapshot.showcaseApps
    .filter((app) => app.status === "published")
    .sort((left, right) => left.order - right.order)
    .slice(0, 3);
  const featuredArticles = articles.slice(0, 3);
  const experienceCompanies = snapshot.workExperience
    .filter((entry) => entry.status === "published")
    .sort((left, right) => left.order - right.order)
    .map((entry) => entry.company);
  const buildSequence = snapshot.buildSequence
    .filter((step) => step.status === "published")
    .sort((left, right) => left.order - right.order);
  const socialLinks = snapshot.socialLinks
    .slice()
    .sort((left, right) => left.order - right.order);

  return (
    <Container className="pt-16 sm:pt-24">
      <section
        aria-labelledby="home-hero-heading"
        className="grid gap-12 border-b border-zinc-950/10 pb-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.9fr)] lg:items-end"
        role="region"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
            {snapshot.profile.role}
          </p>
          <h1
            id="home-hero-heading"
            className="mt-4 max-w-5xl text-5xl font-medium tracking-tight text-zinc-950 sm:text-7xl"
          >
            {snapshot.profile.heroTitle}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 sm:text-xl">
            {snapshot.profile.heroIntro}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/hire"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Start a project
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-full border border-zinc-950/10 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:border-zinc-950/30"
            >
              Explore services
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <section
            aria-labelledby="home-proof-heading"
            className="rounded-lg border border-zinc-950/10 bg-white p-6"
            role="region"
          >
            <h2
              id="home-proof-heading"
              className="text-sm font-semibold text-zinc-950"
            >
              What this site proves
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-600">
              {snapshot.foundationCapabilities.slice(0, 4).map((item) => (
                <li
                  key={item}
                  className="border-t border-zinc-950/10 pt-3 first:border-t-0 first:pt-0"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section
            aria-labelledby="home-social-heading"
            className="rounded-lg border border-zinc-950/10 bg-white p-6"
            role="region"
          >
            <h2
              id="home-social-heading"
              className="text-sm font-semibold text-zinc-950"
            >
              Based in {snapshot.profile.location}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2" role="list">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  role="listitem"
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  className="inline-flex items-center rounded-full border border-zinc-950/10 px-3 py-2 text-sm text-zinc-700 transition hover:border-zinc-950/30 hover:text-zinc-950"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section
        aria-labelledby="home-companies-heading"
        className="py-8"
        role="region"
      >
        <h2 id="home-companies-heading" className="sr-only">
          Companies and teams
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-3 border-y border-zinc-950/10 py-5 text-sm font-medium text-zinc-500 sm:text-base">
          {experienceCompanies.map((company) => (
            <span key={company}>{company}</span>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="home-services-heading"
        className="py-16"
        role="region"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
              What I do
            </p>
            <h2
              id="home-services-heading"
              className="mt-3 text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              Senior product engineering work with clearer boundaries and less
              noise.
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
          >
            View all services
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {featuredServices.map((service) => (
            <article
              key={service.id}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <p className="text-xs font-semibold tracking-[0.24em] text-zinc-500 uppercase">
                {service.ctaLabel}
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-zinc-950">
                {service.name}
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {service.summary}
              </p>
              <ul
                aria-label={`${service.name} deliverables`}
                className="mt-5 space-y-2 text-sm leading-6 text-zinc-600"
                role="list"
              >
                {service.deliverables.map((deliverable) => (
                  <li key={deliverable}>{deliverable}</li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-zinc-500">
                <span className="font-medium text-zinc-950">Best for:</span>{" "}
                {service.bestFor}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="home-projects-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
              Selected work
            </p>
            <h2
              id="home-projects-heading"
              className="mt-3 text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              Product surfaces that make the platform story concrete.
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
          >
            Browse projects
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {featuredApps.map((app) => (
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
        aria-labelledby="home-articles-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
              Writing
            </p>
            <h2
              id="home-articles-heading"
              className="mt-3 text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              Notes on systems that ship well and stay understandable.
            </h2>
          </div>
          <Link
            href="/articles"
            className="text-sm font-medium text-zinc-950 underline decoration-zinc-300 underline-offset-4"
          >
            Read all articles
          </Link>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <article
              key={article.slug}
              className="rounded-lg border border-zinc-950/10 bg-white p-6"
            >
              <p className="text-xs font-semibold tracking-[0.24em] text-zinc-500 uppercase">
                {article.tags?.[0] || "Article"}
              </p>
              <h3 className="mt-3 text-xl font-medium tracking-tight text-zinc-950">
                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
              </h3>
              <p className="mt-3 text-sm leading-7 text-zinc-600">
                {article.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="home-build-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
              How I build
            </p>
            <h2
              id="home-build-heading"
              className="mt-3 text-3xl font-medium tracking-tight text-zinc-950 sm:text-4xl"
            >
              The system comes first, then the faster product surfaces.
            </h2>
            <ol className="mt-8 space-y-4">
              {buildSequence.map((step, index) => (
                <li
                  key={step.id}
                  className="rounded-lg border border-zinc-950/10 bg-white p-5"
                >
                  <p className="text-xs font-semibold tracking-[0.24em] text-zinc-500 uppercase">
                    Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-medium text-zinc-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-zinc-600">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-lg border border-zinc-950/10 bg-white p-6">
            <h2 className="text-sm font-semibold text-zinc-950">
              Working principles
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-600">
              {snapshot.operatingPrinciples.map((principle) => (
                <li
                  key={principle}
                  className="border-t border-zinc-950/10 pt-3 first:border-t-0 first:pt-0"
                >
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="home-cta-heading"
        className="border-t border-zinc-950/10 py-16"
        role="region"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-zinc-500 uppercase">
            {page.subheading}
          </p>
          <h2
            id="home-cta-heading"
            className="mt-3 text-3xl font-medium tracking-tight text-zinc-950 sm:text-5xl"
          >
            Need a cleaner next move for the product?
          </h2>
          <p className="mt-5 text-lg leading-8 text-zinc-600">
            Start with the current bottleneck, the delivery risk, or the system
            you want to simplify. I’ll help narrow the next useful step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Choose a starting path
            </Link>
            <Link
              href="/hire"
              className="inline-flex items-center justify-center rounded-full border border-zinc-950/10 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:border-zinc-950/30"
            >
              Open hire page
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
