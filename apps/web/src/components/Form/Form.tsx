/**
 * @file Form.tsx
 * @author Guy Romelle Magayano
 * @description Compound components for the form component.
 */

import React from "react";

import { useTranslations } from "next-intl";

import { Button } from "@web/components/button";
import { Icon } from "@web/components/icon/Icon";
import { CommonAppComponentProps } from "@web/types/common";
import { cn } from "@web/utils/helpers";

// ============================================================================
// NEWSLETTER FORM COMPONENT
// ============================================================================

type NewsletterFormElementType = typeof Form;

export type NewsletterFormProps<
  T extends NewsletterFormElementType,
  P extends Record<string, unknown> = {},
> = CommonAppComponentProps &
  React.ComponentPropsWithRef<T> &
  P & {
    as?: T;
  };

export function NewsletterForm<
  T extends NewsletterFormElementType,
  P extends Record<string, unknown> = {},
>(props: NewsletterFormProps<T, P>) {
  const {
    as: Component = Form,
    action = "/thank-you",
    className,
    ...rest
  } = props;

  // Internationalization
  const t = useTranslations("form.newsletterForm");

  // Newsletter form labels
  const FORM_I18N = React.useMemo(
    () => ({
      newsletterFormHeading: t("heading"),
      newsletterFormDescription: t("description"),
      newsletterFormEmailAddressLabel: t("emailAddressLabel"),
      newsletterFormJoinButtonTextLabel: t("joinButtonTextLabel"),
    }),
    [t]
  );

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<T>)}
      action={action}
      className={cn(
        "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
        className
      )}
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <Icon name="mail" className="h-6 w-6 flex-none" />
        <span className="ml-3">{FORM_I18N.newsletterFormHeading}</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {FORM_I18N.newsletterFormDescription}
      </p>
      <div className="mt-6 flex items-center">
        <span className="flex min-w-0 flex-auto p-px">
          <input
            type="email"
            placeholder={FORM_I18N.newsletterFormEmailAddressLabel}
            aria-label={FORM_I18N.newsletterFormEmailAddressLabel}
            className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
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
// MAIN NEWSLETTER FORM COMPONENT
// ============================================================================

type FormElementType = "form";

export type FormProps<
  T extends FormElementType,
  P extends Record<string, unknown> = {},
> = CommonAppComponentProps &
  Omit<React.ComponentPropsWithRef<T>, "as"> &
  P & {
    as?: T;
  };

export function Form<
  T extends FormElementType,
  P extends Record<string, unknown> = {},
>(props: FormProps<T, P>) {
  const { as: Component = "form", children, ...rest } = props;

  if (!children) return null;

  return (
    <Component {...(rest as React.ComponentPropsWithoutRef<T>)} role="form">
      {children}
    </Component>
  );
}

Form.displayName = "Form";

// ============================================================================
// MEMOIZED FORM COMPONENT
// ============================================================================

export const MemoizedForm = React.memo(Form);

// ============================================================================
// FORM COMPOUND COMPONENTS
// ============================================================================

Form.Newsletter = NewsletterForm;
