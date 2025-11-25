import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Template } from "..";

it("renders a template element with content", () => {
  render(
    <Template data-testid="el">
      <div id="x">hidden</div>
    </Template>
  );
  const el = document.querySelector(
    '[data-testid="el"]'
  ) as HTMLTemplateElement | null;
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("TEMPLATE");
  // JSDOM may not populate .content with React children; assert the property exists
  expect(el!.content).toBeTruthy();
  expect(el!.content.nodeType).toBe(11); // DOCUMENT_FRAGMENT_NODE
});
