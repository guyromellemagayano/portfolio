import { render, screen } from "@testing-library/react";

import { Section } from "../Section";

// ============================================================================
// SECTION CLIENT COMPONENT TESTS
// ============================================================================

describe("Section Client Component", () => {
  it("renders with client features enabled", () => {
    render(
      <Section isClient title="Test Section">
        <p>Test content</p>
      </Section>
    );

    expect(screen.getByTestId("section-root")).toBeInTheDocument();
    expect(screen.getByText("Test Section")).toBeInTheDocument();
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("renders with memoization enabled", () => {
    render(
      <Section isClient isMemoized title="Memoized Section">
        <p>Memoized content</p>
      </Section>
    );

    expect(screen.getByTestId("section-root")).toBeInTheDocument();
    expect(screen.getByText("Memoized Section")).toBeInTheDocument();
    expect(screen.getByText("Memoized content")).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    render(
      <Section isClient className="custom-class" title="Custom Section">
        <p>Content</p>
      </Section>
    );

    const sectionElement = screen.getByTestId("section-root");
    expect(sectionElement).toHaveClass("custom-class");
  });

  it("renders with debug mode enabled", () => {
    render(
      <Section isClient _debugMode title="Debug Section">
        <p>Debug content</p>
      </Section>
    );

    const sectionElement = screen.getByTestId("section-root");
    expect(sectionElement).toHaveAttribute("data-debug-mode", "true");
  });

  it("renders without title when not provided", () => {
    render(
      <Section isClient>
        <p>Content without title</p>
      </Section>
    );

    expect(screen.getByTestId("section-root")).toBeInTheDocument();
    expect(screen.getByText("Content without title")).toBeInTheDocument();
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
