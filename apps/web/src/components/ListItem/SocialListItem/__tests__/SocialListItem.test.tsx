// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

import React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { SocialListItem } from "../SocialListItem";

// Mock dependencies
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/utils", () => ({
  createComponentProps: vi.fn(
    (id, componentType, debugMode, additionalProps = {}) => ({
      [`data-${componentType}-id`]: `${id}-${componentType}`,
      "data-debug-mode": debugMode ? "true" : undefined,
      "data-testid": additionalProps["data-testid"] || `${id}-${componentType}`,
      ...additionalProps,
    })
  ),
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

describe("SocialListItem", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      expect(screen.getByText("Twitter")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <SocialListItem className="custom-class">
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(
        <SocialListItem debugMode={true}>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(
        <SocialListItem debugId="custom-id">
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute(
        "data-social-list-item-id",
        "custom-id-social-list-item"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <SocialListItem data-custom="test" aria-label="Social media link">
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute("data-custom", "test");
      expect(listItem).toHaveAttribute("aria-label", "Social media link");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<SocialListItem />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null children", () => {
      const { container } = render(<SocialListItem>{null}</SocialListItem>);
      expect(container.firstChild).toBeNull();
    });

    it("handles undefined children", () => {
      const { container } = render(
        <SocialListItem>{undefined}</SocialListItem>
      );
      expect(container.firstChild).toBeNull();
    });

    it("handles empty children", () => {
      const { container } = render(<SocialListItem>{""}</SocialListItem>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <SocialListItem debugMode={true}>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(
        <SocialListItem debugMode={false}>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure Tests", () => {
    it("renders as li element by default", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem.tagName).toBe("LI");
    });

    it("renders as custom element when specified", () => {
      render(
        <SocialListItem as="div">
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      render(
        <SocialListItem className="custom-class">
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute("class");
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLLIElement>();
      render(
        <SocialListItem ref={ref}>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      expect(ref.current).toBeInstanceOf(HTMLLIElement);
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLLIElement>();
      render(
        <SocialListItem ref={ref}>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      expect(ref.current).toBe(screen.getByRole("listitem"));
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper semantic structure", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toBeInTheDocument();
    });

    it("applies correct ARIA role", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute("role", "listitem");
    });

    it("supports custom ARIA attributes", () => {
      render(
        <SocialListItem
          aria-label="Social media link"
          aria-describedby="link-description"
        >
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute("aria-label", "Social media link");
      expect(listItem).toHaveAttribute("aria-describedby", "link-description");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(
        <SocialListItem isMemoized={true}>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      expect(screen.getByText("Twitter")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <SocialListItem isMemoized={false}>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      rerender(
        <SocialListItem isMemoized={false}>
          <a href="https://github.com">GitHub</a>
        </SocialListItem>
      );

      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(
        <SocialListItem>
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      rerender(
        <SocialListItem>
          <a href="https://github.com">GitHub</a>
        </SocialListItem>
      );

      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">
            <span>Follow us on</span> <strong>Twitter</strong>
          </a>
        </SocialListItem>
      );

      expect(screen.getByText("Follow us on")).toBeInTheDocument();
      expect(screen.getByText("Twitter")).toBeInTheDocument();
    });

    it("handles special characters in children", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">Special chars: &lt;&gt;&amp;</a>
        </SocialListItem>
      );

      expect(screen.getByText(/Special chars:/)).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <SocialListItem>
          <a href="https://twitter.com">Twitter</a>
          <span> - Follow us</span>
        </SocialListItem>
      );

      expect(screen.getByText("Twitter")).toBeInTheDocument();
      expect(screen.getByText("- Follow us")).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes", () => {
      render(
        <SocialListItem debugId="test-id">
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute(
        "data-social-list-item-id",
        "test-id-social-list-item"
      );
      expect(listItem).toHaveAttribute(
        "data-testid",
        "test-id-social-list-item"
      );
    });

    it("handles debugId prop correctly", () => {
      render(
        <SocialListItem debugId="custom-debug-id">
          <a href="https://twitter.com">Twitter</a>
        </SocialListItem>
      );

      const listItem = screen.getByRole("listitem");
      expect(listItem).toHaveAttribute(
        "data-social-list-item-id",
        "custom-debug-id-social-list-item"
      );
    });

    it("works within a list context", () => {
      render(
        <ul>
          <SocialListItem>
            <a href="https://twitter.com">Twitter</a>
          </SocialListItem>
          <SocialListItem>
            <a href="https://github.com">GitHub</a>
          </SocialListItem>
        </ul>
      );

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(2);
      expect(screen.getByText("Twitter")).toBeInTheDocument();
      expect(screen.getByText("GitHub")).toBeInTheDocument();
    });
  });
});
