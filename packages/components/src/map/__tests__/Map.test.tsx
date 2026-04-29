import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { Map } from "..";

it("renders a map element with name and areas", () => {
  render(
    <Map data-testid="el" name="img-map">
      <area shape="rect" coords="0,0,10,10" href="#a" />
    </Map>
  );
  const el = screen.getByTestId("el");
  expect(el.tagName).toBe("MAP");
  expect(el).toHaveAttribute("name", "img-map");
  expect(el.querySelector("area")).not.toBeNull();
});
