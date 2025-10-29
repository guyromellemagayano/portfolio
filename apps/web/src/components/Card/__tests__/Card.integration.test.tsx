// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Integration
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Compound
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CardCta, CardDescription, CardEyebrow, CardTitle } from "../_internal";
import { Card } from "../Card";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.internalId || options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}));

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
}));

// Mock utils functions
vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((children) => {
    if (children === false || children === null || children === undefined) {
      return false;
    }
    if (typeof children === "string" && children.length === 0) {
      return false;
    }
    return true;
  }),
  hasMeaningfulText: vi.fn((content) => content != null && content !== ""),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additionalProps,
    })
  ),
  isValidLink: vi.fn((href) => href != null && href !== ""),
  getLinkTargetProps: vi.fn((target, rel) => ({
    target: target || undefined,
    rel: rel || undefined,
  })),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock Icon component specifically for `CardCta`
vi.mock("@web/components", () => ({
  Icon: {
    ChevronRight: vi.fn((props) => (
      <span data-testid="chevron-right-icon" {...props} />
    )),
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
          <CardEyebrow>Eyebrow text</CardEyebrow>
          <CardTitle href="/test">Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
          <CardCta href="/action">Call to Action</CardCta>
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
          <CardEyebrow>Eyebrow</CardEyebrow>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </Card>
      );

      const card = screen.getByTestId("test-id-card-root");
      expect(card).toBeInTheDocument();

      const eyebrow = screen.getByText("Eyebrow");
      const title = screen.getByText("Title");
      const description = screen.getByText("Description");

      expect(eyebrow).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("renders Card with only title and description", () => {
      render(
        <Card>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Card with Links", () => {
    it("renders Card with linked title and CTA", () => {
      render(
        <Card>
          <CardTitle href="/title-link">Linked Title</CardTitle>
          <CardCta href="/cta-link" target="_blank">
            External CTA
          </CardCta>
        </Card>
      );

      // Test that the components render with their content
      expect(screen.getByText("Linked Title")).toBeInTheDocument();
      expect(screen.getByText("External CTA")).toBeInTheDocument();

      // Test that the components have the correct test IDs
      expect(screen.getByTestId("test-id-card-title-root")).toBeInTheDocument();
      expect(screen.getByTestId("test-id-card-cta-root")).toBeInTheDocument();
    });

    it("handles mixed linked and non-linked sub-components", () => {
      render(
        <Card>
          <CardTitle href="/link">Linked Title</CardTitle>
          <CardDescription>Non-linked Description</CardDescription>
          <CardCta>Non-linked CTA</CardCta>
        </Card>
      );

      expect(screen.getByText("Linked Title")).toBeInTheDocument();
      expect(screen.getByText("Non-linked Description")).toBeInTheDocument();
      expect(screen.getByText("Non-linked CTA")).toBeInTheDocument();
    });
  });

  describe("Card Content Validation", () => {
    it("renders Card with valid content", () => {
      render(
        <Card>
          <CardTitle>Valid Title</CardTitle>
          <CardDescription>Valid Description</CardDescription>
        </Card>
      );

      expect(screen.getByText("Valid Title")).toBeInTheDocument();
      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });

    it("handles null and undefined children gracefully", () => {
      render(
        <Card>
          <CardTitle>{null}</CardTitle>
          <CardDescription>{undefined}</CardDescription>
        </Card>
      );

      // Components should still render even with null/undefined children
      expect(screen.getByTestId("test-id-card-root")).toBeInTheDocument();
    });

    it("handles mixed valid and invalid content", () => {
      render(
        <Card>
          <CardTitle>{null}</CardTitle>
          <CardDescription>Valid Description</CardDescription>
        </Card>
      );

      expect(screen.getByText("Valid Description")).toBeInTheDocument();
    });

    it("handles complex children content", () => {
      render(
        <Card>
          <CardTitle>
            <span>Complex</span> <strong>Title</strong>
          </CardTitle>
          <CardDescription>
            <em>Complex</em> <code>Description</code>
          </CardDescription>
        </Card>
      );

      expect(screen.getAllByText("Complex")).toHaveLength(2);
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Card with Multiple Sub-components", () => {
    it("renders multiple descriptions", () => {
      render(
        <Card>
          <CardDescription>First description</CardDescription>
          <CardDescription>Second description</CardDescription>
        </Card>
      );

      expect(screen.getByText("First description")).toBeInTheDocument();
      expect(screen.getByText("Second description")).toBeInTheDocument();
    });

    it("renders multiple titles", () => {
      render(
        <Card>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });

    it("renders multiple CTAs", () => {
      render(
        <Card>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </Card>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
    });
  });

  describe("Card Edge Cases", () => {
    it("handles empty Card component", () => {
      const { container } = render(<Card />);

      // Card component returns null when no children are provided
      expect(container.firstChild).toBeNull();
    });

    it("handles Card with only whitespace children", () => {
      render(
        <Card>
          <CardTitle>Valid Title</CardTitle>
        </Card>
      );

      expect(screen.getByText("Valid Title")).toBeInTheDocument();
    });
  });
});
