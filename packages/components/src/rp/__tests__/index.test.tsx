import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Rp } from "..";

it("renders an rp element inside ruby", () => {
  render(
    <ruby>
      漢<rp>(</rp>
      <rt>kan</rt>
      <rp>)</rp>
    </ruby>
  );
  // query the first rp via selector
  const el = document.querySelector("ruby rp");
  expect(el).not.toBeNull();
  expect(el!.tagName).toBe("RP");
});

it("renders Rp component inside ruby", () => {
  render(
    <ruby>
      漢<Rp data-testid="el">(</Rp>
      <rt>kan</rt>
      <Rp>)</Rp>
    </ruby>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("RP");
  expect(el).toHaveTextContent("(");
});
