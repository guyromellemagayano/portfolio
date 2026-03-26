/* eslint-disable react-refresh/only-export-components */

/**
 * @file apps/web/src/app/(blog)/contact/page.tsx
 * @author Guy Romelle Magayano
 * @description Implementation for page.
 */
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";

import logger from "@portfolio/logger";

import { Card } from "@web/components/card";
import { SimpleLayout } from "@web/components/layout";
import { SocialLink } from "@web/components/link";
import { SocialList, SocialListItem } from "@web/components/list";
import { Heading } from "@web/components/text";
import {
  type CommonLayoutComponentData,
  SOCIAL_LIST_COMPONENT_LABELS,
} from "@web/data/page";
import { getSafeHeroMessages, normalizeError } from "@web/utils/error";

const CONTACT_PAGE_I18N_NAMESPACE = "page.contact.labels";
const CONTACT_PAGE_I18N_FALLBACK: CommonLayoutComponentData = {
  subheading: "Contact",
  title: "Bring me in when the product needs stronger systems.",
  intro:
    "I’m interested in work that benefits from clear frontend architecture, reusable platform foundations, and pragmatic full-stack product thinking.",
};

export const metadata: Metadata = {
  title: CONTACT_PAGE_I18N_FALLBACK.subheading,
  description: CONTACT_PAGE_I18N_FALLBACK.intro,
};
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  // Internationalization
  const contactPageI18n: CommonLayoutComponentData = await getTranslations(
    CONTACT_PAGE_I18N_NAMESPACE
  )
    .then((data) => ({
      subheading: getSafeHeroMessages(
        CONTACT_PAGE_I18N_NAMESPACE,
        data,
        "subheading",
        CONTACT_PAGE_I18N_FALLBACK.subheading
      ),
      title: getSafeHeroMessages(
        CONTACT_PAGE_I18N_NAMESPACE,
        data,
        "title",
        CONTACT_PAGE_I18N_FALLBACK.title
      ),
      intro: getSafeHeroMessages(
        CONTACT_PAGE_I18N_NAMESPACE,
        data,
        "description",
        CONTACT_PAGE_I18N_FALLBACK.intro
      ),
    }))
    .catch((err) => {
      const normalizedErr = normalizeError(err);

      if (normalizedErr.isDynamicServerUsage) {
        return CONTACT_PAGE_I18N_FALLBACK;
      }

      logger.error("Contact page translations failed to load", normalizedErr, {
        component: "web.app.contact.page",
        operation: "getContactPageI18n",
        metadata: {
          namespace: CONTACT_PAGE_I18N_NAMESPACE,
        },
      });

      return CONTACT_PAGE_I18N_FALLBACK;
    });

  return (
    <SimpleLayout {...contactPageI18n} className="mt-16 sm:mt-32">
      <section
        aria-labelledby="contact-topics-heading"
        className="mt-16"
        role="region"
      >
        <h2
          id="contact-topics-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Common reasons people reach out
        </h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {[
            {
              title: "Architecture review",
              description:
                "A system is getting harder to change and you need a clear technical read on what to fix first.",
            },
            {
              title: "Ongoing advisory",
              description:
                "You want a senior engineering partner for product/platform decisions without forcing a full-time hire.",
            },
            {
              title: "Hands-on delivery",
              description:
                "The direction is clear and you need someone to execute the high-leverage implementation work.",
            },
          ].map((topic) => (
            <Card
              key={topic.title}
              as="article"
              className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
            >
              <Heading
                as="h3"
                className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
              >
                {topic.title}
              </Heading>
              <Card.Description>{topic.description}</Card.Description>
              <Card.Cta
                href={`mailto:aspiredtechie2010@gmail.com?subject=${encodeURIComponent(topic.title)}`}
                title={`Email about ${topic.title}`}
              >
                Email about this
              </Card.Cta>
            </Card>
          ))}
        </div>
      </section>
      <section
        aria-labelledby="contact-find-me-heading"
        className="mt-20"
        role="region"
      >
        <h2
          id="contact-find-me-heading"
          className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          Or find me here
        </h2>
        <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          Email is best for project inquiries. LinkedIn and GitHub work well if
          you want more context first.
        </p>
        <div className="mt-8 flex flex-col gap-6">
          <Card
            as="article"
            className="rounded-3xl border border-zinc-200/70 p-6 dark:border-zinc-800"
          >
            <Heading
              as="h3"
              className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
            >
              Direct email
            </Heading>
            <Card.Cta
              href="mailto:aspiredtechie2010@gmail.com"
              title="Send email"
            >
              aspiredtechie2010@gmail.com
            </Card.Cta>
          </Card>
          {SOCIAL_LIST_COMPONENT_LABELS?.length > 0 ? (
            <SocialList className="flex gap-6" role="list">
              {SOCIAL_LIST_COMPONENT_LABELS.map((value) => (
                <SocialListItem
                  key={value.href ?? value.icon}
                  className="group -m-1 p-1"
                >
                  <SocialLink {...value} hasLabel />
                </SocialListItem>
              ))}
            </SocialList>
          ) : null}
        </div>
      </section>
    </SimpleLayout>
  );
}
