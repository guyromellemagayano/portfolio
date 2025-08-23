import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { HtmlClient, MemoizedHtmlClient } from "../index.client";

it("renders html with lang (client)", () => {
  render(<HtmlClient lang="fr" />, {
    container: document.documentElement as unknown as HTMLElement,
  });
  expect(document.documentElement.getAttribute("lang")).toBe("fr");
});

it("renders memoized html with lang (client)", () => {
  render(<MemoizedHtmlClient lang="de" />, {
    container: document.documentElement as unknown as HTMLElement,
  });
  expect(document.documentElement.getAttribute("lang")).toBe("de");
});
