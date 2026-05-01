import React from "react";

import { VOID_HTML_ELEMENTS } from "./element-metadata";
import {
  type ComponentAnalyticsAttributes,
  type HtmlPrimitiveComponent,
  type PrimitiveElement,
} from "./types";

type PrimitivePropsRecord = Record<string, unknown>;

type HtmlPrimitiveDefaultProps =
  | PrimitivePropsRecord
  | ((props: PrimitivePropsRecord, tagName: string) => PrimitivePropsRecord);

interface HtmlPrimitiveOptions {
  defaultProps?: HtmlPrimitiveDefaultProps;
  prepareProps?: (
    props: PrimitivePropsRecord,
    tagName: string
  ) => PrimitivePropsRecord;
}

const voidHtmlElements = new Set<string>(VOID_HTML_ELEMENTS);

function toAnalyticsAttributeName(key: string) {
  const normalized = key
    .replace(/([a-z0-9])([A-Z])/gu, "$1-$2")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-+|-+$/gu, "");

  return normalized ? `data-analytics-${normalized}` : undefined;
}

function isAnalyticsAttributes(
  value: unknown
): value is ComponentAnalyticsAttributes {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function withAnalyticsAttributes(props: PrimitivePropsRecord) {
  const { analytics, ...rest } = props;

  if (!isAnalyticsAttributes(analytics)) {
    return rest;
  }

  const nextProps = { ...rest };

  for (const [key, value] of Object.entries(analytics)) {
    if (value === null || value === undefined) {
      continue;
    }

    const attributeName = toAnalyticsAttributeName(key);

    if (!attributeName || nextProps[attributeName] !== undefined) {
      continue;
    }

    nextProps[attributeName] = String(value);
  }

  return nextProps;
}

function getTagName(component: PrimitiveElement, fallback: string) {
  return typeof component === "string" ? component : fallback;
}

function resolveDefaultProps(
  defaultProps: HtmlPrimitiveDefaultProps | undefined,
  props: PrimitivePropsRecord,
  tagName: string
) {
  if (!defaultProps) {
    return {};
  }

  return typeof defaultProps === "function"
    ? defaultProps(props, tagName)
    : defaultProps;
}

function mergeDefinedProps(
  defaults: PrimitivePropsRecord,
  props: PrimitivePropsRecord
) {
  const merged = { ...defaults };

  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged;
}

function mergeTokenList(
  currentValue: unknown,
  requiredTokens: readonly string[]
) {
  const tokens = new Set<string>(requiredTokens);

  if (typeof currentValue === "string") {
    for (const token of currentValue.split(/\s+/u)) {
      if (token) {
        tokens.add(token);
      }
    }
  }

  return Array.from(tokens).join(" ");
}

export function withSafeBlankTargetRel(props: PrimitivePropsRecord) {
  if (props.target !== "_blank") {
    return props;
  }

  return {
    ...props,
    rel: mergeTokenList(props.rel, ["noopener", "noreferrer"]),
  };
}

export function createNativeDefaultProps(
  nativeTagName: string,
  defaults: PrimitivePropsRecord
) {
  return (_props: PrimitivePropsRecord, tagName: string) => {
    if (tagName !== nativeTagName) {
      return {};
    }

    return defaults;
  };
}

export function createHtmlPrimitive<TDefaultElement extends PrimitiveElement>(
  displayName: string,
  defaultElement: TDefaultElement,
  options: HtmlPrimitiveOptions = {}
) {
  const defaultTagName = String(defaultElement);

  const primitive = React.forwardRef<unknown, { as?: PrimitiveElement }>(
    (inputProps, ref) => {
      const {
        as: Component = defaultElement,
        children,
        ...rest
      } = inputProps as {
        as?: PrimitiveElement;
        children?: React.ReactNode;
        [key: string]: unknown;
      };
      const tagName = getTagName(Component, defaultTagName);
      const defaults = resolveDefaultProps(options.defaultProps, rest, tagName);
      const mergedProps = mergeDefinedProps(defaults, rest);
      const preparedProps =
        options.prepareProps?.(mergedProps, tagName) ?? mergedProps;
      const analyticsProps = withAnalyticsAttributes(preparedProps);
      const dataComponent = analyticsProps["data-component"] ?? displayName;
      const dataSlot = analyticsProps["data-slot"] ?? "root";
      const elementProps = {
        ...analyticsProps,
        "data-component": dataComponent,
        "data-slot": dataSlot,
        ref,
      };

      if (typeof Component === "string" && voidHtmlElements.has(Component)) {
        return React.createElement(Component, elementProps);
      }

      return React.createElement(Component, elementProps, children);
    }
  );

  primitive.displayName = displayName;

  return primitive as HtmlPrimitiveComponent<TDefaultElement>;
}
