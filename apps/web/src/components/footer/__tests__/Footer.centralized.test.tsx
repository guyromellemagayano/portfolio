import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Footer } from "../Footer";

// ============================================================================
// SIMPLE MOCK TEST
// ============================================================================

/**
 * This test demonstrates a simpler mocking approach that avoids
 * the IntersectionObserver issues by mocking components directly.
 */

// Mock the internal components
vi.mock("../internal/FooterLegal", () => ({
  FooterLegal: vi.fn(({ children, ...props }) => (
    <p data-testid="mock-footer-legal" {...props}>
      {children || "&copy; 2024 Guy Romelle Magayano. All rights reserved."}
    </p>
  )),
}));

vi.mock("../internal/FooterNavigation", () => ({
  FooterNavigation: vi.fn(({ children, ...props }) => (
    <nav data-testid="mock-footer-navigation" {...props}>
      {children || (
        <>
          <a href="/about">About</a>
          <a href="/articles">Articles</a>
          <a href="/projects">Projects</a>
          <a href="/speaking">Speaking</a>
          <a href="/uses">Uses</a>
        </>
      )}
    </nav>
  )),
}));

// Mock Container components
vi.mock("@web/components", () => ({
  ContainerInner: vi.fn(({ children, ...props }) => (
    <div data-testid="mock-container-inner" {...props}>
      {children}
    </div>
  )),
  ContainerOuter: vi.fn(({ children, ...props }) => (
    <div data-testid="mock-container-outer" {...props}>
      {children}
    </div>
  )),
}));

// Mock utilities
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ debugId, debugMode = false } = {}) => ({
    componentId: debugId || "test-id",
    isDebugMode: debugMode,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn((id, componentType, debugMode) => ({
    [`data-${componentType}-id`]: `${id}-${componentType}`,
    "data-debug-mode": debugMode ? "true" : undefined,
  })),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock data
vi.mock("../data", () => ({
  FooterComponentLabels: {},
}));

describe("Footer - Simple Mocks", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders footer with default content using simple mocks", () => {
      render(<Footer />);

      // Test that the main footer element is rendered
      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("mt-32", "flex-none");

      // Test that mocked components are rendered
      expect(screen.getByTestId("mock-container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("mock-container-inner")).toBeInTheDocument();
      expect(screen.getByTestId("mock-footer-navigation")).toBeInTheDocument();
      expect(screen.getByTestId("mock-footer-legal")).toBeInTheDocument();
    });

    it("renders with default legal text from simple mocks", () => {
      render(<Footer />);

      expect(
        screen.getByText(
          "&copy; 2024 Guy Romelle Magayano. All rights reserved."
        )
      ).toBeInTheDocument();
    });

    it("renders with default navigation links from simple mocks", () => {
      render(<Footer />);

      expect(screen.getByText("About")).toBeInTheDocument();
      expect(screen.getByText("Articles")).toBeInTheDocument();
      expect(screen.getByText("Projects")).toBeInTheDocument();
      expect(screen.getByText("Speaking")).toBeInTheDocument();
      expect(screen.getByText("Uses")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("renders with debug mode enabled using simple mocks", () => {
      render(<Footer debugId="test-id" debugMode />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not render debug mode when disabled using simple mocks", () => {
      render(<Footer debugId="test-id" debugMode={false} />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders as footer element using simple mocks", () => {
      render(<Footer />);

      const footer = screen.getByRole("contentinfo");
      expect(footer.tagName).toBe("FOOTER");
    });

    it("renders with proper container structure using simple mocks", () => {
      render(<Footer />);

      expect(screen.getByTestId("mock-container-outer")).toBeInTheDocument();
      expect(screen.getByTestId("mock-container-inner")).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("works with other components using simple mocks", () => {
      render(
        <div>
          <Footer debugId="footer-1" />
          <Footer debugId="footer-2" />
        </div>
      );

      const footers = screen.getAllByRole("contentinfo");
      expect(footers).toHaveLength(2);
    });
  });
});
