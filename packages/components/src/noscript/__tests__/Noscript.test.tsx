import { render } from "@testing-library/react";
import { expect, it } from "vitest";

import { Noscript } from "..";

it("renders a noscript block", () => {
  const { container } = render(
    <Noscript>
      <div>Text</div>
    </Noscript>
  );
  const node = container.querySelector("noscript");
  expect(node).not.toBeNull();
});
