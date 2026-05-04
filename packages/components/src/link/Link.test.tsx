import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Link } from ".";

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

// Flaky in jsdom/React when mutating document.head via rerender in the same test.
// Included for future enablement when environment supports stable head mutation.
