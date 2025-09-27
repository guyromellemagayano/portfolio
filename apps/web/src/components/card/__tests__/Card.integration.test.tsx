import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Card from "../Card";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid":
        additionalProps["data-testid"] || `${id}-${componentType}-root`,
      ...additionalProps,
    })
  ),
}));

vi.mock("@web/lib", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock component utilities
vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Card sub-components are mocked globally in test-setup.ts

// Mock CSS modules
vi.mock("../Card.module.css", () => ({
  default: {
    card: "card",
  },
}));

describe("Card Integration Tests", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Card with Sub-components", () => {
    it("renders Card with all sub-components", () => {
      render(
        <Card>
          <Card.Eyebrow>Eyebrow text</Card.Eyebrow>
          <Card.Title href="/test">Card Title</Card.Title>
          <Card.Description>Card description text</Card.Description>
          <Card.Cta href="/action">Call to Action</Card.Cta>
        </Card>
      );

      expect(screen.getByText("Eyebrow text")).toBeInTheDocument();
      expect(screen.getByText("Card Title")).toBeInTheDocument();
      expect(screen.getByText("Card description text")).toBeInTheDocument();
      expect(screen.getByText("Call to Action")).toBeInTheDocument();
    });

    it("maintains proper component hierarchy", () => {
      render(
        <Card>
          <Card.Eyebrow>Eyebrow</Card.Eyebrow>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
      const eyebrow = screen.getByText("Eyebrow");
      const title = screen.getByText("Title");
      const description = screen.getByText("Description");

      expect(card).toContainElement(eyebrow);
      expect(card).toContainElement(title);
      expect(card).toContainElement(description);
    });

    it("renders sub-components within Card", () => {
      render(
        <Card debugId="parent-card" debugMode={true}>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      // The sub-components are rendered within the Card
      const title = screen.getByTestId("mock-card-title");
      const description = screen.getByTestId("mock-card-description");

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
      expect(title).toHaveTextContent("Title");
      expect(description).toHaveTextContent("Description");
    });
  });

  describe("Card with Links", () => {
    it("renders Card with linked title and CTA", () => {
      render(
        <Card>
          <Card.Title href="/title-link">Linked Title</Card.Title>
          <Card.Cta href="/cta-link" target="_blank">
            External CTA
          </Card.Cta>
        </Card>
      );

      // Test that the components render with their content
      expect(screen.getByText("Linked Title")).toBeInTheDocument();
      expect(screen.getByText("External CTA")).toBeInTheDocument();

      // Test that the components have the correct test IDs
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });

    it("handles mixed linked and non-linked sub-components", () => {
      render(
        <Card>
          <Card.Title href="/link">Linked Title</Card.Title>
          <Card.Description>Non-linked Description</Card.Description>
          <Card.Cta>Non-linked CTA</Card.Cta>
        </Card>
      );

      // Test that all components render
      expect(screen.getByText("Linked Title")).toBeInTheDocument();
      expect(screen.getByText("Non-linked Description")).toBeInTheDocument();
      expect(screen.getByText("Non-linked CTA")).toBeInTheDocument();

      // Test that the components have the correct test IDs
      expect(screen.getByTestId("mock-card-title")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-description")).toBeInTheDocument();
      expect(screen.getByTestId("mock-card-cta")).toBeInTheDocument();
    });
  });

  describe("Card Content Validation Integration", () => {
    it("renders Card when sub-components have valid content", () => {
      render(
        <Card>
          <Card.Title>Valid Title</Card.Title>
          <Card.Description>Valid Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });

    it("renders Card even when sub-components have invalid content", () => {
      render(
        <Card>
          <Card.Title>{null}</Card.Title>
          <Card.Description>{undefined}</Card.Description>
        </Card>
      );

      // Card should still render because it has children (the sub-components themselves)
      expect(screen.getByTestId("test-id-card-root")).toBeInTheDocument();
    });

    it("renders Card when at least one sub-component has valid content", () => {
      render(
        <Card>
          <Card.Title>{null}</Card.Title>
          <Card.Description>Valid Description</Card.Description>
        </Card>
      );

      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });
  });

  describe("Card with Complex Content", () => {
    it("handles nested HTML elements in sub-components", () => {
      render(
        <Card>
          <Card.Title>
            <strong>Bold Title</strong> with <em>emphasis</em>
          </Card.Title>
          <Card.Description>
            <p>
              Paragraph with <a href="/link">link</a>
            </p>
          </Card.Description>
        </Card>
      );

      expect(screen.getByText("Bold Title")).toBeInTheDocument();
      expect(screen.getByText("emphasis")).toBeInTheDocument();
      expect(screen.getByText("link")).toBeInTheDocument();
    });

    it("handles multiple instances of same sub-component", () => {
      render(
        <Card>
          <Card.Description>First description</Card.Description>
          <Card.Description>Second description</Card.Description>
        </Card>
      );

      expect(screen.getByText("First description")).toBeInTheDocument();
      expect(screen.getByText("Second description")).toBeInTheDocument();
    });
  });

  describe("Card Performance Integration", () => {
    it("maintains memoization across sub-component updates", () => {
      const { rerender } = render(
        <Card isMemoized={true}>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const initialCard = screen.getByTestId("test-id-card-root");

      // Re-render with same props
      rerender(
        <Card isMemoized={true}>
          <Card.Title>Title</Card.Title>
          <Card.Description>Description</Card.Description>
        </Card>
      );

      const rerenderedCard = screen.getByTestId("test-id-card-root");
      expect(rerenderedCard).toBe(initialCard);
    });
  });

  describe("Card Error Handling", () => {
    it("handles invalid props gracefully", () => {
      render(
        <Card>
          <Card.Title>Valid Title</Card.Title>
          <div>Additional content</div>
        </Card>
      );

      // Card should render all valid content
      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Additional content")).toBeInTheDocument();
    });
  });
});
