import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Html } from ".";

it("renders into document.documentElement (lang attr set)", () => {
  render(<Html lang="en" />, {
    container: document.documentElement as unknown as HTMLElement,
  });
  expect(document.documentElement).toHaveAttribute("lang", "en");
});

it("toggles lang and dir across rerenders", () => {
  const { rerender } = render(<Html lang="en" dir="ltr" />, {
    container: document.documentElement as unknown as HTMLElement,
  });
  expect(document.documentElement).toHaveAttribute("lang", "en");
  expect(document.documentElement).toHaveAttribute("dir", "ltr");
  rerender(<Html lang="fr" dir="rtl" />);
  expect(document.documentElement).toHaveAttribute("lang", "fr");
  expect(document.documentElement).toHaveAttribute("dir", "rtl");
});

it("supports 'as' to render alternative root (div)", () => {
  const { container } = render(<Html as="div" data-testid="el" />);
  expect((container.firstChild as HTMLElement).tagName).toBe("DIV");
});
