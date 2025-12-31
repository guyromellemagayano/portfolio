import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Button, Icon } from "@web/components";
import { cn } from "@web/utils";

// ============================================================================
// FORM COMPONENT I18N
// ============================================================================

type FormI18n = Readonly<Record<string, string>>;

const FORM_I18N = {
  newsletterFormHeading: "Stay up to date",
  newsletterFormDescription:
    "Get notified when I publish something new, and unsubscribe at any time.",
  newsletterFormEmailAddressLabel: "Email address",
  newsletterFormJoinButtonTextLabel: "Join",
} as const satisfies FormI18n;

// ============================================================================
// FORM COMPONENT
// ============================================================================

type FormElementType = "form";
type FormVariant = "default" | "newsletter";

export type FormProps<T extends FormElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  "as"
> &
  Omit<CommonComponentProps, "as"> & {
    /** The component to render as - only "form" is allowed */
    as?: T;
    /** The variant of the form */
    variant?: FormVariant;
  };

export const Form = setDisplayName(function Form<T extends FormElementType>(
  props: FormProps<T>
) {
  const {
    as: Component = "form",
    variant = "default",
    children,
    debugId,
    debugMode,
    ...rest
  } = props;

  // Form component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  // Define a mapping of variants to components
  const variantComponentMap: Record<FormVariant, React.ElementType> = {
    default: Component,
    newsletter: NewsletterForm,
  };

  // Choose the component based on a variant
  const VariantComponent = variantComponentMap[variant] || Component;

  // For the default variant, use a string element directly
  // Respect the `as` prop if provided, otherwise use "form" from a variant map
  if (variant === "default") {
    // Default variant requires children
    if (!children) return null;

    return (
      <Component
        {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
        role="form"
        {...createComponentProps(componentId, `form-${variant}`, isDebugMode)}
      >
        {children}
      </Component>
    );
  }

  const variantProps = {
    ...rest,
    as: Component,
    variant,
    debugId,
    debugMode,
  };

  return <VariantComponent {...variantProps}>{children}</VariantComponent>;
});

// ============================================================================
// MEMOIZED FORM COMPONENT
// ============================================================================

export const MemoizedForm = React.memo(Form);

// ============================================================================
// NEWSLETTER FORM COMPONENT
// ============================================================================

const NewsletterForm = setDisplayName(function NewsletterForm(
  props: FormProps<FormElementType>
) {
  const {
    as: Component = "form",
    variant,
    action = "/thank-you",
    className,
    debugId,
    debugMode,
    role = "form",
    ...rest
  } = props;

  // Newsletter form component component ID and debug mode
  const { componentId, isDebugMode } = useComponentId({
    debugId,
    debugMode,
  });

  return (
    <Component
      {...(rest as React.ComponentPropsWithoutRef<typeof Component>)}
      role={role}
      action={action}
      className={cn(
        "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
        className
      )}
      {...createComponentProps(componentId, `form-${variant}`, isDebugMode)}
    >
      <h2
        className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
        {...createComponentProps(
          componentId,
          `form-${variant}-heading`,
          isDebugMode
        )}
      >
        <Icon
          name="mail"
          className="h-6 w-6 flex-none"
          debugId={componentId}
          debugMode={isDebugMode}
        />
        <span
          className="ml-3"
          {...createComponentProps(
            componentId,
            `form-${variant}-heading-text`,
            isDebugMode
          )}
        >
          {FORM_I18N.newsletterFormHeading}
        </span>
      </h2>
      <p
        className="mt-2 text-sm text-zinc-600 dark:text-zinc-400"
        {...createComponentProps(
          componentId,
          `form-${variant}-description`,
          isDebugMode
        )}
      >
        {FORM_I18N.newsletterFormDescription}
      </p>
      <div
        className="mt-6 flex items-center"
        {...createComponentProps(
          componentId,
          `form-${variant}-email-input-container`,
          isDebugMode
        )}
      >
        <span
          className="flex min-w-0 flex-auto p-px"
          {...createComponentProps(
            componentId,
            `form-${variant}-email-input-wrapper`,
            isDebugMode
          )}
        >
          <input
            type="email"
            placeholder={FORM_I18N.newsletterFormEmailAddressLabel}
            aria-label={FORM_I18N.newsletterFormEmailAddressLabel}
            className="w-full appearance-none rounded-[calc(var(--radius-md)-1px)] bg-white px-3 py-[calc(--spacing(2)-1px)] shadow-md shadow-zinc-800/5 outline outline-zinc-900/10 placeholder:text-zinc-400 focus:ring-4 focus:ring-teal-500/10 focus:outline-teal-500 sm:text-sm dark:bg-zinc-700/15 dark:text-zinc-200 dark:outline-zinc-700 dark:placeholder:text-zinc-500 dark:focus:ring-teal-400/10 dark:focus:outline-teal-400"
            required
            {...createComponentProps(
              componentId,
              `form-${variant}-email-input-field`,
              isDebugMode
            )}
          />
        </span>
        <Button
          type="submit"
          className="ml-4 flex-none"
          debugId={componentId}
          debugMode={isDebugMode}
        >
          {FORM_I18N.newsletterFormJoinButtonTextLabel}
        </Button>
      </div>
    </Component>
  );
});

// ============================================================================
// MEMOIZED NEWSLETTER FORM COMPONENT
// ============================================================================

export const MemoizedNewsletterForm = React.memo(NewsletterForm);
