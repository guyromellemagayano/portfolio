/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/hire/page.tsx
 * @author Guy Romelle Magayano
 * @description Static hire page rendered from the canonical portfolio snapshot API.
 */

import type { Metadata } from "next";

import { SimpleLayout } from "@web/components/layout";
import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
  getPortfolioInquiryFormActionUrl,
  getPortfolioSocialLinkByPlatform,
} from "@web/app/_lib/portfolio-brochure";

const INPUT_CLASS_NAME =
  "w-full rounded-[calc(var(--radius-md)-1px)] border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm shadow-zinc-800/5 outline-none outline-1 outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-zinc-500/10 focus:outline-zinc-500 dark:border-zinc-700 dark:bg-zinc-700/20 dark:text-zinc-100 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-400/10 dark:focus:outline-zinc-400";
const TEXTAREA_CLASS_NAME =
  "w-full rounded-[calc(var(--radius-md)-1px)] border border-zinc-200 bg-white px-3 py-2.5 text-sm shadow-sm shadow-zinc-800/5 outline-none outline-1 outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-zinc-500/10 focus:outline-zinc-500 dark:border-zinc-700 dark:bg-zinc-700/20 dark:text-zinc-100 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-400/10 dark:focus:outline-zinc-400 min-h-[130px] resize-y";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("hire");

  return buildPortfolioPageMetadata(page);
}

/** Render the public inquiry page as a static brochure surface with external form delivery. */
export default async function HirePage() {
  const { snapshot, page } = await getPortfolioBrochurePage("hire");
  const inquiryFormAction = getPortfolioInquiryFormActionUrl();
  const emailLink = getPortfolioSocialLinkByPlatform(snapshot, "email");
  const linkedinLink = getPortfolioSocialLinkByPlatform(snapshot, "linkedin");
  const serviceOptions = snapshot.serviceOfferings
    .filter((service) => service.status === "published")
    .sort((left, right) => left.order - right.order)
    .map((service) => service.name);

  return (
    <SimpleLayout
      className="mt-16 sm:mt-32"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section className="mt-10 max-w-3xl">
        {inquiryFormAction ? (
          <form
            action={inquiryFormAction}
            aria-labelledby="hire-form-heading"
            className="rounded-3xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950"
            method="post"
            noValidate
            role="form"
          >
            <h2
              id="hire-form-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Tell me about your situation
            </h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              This form posts to the configured external intake endpoint, so the
              brochure stays static while inquiry handling stays off Vercel
              runtime.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Full name
                </label>
                <input
                  aria-describedby="hire-form-hint"
                  aria-required="true"
                  autoComplete="name"
                  className={INPUT_CLASS_NAME}
                  id="name"
                  name="name"
                  placeholder="Jane Developer"
                  required
                  type="text"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Email
                </label>
                <input
                  aria-describedby="hire-form-hint"
                  aria-required="true"
                  autoComplete="email"
                  className={INPUT_CLASS_NAME}
                  id="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  type="email"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="company"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Company or brand
              </label>
              <input
                autoComplete="organization"
                className={INPUT_CLASS_NAME}
                id="company"
                name="company"
                placeholder="Optional"
                type="text"
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="service"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Service type
              </label>
              <select
                aria-describedby="hire-form-service-help"
                className={INPUT_CLASS_NAME}
                defaultValue="General Inquiry"
                id="service"
                name="service"
              >
                {[...serviceOptions, "General Inquiry"].map((serviceOption) => (
                  <option key={serviceOption} value={serviceOption}>
                    {serviceOption}
                  </option>
                ))}
              </select>
              <p id="hire-form-service-help" className="sr-only">
                Choose the service category that best matches your request.
              </p>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="budget"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Budget range
                </label>
                <input
                  className={INPUT_CLASS_NAME}
                  id="budget"
                  name="budget"
                  placeholder="e.g. $5k–$10k"
                  type="text"
                />
              </div>
              <div>
                <label
                  htmlFor="timeline"
                  className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
                >
                  Target timeline
                </label>
                <input
                  className={INPUT_CLASS_NAME}
                  id="timeline"
                  name="timeline"
                  placeholder="e.g. 4 weeks"
                  type="text"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Problem details
              </label>
              <textarea
                aria-describedby="hire-form-hint"
                aria-required="true"
                className={TEXTAREA_CLASS_NAME}
                id="message"
                name="message"
                placeholder="What is the current bottleneck? What outcome matters most?"
                required
              />
            </div>

            <p id="hire-form-hint" className="sr-only">
              Required fields include full name, email, and project details.
            </p>
            <input
              name="source"
              readOnly
              type="hidden"
              value="hire-page-form"
            />

            <div className="mt-6">
              <button
                className="inline-flex items-center justify-center rounded-full border border-zinc-900/10 bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-zinc-50 shadow-sm shadow-zinc-900/20 transition hover:bg-zinc-700 focus-visible:outline-zinc-600 dark:border-zinc-50/20 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                type="submit"
              >
                Send request
              </button>
            </div>
          </form>
        ) : (
          <section
            aria-labelledby="hire-fallback-heading"
            className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            role="region"
          >
            <h2
              id="hire-fallback-heading"
              className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
            >
              Inquiry intake is not configured yet
            </h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Set `PORTFOLIO_INQUIRY_FORM_ACTION` to enable the external form
              endpoint. Until then, use a direct contact path below.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              {emailLink ? (
                <a
                  className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-zinc-50 transition hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                  href={emailLink.href}
                >
                  Email me directly
                </a>
              ) : null}
              {linkedinLink ? (
                <a
                  className="rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:border-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-200"
                  href={linkedinLink.href}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Open LinkedIn
                </a>
              ) : null}
            </div>
          </section>
        )}
      </section>

      <section
        aria-labelledby="hire-services-heading"
        className="mt-20"
        role="region"
      >
        <h2
          id="hire-services-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Typical engagement shapes
        </h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {snapshot.serviceOfferings
            .filter((service) => service.status === "published")
            .sort((left, right) => left.order - right.order)
            .map((service) => (
              <article
                key={service.id}
                className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
              >
                <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  {service.bestFor}
                </p>
              </article>
            ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
