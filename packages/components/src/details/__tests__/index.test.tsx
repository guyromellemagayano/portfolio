import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Details } from "..";

it("renders a details element with summary/content", () => {
  render(
    <Details data-testid="el">
      <summary>Sum</summary>
      Content
    </Details>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DETAILS");
  expect(el.querySelector("summary")).toBeInTheDocument();
});

it("supports 'as' prop", () => {
  render(
    <Details as="div" data-testid="el">
      <summary>Sum</summary>
    </Details>
  );
  expect(screen.getByTestId("el").tagName).toBe("DIV");
});

it("hydrates client when isClient is true", async () => {
  render(
    <Details isClient data-testid="el">
      <summary>Sum</summary>
    </Details>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("DETAILS");
  await screen.findByTestId("el");
});
