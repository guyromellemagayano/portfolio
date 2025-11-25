import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Optgroup } from "..";

it("renders an optgroup element with label", () => {
  render(
    <select>
      <Optgroup data-testid="el" label="Group">
        <option>One</option>
      </Optgroup>
    </select>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("OPTGROUP");
  expect(el).toHaveAttribute("label", "Group");
});
