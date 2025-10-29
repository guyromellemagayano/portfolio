// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ToolListItem } from "../ToolListItem";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  isValidLink: vi.fn((href) => {
    return href && href !== "" && href !== "#";
  }),
  getLinkTargetProps: vi.fn((href, target) => {
    if (target === "_blank" && href?.startsWith("http")) {
      return { rel: "noopener noreferrer", target };
    }
    return { target };
  }),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
  createComponentProps: vi.fn((id, suffix, debugMode) => ({
    "data-testid": `${id}-${suffix}-root`,
    "data-debug-mode": debugMode ? "true" : undefined,
  })),
}));

// Mock Card component
vi.mock("@web/components", () => {
  const MockCard = vi.fn(
    ({ children, as, role, debugId, debugMode, ...props }) => (
      <div
        data-testid={`${debugId || "test-id"}-card-root`}
        data-as={as}
        data-role={role}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        {children}
      </div>
    )
  ) as any;

  MockCard.Title = vi.fn(
    ({
      children,
      as,
      href,
      target,
      rel,
      title,
      debugId,
      debugMode,
      ...props
    }) => (
      <h3
        data-testid={`${debugId || "test-id"}-card-title-root`}
        data-as={as}
        data-href={href}
        data-target={target}
        data-rel={rel}
        data-title={title}
        data-debug-mode={debugMode ? "true" : undefined}
        {...props}
      >
        {children}
      </h3>
    )
  );

  MockCard.Description = vi.fn(({ children, debugId, debugMode, ...props }) => (
    <div
      data-testid={`${debugId || "test-id"}-card-description-root`}
      data-debug-mode={debugMode ? "true" : undefined}
      {...props}
    >
      {children}
    </div>
  ));

  return {
    Card: MockCard,
  };
});

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: React.forwardRef<HTMLAnchorElement, any>(
    function MockNextLink(props, ref) {
      const { href, target, title, children, ...rest } = props;
      return (
        <a
          ref={ref}
          href={href}
          target={target}
          title={title}
          data-testid="next-link"
          {...rest}
        >
          {children}
        </a>
      );
    }
  ),
}));

