import React from "react";

import { existsSync } from "node:fs";
import { join } from "node:path";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  EXCLUDED_HTML_ELEMENTS,
  STABLE_HTML_ELEMENTS,
} from "../element-metadata";
import * as Components from "../index";

const componentExports = Components as unknown as Record<
  string,
  React.ElementType & { displayName?: string }
>;

const foldedHeadingComponentNames = ["H1", "H2", "H3", "H4", "H5", "H6"];
const headingTagNames = ["h1", "h2", "h3", "h4", "h5", "h6"];
const uniqueStableComponents = [
  ...new Map(
    STABLE_HTML_ELEMENTS.map((element) => [element.componentName, element])
  ).values(),
];

function toComponentName(tagName: string) {
  return `${tagName.charAt(0).toUpperCase()}${tagName.slice(1)}`;
}

describe("stable MDN HTML element contract", () => {
  it.each(uniqueStableComponents)(
    "keeps $componentName files, barrels, exports, and primitive behavior",
    ({ componentName, folderName }) => {
      const componentPath = join(
        process.cwd(),
        "src",
        folderName,
        `${componentName}.tsx`
      );
      const barrelPath = join(process.cwd(), "src", folderName, "index.ts");
      const Component = componentExports[componentName];
      const ref = React.createRef<HTMLDivElement>();

      expect(existsSync(componentPath)).toBe(true);
      expect(existsSync(barrelPath)).toBe(true);
      expect(Component).toBeDefined();
      if (!Component) {
        throw new Error(`Missing ${componentName} export`);
      }
      expect(Component.displayName).toBe(componentName);

      render(
        React.createElement(
          Component,
          {
            as: "div",
            analytics: {
              campaignId: 42,
              enabled: true,
              event: "contract_render",
              ignored: null,
              placement: "test-suite",
            },
            className: "contract-class",
            "data-component": "CustomComponent",
            "data-slot": "custom-slot",
            "data-testid": componentName,
            ref,
          },
          "Contract content"
        )
      );

      const element = screen.getByTestId(componentName);
      expect(element.tagName).toBe("DIV");
      expect(element).toHaveClass("contract-class");
      expect(element).toHaveAttribute("data-component", "CustomComponent");
      expect(element).toHaveAttribute("data-slot", "custom-slot");
      expect(element).toHaveAttribute(
        "data-analytics-event",
        "contract_render"
      );
      expect(element).toHaveAttribute("data-analytics-placement", "test-suite");
      expect(element).toHaveAttribute("data-analytics-campaign-id", "42");
      expect(element).toHaveAttribute("data-analytics-enabled", "true");
      expect(element).not.toHaveAttribute("data-analytics-ignored");
      expect(element).not.toHaveAttribute("analytics");
      expect(element).toHaveTextContent("Contract content");
      expect(ref.current).toBe(element);
    }
  );

  it("does not export deprecated, obsolete, or experimental wrappers", () => {
    for (const tagName of EXCLUDED_HTML_ELEMENTS) {
      const componentName = toComponentName(tagName);
      expect(componentExports).not.toHaveProperty(componentName);
    }
  });

  it("maps h1 through h6 metadata to Heading instead of per-level wrappers", () => {
    const headingElements = STABLE_HTML_ELEMENTS.filter(({ tagName }) =>
      headingTagNames.includes(tagName)
    );

    expect(headingElements.map(({ tagName }) => tagName)).toEqual(
      headingTagNames
    );

    for (const element of headingElements) {
      expect(element.componentName).toBe("Heading");
      expect(element.folderName).toBe("heading");
    }

    for (const componentName of foldedHeadingComponentNames) {
      expect(componentExports).not.toHaveProperty(componentName);
    }
  });
});
