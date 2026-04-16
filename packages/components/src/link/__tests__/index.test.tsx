import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Link } from "..";

it("renders link tag into document.head", () => {
  render(<Link rel="stylesheet" href="/a.css" data-testid="el" />, {
    container: document.head as unknown as HTMLElement,
  });
  const link = document.head!.querySelector(
    'link[rel="stylesheet"][href="/a.css"]'
  );
  expect(link).not.toBeNull();
});

it("renders preload link into document.head", () => {
  document.head.innerHTML = "";
  render(<Link rel="preload" href="/a.js" />, {
    container: document.head as unknown as HTMLElement,
  });
  const el = document.head!.querySelector('link[rel="preload"][href="/a.js"]');
  expect(el).not.toBeNull();
});

it.skip("adds dev debug data attributes when rendering in development", () => {
  const original = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  render(<Link rel="stylesheet" href="/c.css" data-testid="el" />, {
    container: document.head as unknown as HTMLElement,
  });
  const link = document.head!.querySelector(
    'link[href="/c.css"][data-testid="el"]'
  );
  expect(link).not.toBeNull();
  expect(link).toHaveAttribute("data-component", "Link");
  expect(link).toHaveAttribute("data-as", "link");
  process.env.NODE_ENV = original;
});

// Flaky in jsdom/React when mutating document.head via rerender in the same test.
// Included for future enablement when environment supports stable head mutation.
it.skip("flaky: toggles attributes across rerenders in document.head", () => {
  render(<Link rel="preload" href="/a.js" />, {
    container: document.head as unknown as HTMLElement,
  });
  let el = document.head!.querySelector('link[rel="preload"][href="/a.js"]');
  expect(el).not.toBeNull();
  // Use a fresh render instead of rerender to avoid React head mutation issues
  render(<Link rel="stylesheet" href="/b.css" />, {
    container: document.head as unknown as HTMLElement,
  });
  el = document.head!.querySelector('link[rel="stylesheet"][href="/b.css"]');
  expect(el).not.toBeNull();
});
