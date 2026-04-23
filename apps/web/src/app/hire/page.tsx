/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/hire/page.tsx
 * @author Guy Romelle Magayano
 * @description Public hire page rendered from direct local portfolio content.
 */

import type { Metadata } from "next";

import {
  buildPortfolioPageMetadata,
  getPortfolioBrochurePage,
  getPortfolioInquiryFormActionUrl,
  getPortfolioSocialLinkByPlatform,
} from "@web/app/_lib/portfolio-brochure";
import { SimpleLayout } from "@web/components/layout";

const INPUT_CLASS_NAME =
  "mt-2 w-full rounded-lg border border-zinc-950/10 bg-white px-3 py-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-950/30";
const TEXTAREA_CLASS_NAME = `${INPUT_CLASS_NAME} min-h-[160px] resize-y`;

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const { page } = await getPortfolioBrochurePage("hire");

  return buildPortfolioPageMetadata(page);
}

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
      className="pb-16"
      subheading={page.subheading}
      title={page.title}
      intro={page.intro}
    >
      <section
        aria-labelledby="hire-form-heading"
        className="grid gap-6 py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
        role="region"
      >
        {inquiryFormAction ? (
          <form
            action={inquiryFormAction}
            aria-describedby="hire-form-hint"
            className="rounded-lg border border-zinc-950/10 bg-white p-6 sm:p-8"
            method="post"
            noValidate
            role="form"
          >
            <h2
              id="hire-form-heading"
              className="text-2xl font-medium tracking-tight text-zinc-950"
            >
              Project inquiry
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Keep it direct. The current bottleneck, the risk, the timeline,
              and the result that matters.
            </p>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-950"
                >
                  Full name
                </label>
                <input
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
                  className="text-sm font-medium text-zinc-950"
                >
                  Email
                </label>
                <input
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
                className="text-sm font-medium text-zinc-950"
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
                className="text-sm font-medium text-zinc-950"
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
                  className="text-sm font-medium text-zinc-950"
                >
                  Budget range
                </label>
                <input
                  className={INPUT_CLASS_NAME}
                  id="budget"
                  name="budget"
                  placeholder="e.g. $5k-$10k"
                  type="text"
                />
              </div>
              <div>
                <label
                  htmlFor="timeline"
                  className="text-sm font-medium text-zinc-950"
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
                className="text-sm font-medium text-zinc-950"
              >
                Problem details
              </label>
              <textarea
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

            <button
              className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
              type="submit"
            >
              Send request
            </button>
          </form>
        ) : (
          <section
            aria-labelledby="hire-fallback-heading"
            className="rounded-lg border border-zinc-950/10 bg-white p-6 sm:p-8"
            role="region"
          >
            <h2
              id="hire-fallback-heading"
              className="text-2xl font-medium tracking-tight text-zinc-950"
            >
              Inquiry intake is not configured yet
            </h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              Set `PORTFOLIO_INQUIRY_FORM_ACTION` to enable the external form
              endpoint. Until then, use one of the direct contact paths.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {emailLink ? (
                <a
                  href={emailLink.href}
                  className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                >
                  Email me directly
                </a>
              ) : null}
              {linkedinLink ? (
                <a
                  href={linkedinLink.href}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-950/10 bg-white px-5 py-3 text-sm font-medium text-zinc-950 transition hover:border-zinc-950/30"
                >
                  Open LinkedIn
                </a>
              ) : null}
            </div>
          </section>
        )}

        <aside className="space-y-4">
          <section
            aria-labelledby="hire-guidance-heading"
            className="rounded-lg border border-zinc-950/10 bg-white p-6"
            role="region"
          >
            <h2
              id="hire-guidance-heading"
              className="text-lg font-medium tracking-tight text-zinc-950"
            >
              Helpful context to include
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-600">
              <li>The surface or workflow that is getting harder to extend.</li>
              <li>
                The delivery risk or architectural debt behind the slowdown.
              </li>
              <li>The timeframe that makes the work useful right now.</li>
              <li>
                The kind of help you expect: review, advisory, or execution.
              </li>
            </ul>
          </section>

          <section
            aria-labelledby="hire-services-heading"
            className="rounded-lg border border-zinc-950/10 bg-white p-6"
            role="region"
          >
            <h2
              id="hire-services-heading"
              className="text-lg font-medium tracking-tight text-zinc-950"
            >
              Typical engagement shapes
            </h2>
            <div className="mt-4 space-y-4">
              {snapshot.serviceOfferings
                .filter((service) => service.status === "published")
                .sort((left, right) => left.order - right.order)
                .map((service) => (
                  <article
                    key={service.id}
                    className="border-t border-zinc-950/10 pt-4 first:border-t-0 first:pt-0"
                  >
                    <h3 className="text-sm font-semibold text-zinc-950">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                      {service.bestFor}
                    </p>
                  </article>
                ))}
            </div>
          </section>
        </aside>
      </section>
    </SimpleLayout>
  );
}
