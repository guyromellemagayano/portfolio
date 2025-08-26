import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { CardEyebrow } from "../CardEyebrow";

// Mock CSS modules with explicit class names
vi.mock("../CardEyebrow.module.css", () => {
  const mockStyles = {
    cardEyebrow: "cardEyebrow",
    cardEyebrowDecorated: "cardEyebrowDecorated",
    cardEyebrowDecoratorWrapper: "cardEyebrowDecoratorWrapper",
    cardEyebrowDecorator: "cardEyebrowDecorator",
  };
  return { default: mockStyles };
});

describe("CardEyebrow", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(
      <CardEyebrow internalId="test-eyebrow" debugMode={false}>
        Eyebrow text
      </CardEyebrow>
    );

    expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <CardEyebrow
        internalId="test-eyebrow"
        debugMode={false}
        className="custom-class"
      >
        Eyebrow
      </CardEyebrow>
    );

    const eyebrow = screen.getByTestId("card-eyebrow-root");
    expect(eyebrow).toHaveClass("custom-class");
  });

  it("renders with decoration when decorate is true", () => {
    render(
      <CardEyebrow internalId="test-eyebrow" debugMode={false} decorate>
        Eyebrow text
      </CardEyebrow>
    );

    const eyebrow = screen.getByTestId("card-eyebrow-root");
    expect(eyebrow).toHaveClass("cardEyebrowDecorated");
  });

  it("renders with debug mode enabled", () => {
    render(
      <CardEyebrow internalId="test-eyebrow" debugMode={true}>
        Eyebrow
      </CardEyebrow>
    );

    const eyebrow = screen.getByTestId("card-eyebrow-root");
    expect(eyebrow).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders with custom internal ID", () => {
    render(
      <CardEyebrow internalId="custom-id" debugMode={false}>
        Eyebrow
      </CardEyebrow>
    );

    const eyebrow = screen.getByTestId("card-eyebrow-root");
    expect(eyebrow).toHaveAttribute("data-card-eyebrow-id");
  });

  it("renders empty element when no children", () => {
    const { container } = render(
      <CardEyebrow internalId="test-eyebrow" debugMode={false} />
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P");
    expect(element.textContent).toBe("");
  });

  it("renders empty element when children is null", () => {
    const { container } = render(
      <CardEyebrow internalId="test-eyebrow" debugMode={false}>
        {null}
      </CardEyebrow>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P");
    expect(element.textContent).toBe("");
  });

  it("renders empty element when children is undefined", () => {
    const { container } = render(
      <CardEyebrow internalId="test-eyebrow" debugMode={false}>
        {undefined}
      </CardEyebrow>
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe("P");
    expect(element.textContent).toBe("");
  });
});
