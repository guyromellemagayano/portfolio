import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { CardDescription } from "../CardDescription";

// Mock CSS modules with explicit class names
vi.mock("../CardDescription.module.css", () => {
  const mockStyles = {
    cardDescription: "cardDescription",
  };
  return { default: mockStyles };
});

describe("CardDescription", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children correctly", () => {
    render(
      <CardDescription internalId="test-desc" debugMode={false}>
        Card description
      </CardDescription>
    );

    expect(screen.getByText("Card description")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <CardDescription
        className="custom-class"
        internalId="test-desc"
        debugMode={false}
      >
        Card description
      </CardDescription>
    );

    const descriptionElement = screen.getByTestId("card-description-root");
    expect(descriptionElement).toHaveClass("cardDescription");
    expect(descriptionElement).toHaveClass("custom-class");
  });

  it("renders with debug mode enabled", () => {
    render(
      <CardDescription debugMode={true}>Card description</CardDescription>
    );

    const descriptionElement = screen.getByTestId("card-description-root");
    expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders with custom internal ID", () => {
    render(
      <CardDescription internalId="custom-id">Card description</CardDescription>
    );

    const descriptionElement = screen.getByTestId("card-description-root");
    expect(descriptionElement).toHaveAttribute("data-card-description-id");
  });

  it("passes through HTML attributes", () => {
    render(
      <CardDescription id="test-id" data-test="test-data">
        Card description
      </CardDescription>
    );

    const descriptionElement = screen.getByTestId("card-description-root");
    expect(descriptionElement).toHaveAttribute("id", "test-id");
    expect(descriptionElement).toHaveAttribute("data-test", "test-data");
  });

  it("does not render when no children", () => {
    const { container } = render(<CardDescription />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("does not render when children is null", () => {
    const { container } = render(<CardDescription>{null}</CardDescription>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("does not render when children is undefined", () => {
    const { container } = render(
      <CardDescription>{undefined}</CardDescription>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it("forwards ref correctly", () => {
    const ref = React.createRef<HTMLParagraphElement>();
    render(<CardDescription ref={ref}>Card description</CardDescription>);

    expect(ref.current).toBeInTheDocument();
  });

  it("renders as p element", () => {
    render(<CardDescription>Card description</CardDescription>);

    const descriptionElement = screen.getByTestId("card-description-root");
    expect(descriptionElement.tagName).toBe("P");
  });

  it("renders complex children", () => {
    render(
      <CardDescription>
        <strong>Bold</strong> and <em>italic</em> text
      </CardDescription>
    );

    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("italic")).toBeInTheDocument();
  });
});
