import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Rt } from "..";

it("renders an rt element inside ruby", () => {
  render(
    <ruby>
      漢<rt data-testid="native">kan</rt>
    </ruby>
  );
  const el = screen.getByTestId("native");
  expect(el.tagName).toBe("RT");
  expect(el).toHaveTextContent("kan");
});

it("renders Rt component inside ruby", () => {
  render(
    <ruby>
      漢<Rt data-testid="el">kan</Rt>
    </ruby>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("RT");
  expect(el).toHaveTextContent("kan");
});
