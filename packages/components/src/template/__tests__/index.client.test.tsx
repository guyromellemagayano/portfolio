import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedTemplateClient, TemplateClient } from "../index.client";

it("renders a template element (client)", () => {
  render(
    <TemplateClient data-testid="el">
      <span>hidden</span>
    </TemplateClient>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TEMPLATE");
});

it("renders a memoized template element (client)", () => {
  render(
    <MemoizedTemplateClient data-testid="el">
      <span>hidden</span>
    </MemoizedTemplateClient>
  );
  const el = document.querySelector('[data-testid="el"]');
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TEMPLATE");
});
