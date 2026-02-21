import type { ElementType } from "react";

import { logger as sharedLogger } from "@portfolio/logger";

import {
  filterElementSpecificProps,
  getElementConfig,
  validatePolymorphicProps,
  type AnalyticsEvent,
  type AnalyticsEventType,
} from "./types";

type AnyProps = Record<string, unknown>;

function getAsTagName(
  asProp: ElementType | undefined,
  fallback: string
): string {
  if (typeof asProp === "string") return asProp.toLowerCase();
  return fallback;
}

export function preparePolymorphicProps<TProps extends AnyProps>(
  componentName: string,
  defaultElement: string,
  asProp: ElementType | undefined,
  inputProps: TProps
): { Component: ElementType; props: TProps } {
  const asTag = getAsTagName(asProp, defaultElement);
  const elementConfig = getElementConfig(defaultElement);

  let props = inputProps;

  const log = sharedLogger.child({
    component: componentName,
    operation: "preparePolymorphicProps",
  });
  if (process.env.NODE_ENV === "development") {
    log.debug("prepare:start", { asTag, defaultElement, props });
  }

  if (elementConfig) {
    // Dev-only warnings
    validatePolymorphicProps(componentName, asTag, props, elementConfig);

    // Remove element-only props if rendering as a different element
    if (asTag !== defaultElement) {
      if (process.env.NODE_ENV === "development") {
        const invalidProps = elementConfig.specificProps.filter(
          (prop) =>
            (props as AnyProps)[prop] !== undefined &&
            (props as AnyProps)[prop] !== null
        );
        if (invalidProps.length > 0) {
          log.warn("element-specific props used on different 'as' element", {
            asTag,
            defaultElement,
            invalidProps,
          });
        }
      }
      props = filterElementSpecificProps(
        props as AnyProps,
        asTag,
        elementConfig
      ) as TProps;
      if (process.env.NODE_ENV === "development") {
        log.debug("prepare:filtered", { asTag, defaultElement });
      }
    }
  }

  // Analytics wiring: emit normalized events for interactive patterns
  const onAnalytics = (props as AnyProps).onAnalytics as
    | ((e: AnalyticsEvent) => void)
    | undefined;
  const analyticsId = (props as AnyProps).analyticsId as string | undefined;
  const analyticsMeta = (props as AnyProps).analyticsMeta as
    | Record<string, unknown>
    | undefined;

  const emit = (
    type: AnalyticsEventType,
    name: string,
    properties?: Record<string, unknown>
  ) => {
    if (!onAnalytics) return;
    const payload: AnalyticsEvent = {
      type,
      name,
      properties: {
        component: componentName,
        as: asTag,
        id: analyticsId,
        ...analyticsMeta,
        ...properties,
      },
      timestamp: Date.now(),
    };
    try {
      onAnalytics(payload);
    } catch (err) {
      // prevent user-land errors from breaking render
      if (process.env.NODE_ENV === "development") {
        log.error("analytics:callback_error", { error: String(err) });
      }
    }
  };

  // Attach event bridges without overriding user handlers
  const bridge = <K extends string>(key: K, fire: () => void) => {
    const original = (props as AnyProps)[key] as
      | ((...a: unknown[]) => unknown)
      | undefined;
    (props as AnyProps)[key] = (...args: unknown[]) => {
      try {
        original?.(...args);
      } finally {
        fire();
      }
    };
  };

  // Only add bridges if a consumer provided analytics callback
  if (onAnalytics) {
    // Common interactive events
    bridge("onClick", () => emit("click", "click"));
    bridge("onFocus", () => emit("focus", "focus"));
    bridge("onBlur", () => emit("blur", "blur"));
    bridge("onChange", () =>
      emit("custom", "change", { interactionType: "change" })
    );
    bridge("onInput", () =>
      emit("custom", "input", { interactionType: "input" })
    );
    bridge("onKeyDown", () =>
      emit("custom", "keydown", { interactionType: "keydown" })
    );
    bridge("onKeyUp", () =>
      emit("custom", "keyup", { interactionType: "keyup" })
    );
    bridge("onSubmit", () => emit("submit", "submit"));
  }

  // Add debug and analytics attributes in development for inspection
  if (process.env.NODE_ENV === "development") {
    props = {
      ...props,
      "data-component": componentName,
      "data-as": asTag,
      ...(analyticsId ? { "data-analytics-id": analyticsId } : {}),
    } as TProps;
    log.debug("prepare:final", { asTag, defaultElement, props });
  }

  const Component = (asProp || defaultElement) as ElementType;
  return { Component, props };
}
