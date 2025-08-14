import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom";

// Mocks
const setThemeMock = vi.fn();
vi.mock("next-themes", () => ({
  useTheme: () => ({ resolvedTheme: "dark", setTheme: setThemeMock }),
}));

vi.mock("@guyromellemagayano/components", () => {
  const MockButton = React.forwardRef<HTMLButtonElement, any>((props, ref) => (
    <button ref={ref} data-testid="mock-button" {...props} />
  ));
  MockButton.displayName = "MockButton";
  const MockSvg = React.forwardRef<SVGSVGElement, any>((props, ref) => (
    <svg ref={ref} data-testid="mock-svg" {...props} />
  ));
  MockSvg.displayName = "MockSvg";
  return { Button: MockButton, Svg: MockSvg };
});

// Under test
import { HeaderThemeToggle as ThemeToggle } from "@web/components/header/_internal";

describe("Header ThemeToggle", () => {
  beforeEach(() => vi.clearAllMocks());
  afterEach(() => cleanup());

  it("calls setTheme with opposite theme on click", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByTestId("mock-button"));
    expect(setThemeMock).toHaveBeenCalledWith("light");
  });
});
