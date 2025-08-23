import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedPictureClient, PictureClient } from "../index.client";

it("renders a picture element (client)", () => {
  render(
    <PictureClient data-testid="el">
      <img src="/a.jpg" alt="a" />
    </PictureClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("PICTURE");
});

it("renders a memoized picture element (client)", () => {
  render(
    <MemoizedPictureClient data-testid="el">
      <img src="/b.jpg" alt="b" />
    </MemoizedPictureClient>
  );
  expect(screen.getByTestId("el").tagName).toBe("PICTURE");
});
