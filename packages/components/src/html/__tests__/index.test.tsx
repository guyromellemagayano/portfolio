import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Html } from "..";

it("renders into document.documentElement (lang attr set)", () => {
  render(<Html lang="en" />, {
    container: document.documentElement as unknown as HTMLElement,
  });
  expect(document.documentElement.getAttribute("lang")).toBe("en");
});

it("toggles lang and dir across rerenders", () => {
  const { rerender } = render(<Html lang="en" dir="ltr" />, {
    container: document.documentElement as unknown as HTMLElement,
  });
  expect(document.documentElement.getAttribute("lang")).toBe("en");
  expect(document.documentElement.getAttribute("dir")).toBe("ltr");
  rerender(<Html lang="fr" dir="rtl" />);
  expect(document.documentElement.getAttribute("lang")).toBe("fr");
  expect(document.documentElement.getAttribute("dir")).toBe("rtl");
});

it("supports 'as' to render alternative root (div)", () => {
  const { container } = render(<Html as="div" data-testid="el" />);
  expect((container.firstChild as HTMLElement).tagName).toBe("DIV");
});

it.skip("adds dev debug attributes in development (documentElement)", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Html data-testid="dbg" />, {
    container: document.documentElement as unknown as HTMLElement,
  });
  expect(document.documentElement.getAttribute("data-component")).toBe("Html");
  expect(document.documentElement.getAttribute("data-as")).toBe("html");
  process.env.NODE_ENV = original;
});
