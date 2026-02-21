/**
 * @file apps/web/src/components/form/Form.tsx
 * @author Guy Romelle Magayano
 * @description Main Form component implementation.
 */

"use client";

import {
  useId,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
} from "react";

import { useTranslations } from "next-intl";

import { COMMON_FOCUS_CLASSNAMES } from "@web/data/common";
import { cn } from "@web/utils/helpers";

import { Button } from "../button";
import { Icon } from "../icon";

// ============================================================================
// COMMON FORM COMPONENT TYPES
// ============================================================================

export type FormElementType = "form";

// ============================================================================
// NEWSLETTER FORM COMPONENT
// ============================================================================

export type NewsletterFormElementType = FormElementType;
export type NewsletterFormProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<NewsletterFormElementType>,
  "as"
> &
  P & {
    as?: NewsletterFormElementType;
  };

export function NewsletterForm<P extends Record<string, unknown> = {}>(
  props: NewsletterFormProps<P>
) {
  const {
    as: Component = "form",
    action = "/thank-you",
    className,
    ...rest
  } = props;

  // Generate unique IDs for ARIA relationships for better accessibility and SEO
  const formId = useId();
  const headingId = `${formId}-heading`;
  const descriptionId = `${formId}-description`;
  const emailInputId = `${formId}-email`;

  // Internationalization
  const newsletterFormI18n = useTranslations("components.form.newsletterForm");

  // Newsletter form labels
  const FORM_I18N = {
    newsletterFormHeading: newsletterFormI18n("heading"),
    newsletterFormDescription: newsletterFormI18n("description"),
    newsletterFormEmailAddressLabel: newsletterFormI18n("emailAddressLabel"),
    newsletterFormJoinButtonTextLabel: newsletterFormI18n(
      "joinButtonTextLabel"
    ),
  };

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<NewsletterFormElementType>)}
      action={action}
      method="post"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className={cn(
        "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
        className
      )}
    >
      <h2
        id={headingId}
        className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
      >
        <Icon name="mail" className="h-6 w-6 flex-none" aria-hidden="true" />
        <span className="ml-3">{FORM_I18N.newsletterFormHeading}</span>
      </h2>
      <p
        id={descriptionId}
        className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
      >
        {FORM_I18N.newsletterFormDescription}
      </p>
      <div className="mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <label htmlFor={emailInputId} className="sr-only">
            {FORM_I18N.newsletterFormEmailAddressLabel}
          </label>
          <input
            id={emailInputId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            spellCheck={false}
            placeholder={FORM_I18N.newsletterFormEmailAddressLabel}
            aria-label={FORM_I18N.newsletterFormEmailAddressLabel}
            aria-required="true"
            className={cn(
              "w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-zinc-500/10 focus:outline-zinc-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-zinc-400/10 dark:focus:outline-zinc-400",
              COMMON_FOCUS_CLASSNAMES
            )}
            required
          />
        </span>
        <Button type="submit" className="ml-4 flex-none">
          {FORM_I18N.newsletterFormJoinButtonTextLabel}
        </Button>
      </div>
    </Component>
  );
}

NewsletterForm.displayName = "NewsletterForm";

// ============================================================================
// MAIN FORM COMPONENT
// ============================================================================

export type FormProps<P extends Record<string, unknown> = {}> = Omit<
  ComponentPropsWithRef<FormElementType>,
  "as"
> &
  P & {
    as?: FormElementType;
  };

export function Form<P extends Record<string, unknown> = {}>(
  props: FormProps<P>
) {
  const { as: Component = "form", children, ...rest } = props;

  if (!children) return null;

  return (
    <Component
      {...(rest as ComponentPropsWithoutRef<FormElementType>)}
      role="form"
      method="post"
    >
      {children}
    </Component>
  );
}

Form.displayName = "Form";
