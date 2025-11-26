import React from "react";

import { type CommonComponentProps } from "@guyromellemagayano/components";
import { useComponentId } from "@guyromellemagayano/hooks";
import {
  createComponentProps,
  setDisplayName,
} from "@guyromellemagayano/utils";

import { Button, Icon } from "@web/components";
import { cn } from "@web/utils";

import { FORM_I18N } from "./Form.i18n";

// ============================================================================
// NEWSLETTER FORM COMPONENT TYPES & INTERFACES
// ============================================================================

export interface NewsletterFormProps
  extends React.ComponentPropsWithRef<"form">,
    CommonComponentProps {}
export type NewsletterFormComponent = React.FC<NewsletterFormProps>;

// ============================================================================
// BASE NEWSLETTER FORM COMPONENT
// ============================================================================

const BaseNewsletterForm: NewsletterFormComponent = setDisplayName(
  function BaseNewsletterForm(props) {
    const {
      as: Component = "form",
      action = "/thank-you",
      className,
      debugId,
      debugMode,
      ...rest
    } = props;

    const { componentId, isDebugMode } = useComponentId({
      debugId,
      debugMode,
    });

    const element = (
      <Component
        {...rest}
        action={action}
        className={cn(
          "rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40",
          className
        )}
        {...createComponentProps(componentId, "newsletter-form", isDebugMode)}
      >
        <h2
          className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100"
          {...createComponentProps(
            componentId,
            "newsletter-form-heading",
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
              "newsletter-form-heading-text",
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
            "newsletter-form-description",
            isDebugMode
          )}
        >
          {FORM_I18N.newsletterFormDescription}
        </p>
        <div
          className="mt-6 flex items-center"
          {...createComponentProps(
            componentId,
            "newsletter-form-email-input-container",
            isDebugMode
          )}
        >
          <span
            className="flex min-w-0 flex-auto p-px"
            {...createComponentProps(
              componentId,
              "newsletter-form-email-input-wrapper",
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
                "newsletter-form-email-input-field",
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

    return element;
  }
);

// ============================================================================
// MEMOIZED NEWSLETTER FORM COMPONENT
// ============================================================================

const MemoizedNewsletterForm = React.memo(BaseNewsletterForm);

// ============================================================================
// MAIN NEWSLETTER FORM COMPONENT
// ============================================================================

export const NewsletterForm: NewsletterFormComponent = setDisplayName(
  function NewsletterForm(props) {
    const { children, isMemoized = false, ...rest } = props;

    const Component = isMemoized ? MemoizedNewsletterForm : BaseNewsletterForm;
    const element = <Component {...rest}>{children}</Component>;
    return element;
  }
);
