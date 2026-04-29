import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Option } from "..";

it("renders an option element with attributes", () => {
  render(
    <select>
      <Option data-testid="el" value="v" label="L">
        L
      </Option>
    </select>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("OPTION");
  expect(el).toHaveAttribute("value", "v");
  expect(el).toHaveTextContent("L");
});