describe("ToolListItem", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children and title correctly", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      expect(screen.getByText("Test Tool")).toBeInTheDocument();
      expect(screen.getByText("Tool description")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <ToolListItem title="Test Tool" className="custom-class" href="/test">
          Tool description
        </ToolListItem>
      );

      const cardElement = screen.getByTestId("test-id-card-root");
      expect(cardElement).toHaveAttribute("class");
    });

    it("passes through HTML attributes", () => {
      render(
        <ToolListItem title="Test Tool" href="/test" aria-label="Tool item">
          Tool description
        </ToolListItem>
      );

      const cardElement = screen.getByTestId("test-id-card-root");
      expect(cardElement).toHaveAttribute("aria-label", "Tool item");
    });
  });

  describe("Link Functionality", () => {
    it("renders with link when href is provided and valid", () => {
      render(
        <ToolListItem title="Test Tool" href="/test-link">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-as", "h3");
      expect(titleElement).toHaveAttribute("data-href", "/test-link");
    });

    it("renders without link when href is not valid", () => {
      render(
        <ToolListItem title="Test Tool" href="#">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-as", "h3");
      expect(titleElement).toHaveAttribute("data-href", "");
    });

    it("passes through link attributes", () => {
      render(
        <ToolListItem title="Test Tool" href="/test" target="_blank">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-as", "h3");
      expect(titleElement).toHaveAttribute("data-href", "/test");
      expect(titleElement).toHaveAttribute("data-target", "_blank");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(
        <ToolListItem title="Test Tool" href="/test" />
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when no title", () => {
      const { container } = render(
        <ToolListItem href="/test">Tool description</ToolListItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("does not render when both children and title are missing", () => {
      const { container } = render(<ToolListItem href="/test" />);
      expect(container.firstChild).toBeNull();
    });

    it("renders when both children and title are provided", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      expect(screen.getByText("Test Tool")).toBeInTheDocument();
      expect(screen.getByText("Tool description")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <ToolListItem title="Test Tool" debugMode={true} href="/test">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(titleElement).toHaveAttribute("data-debug-mode", "true");
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled/undefined", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(titleElement).not.toHaveAttribute("data-debug-mode");
      expect(descriptionElement).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders Card as li element with listitem role", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const cardElement = screen.getByTestId("test-id-card-root");
      expect(cardElement).toHaveAttribute("data-as", "li");
      expect(cardElement).toHaveAttribute("data-role", "listitem");
    });

    it("renders Card.Title as h3 element", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-as", "h3");
    });

    it("renders Card.Description", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toBeInTheDocument();
    });

    it("applies CSS classes", () => {
      render(
        <ToolListItem title="Test Tool" href="/test" className="test-class">
          Tool description
        </ToolListItem>
      );

      const cardElement = screen.getByTestId("test-id-card-root");
      expect(cardElement).toHaveAttribute("class");
    });
  });

  describe("Component ID", () => {
    it("renders with custom debugId", () => {
      render(
        <ToolListItem debugId="custom-id" title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("custom-id-card-title-root");
      const descriptionElement = screen.getByTestId(
        "custom-id-card-description-root"
      );
      expect(titleElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-title-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "custom-id-card-description-root"
      );
    });

    it("uses provided debugId when available", () => {
      render(
        <ToolListItem debugId="test-id" title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(titleElement).toHaveAttribute(
        "data-testid",
        "test-id-card-title-root"
      );
      expect(descriptionElement).toHaveAttribute(
        "data-testid",
        "test-id-card-description-root"
      );
    });
  });

  describe("Card Integration", () => {
    it("renders Card.Title with correct props", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-as", "h3");
      expect(titleElement).toHaveAttribute("data-href", "/test");
      expect(titleElement).toHaveAttribute("data-title", "Test Tool");
    });

    it("renders Card.Description with correct props", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          Tool description
        </ToolListItem>
      );

      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(descriptionElement).toBeInTheDocument();
      expect(descriptionElement).toHaveTextContent("Tool description");
    });

    it("passes debugId and debugMode to Card components", () => {
      render(
        <ToolListItem
          debugId="custom-id"
          debugMode={true}
          title="Test Tool"
          href="/test"
        >
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("custom-id-card-title-root");
      const descriptionElement = screen.getByTestId(
        "custom-id-card-description-root"
      );
      expect(titleElement).toHaveAttribute("data-debug-mode", "true");
      expect(descriptionElement).toHaveAttribute("data-debug-mode", "true");
    });
  });

  describe("Link Props Handling", () => {
    it("handles valid href correctly", () => {
      render(
        <ToolListItem title="Test Tool" href="/valid-link">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-href", "/valid-link");
      expect(screen.getByText("Test Tool")).toBeInTheDocument();
      expect(screen.getByText("Tool description")).toBeInTheDocument();
    });

    it("handles invalid href correctly", () => {
      render(
        <ToolListItem title="Test Tool" href="#">
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-href", "");
      expect(screen.getByText("Test Tool")).toBeInTheDocument();
      expect(screen.getByText("Tool description")).toBeInTheDocument();
    });

    it("handles external link with target and rel", () => {
      render(
        <ToolListItem
          title="Test Tool"
          href="https://example.com"
          target="_blank"
        >
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      expect(titleElement).toHaveAttribute("data-href", "https://example.com");
      expect(titleElement).toHaveAttribute("data-target", "_blank");
      expect(screen.getByText("Test Tool")).toBeInTheDocument();
      expect(screen.getByText("Tool description")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <ToolListItem title="Test Tool" href="/test">
          <span>Complex</span> <strong>description</strong>
        </ToolListItem>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("description")).toBeInTheDocument();
    });

    it("handles special characters in title", () => {
      render(
        <ToolListItem title="Tool & Component" href="/test">
          Tool description
        </ToolListItem>
      );

      expect(screen.getByText("Tool & Component")).toBeInTheDocument();
    });

    it("handles empty string children", () => {
      const { container } = render(
        <ToolListItem title="Test Tool" href="/test">
          {""}
        </ToolListItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles null children", () => {
      const { container } = render(
        <ToolListItem title="Test Tool" href="/test">
          {null}
        </ToolListItem>
      );
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Props Forwarding", () => {
    it("forwards rest props to Card components", () => {
      render(
        <ToolListItem
          title="Test Tool"
          href="/test"
          data-custom="value"
          id="tool-item"
        >
          Tool description
        </ToolListItem>
      );

      const cardElement = screen.getByTestId("test-id-card-root");
      expect(cardElement).toHaveAttribute("data-custom", "value");
      expect(cardElement).toHaveAttribute("id", "tool-item");
    });

    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(
        <ToolListItem title="Test Tool" href="/test" onClick={handleClick}>
          Tool description
        </ToolListItem>
      );

      const titleElement = screen.getByTestId("test-id-card-title-root");
      const descriptionElement = screen.getByTestId(
        "test-id-card-description-root"
      );
      expect(titleElement).toBeInTheDocument();
      expect(descriptionElement).toBeInTheDocument();
    });
  });
});
