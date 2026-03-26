/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/book/page.tsx
 * @author Guy Romelle Magayano
 * @description Booking-intent page that helps visitors choose the best starting path.
 */

import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { Card } from "@web/components/card";
import { SimpleLayout } from "@web/components/layout";
import { Heading } from "@web/components/text";
import { type CommonLayoutComponentData } from "@web/data/page";
import { PORTFOLIO_SERVICE_OFFERINGS } from "@web/data/portfolio-showcase";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const BOOK_PAGE_I18N_NAMESPACE = "page.book.labels";
const BOOK_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Book",
  title: "Choose the best way to start the conversation.",
  intro:
    "If you're not sure whether you need a review, advisory, or hands-on implementation, this page gives you a clean starting point.",
};

type BookingPath = Readonly<{
  title: string;
  description: string;
  href: string;
  cta: string;
  target?: "_blank";
}>;

const BOOKING_PATHS: ReadonlyArray<BookingPath> = [
  {
    title: "Email me directly",
    description:
      "Best when you already know the project context and want to send a compact brief.",
    href: "mailto:aspiredtechie2010@gmail.com?subject=Project%20Inquiry",
    cta: "Send email",
  },
  {
    title: "Start with the contact page",
    description:
      "Best when you want a simple path and a little more structure around the inquiry.",
    href: "/contact",
    cta: "Open contact",
  },
  {
    title: "Reach out on LinkedIn",
    description:
      "Best when the first conversation is more exploratory or relationship-driven.",
    href: "https://www.linkedin.com/in/guyromellemagayano",
    cta: "Open LinkedIn",
    target: "_blank",
  },
];

export const metadata: Metadata = {
  title: BOOK_PAGE_I18N_FALLBACK.subheading,
  description: BOOK_PAGE_I18N_FALLBACK.intro,
};

export default async function BookPage() {
  const bookPageI18n: CommonLayoutComponentData = await getTranslations(
    BOOK_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        BOOK_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        BOOK_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        BOOK_PAGE_I18N_NAMESPACE,
        data,
        "title",
        BOOK_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        BOOK_PAGE_I18N_NAMESPACE,
        data,
        "description",
        BOOK_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return BOOK_PAGE_I18N_FALLBACK;
      }

      logger.error("Book page translations failed to load", normalizedErr, {
        component: "web.app.book.page",
        operation: "getBookPageI18n",
        metadata: {
          namespace: BOOK_PAGE_I18N_NAMESPACE,
        },
      });

      return BOOK_PAGE_I18N_FALLBACK;
    });

  return (
    <SimpleLayout {...bookPageI18n} className="mt-16 sm:mt-32">
      <section
        aria-labelledby="book-starting-points-heading"
        className="mt-16"
        role="region"
      >
        <h2
          id="book-starting-points-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Starting points
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {BOOKING_PATHS.map((path) => (
            <Card
              key={path.title}
              as="article"
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <Heading
                as="h3"
                className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
              >
                {path.title}
              </Heading>
              <Card.Description>{path.description}</Card.Description>
              <Card.Cta href={path.href} title={path.cta} target={path.target}>
                {path.cta}
              </Card.Cta>
            </Card>
          ))}
        </div>
      </section>
      <section
        aria-labelledby="book-which-service-heading"
        className="mt-20"
        role="region"
      >
        <h2
          id="book-which-service-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          If you already know the shape of the work
        </h2>
        <div className="mt-10 space-y-8">
          {PORTFOLIO_SERVICE_OFFERINGS.map((service) => (
            <Card
              key={service.anchor}
              as="article"
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <Heading
                as="h3"
                className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
              >
                {service.name}
              </Heading>
              <Card.Description>{service.bestFor}</Card.Description>
              <Card.Cta href={service.href} title={service.ctaLabel}>
                {service.ctaLabel}
              </Card.Cta>
            </Card>
          ))}
        </div>
      </section>
    </SimpleLayout>
  );
}
