import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import { MemoizedMeterClient, MeterClient } from "../index.client";

it("renders a meter element (client)", () => {
  render(<MeterClient data-testid="el" min={0} max={100} value={50} />);
  expect(screen.getByTestId("el").tagName).toBe("METER");
});

it("renders memoized meter element (client)", () => {
  render(<MemoizedMeterClient data-testid="el" min={0} max={1} value={0.5} />);
  expect(screen.getByTestId("el").tagName).toBe("METER");
});
