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

import { SocialList } from "../SocialList";

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

vi.mock("@guyromellemagayano/components", () => ({
  // Mock CommonComponentProps type
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

describe("SocialList", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders children correctly", () => {
      render(
        <SocialList>
          <li>Social Link 1</li>
          <li>Social Link 2</li>
        </SocialList>
      );

      expect(screen.getByText("Social Link 1")).toBeInTheDocument();
      expect(screen.getByText("Social Link 2")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <SocialList className="custom-class">
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(
        <SocialList debugMode={true}>
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom component ID", () => {
      render(
        <SocialList debugId="custom-id">
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute(
        "data-social-list-id",
        "custom-id-social-list"
      );
    });

    it("passes through HTML attributes", () => {
      render(
        <SocialList data-custom="test" aria-label="Social media links">
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("data-custom", "test");
      expect(list).toHaveAttribute("aria-label", "Social media links");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no children", () => {
      const { container } = render(<SocialList />);
      expect(container.firstChild).toBeNull();
    });

    it("handles null children", () => {
      const { container } = render(<SocialList>{null}</SocialList>);
      expect(container.firstChild).toBeNull();
    });

    it("handles undefined children", () => {
      const { container } = render(<SocialList>{undefined}</SocialList>);
      expect(container.firstChild).toBeNull();
    });

    it("handles empty children", () => {
      const { container } = render(<SocialList>{""}</SocialList>);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug Mode Tests", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <SocialList debugMode={true}>
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply data-debug-mode when disabled", () => {
      render(
        <SocialList debugMode={false}>
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply data-debug-mode when undefined", () => {
      render(
        <SocialList>
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure Tests", () => {
    it("renders as ul element by default", () => {
      render(
        <SocialList>
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("UL");
    });

    it("renders as custom element when specified", () => {
      render(
        <SocialList as="div">
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list.tagName).toBe("DIV");
    });

    it("applies correct CSS classes", () => {
      render(
        <SocialList className="custom-class">
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("class");
    });
  });

  describe("Ref Forwarding Tests", () => {
    it("forwards ref correctly", () => {
      const ref = React.createRef<HTMLUListElement>();
      render(
        <SocialList ref={ref}>
          <li>Social Link</li>
        </SocialList>
      );

      expect(ref.current).toBeInstanceOf(HTMLUListElement);
    });

    it("ref points to correct element", () => {
      const ref = React.createRef<HTMLUListElement>();
      render(
        <SocialList ref={ref}>
          <li>Social Link</li>
        </SocialList>
      );

      expect(ref.current).toBe(screen.getByRole("list"));
    });
  });

  describe("Accessibility Tests", () => {
    it("has proper semantic structure", () => {
      render(
        <SocialList>
          <li>Social Link 1</li>
          <li>Social Link 2</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
    });

    it("applies correct ARIA role", () => {
      render(
        <SocialList>
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("role", "list");
    });

    it("supports custom ARIA attributes", () => {
      render(
        <SocialList
          aria-label="Social media links"
          aria-describedby="social-description"
        >
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("aria-label", "Social media links");
      expect(list).toHaveAttribute("aria-describedby", "social-description");
    });
  });

  describe("Memoization Tests", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(
        <SocialList isMemoized={true}>
          <li>Social Link</li>
        </SocialList>
      );

      expect(screen.getByText("Social Link")).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(
        <SocialList isMemoized={false}>
          <li>Social Link</li>
        </SocialList>
      );

      rerender(
        <SocialList isMemoized={false}>
          <li>Updated Social Link</li>
        </SocialList>
      );

      expect(screen.getByText("Updated Social Link")).toBeInTheDocument();
    });

    it("does not memoize by default", () => {
      const { rerender } = render(
        <SocialList>
          <li>Social Link</li>
        </SocialList>
      );

      rerender(
        <SocialList>
          <li>Updated Social Link</li>
        </SocialList>
      );

      expect(screen.getByText("Updated Social Link")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <SocialList>
          <li>
            <span>Complex</span> <strong>content</strong>
          </li>
        </SocialList>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("handles special characters in children", () => {
      render(
        <SocialList>
          <li>Special chars: &lt;&gt;&amp;</li>
        </SocialList>
      );

      expect(screen.getByText(/Special chars:/)).toBeInTheDocument();
    });

    it("handles multiple children", () => {
      render(
        <SocialList>
          <li>First Link</li>
          <li>Second Link</li>
          <li>Third Link</li>
        </SocialList>
      );

      expect(screen.getByText("First Link")).toBeInTheDocument();
      expect(screen.getByText("Second Link")).toBeInTheDocument();
      expect(screen.getByText("Third Link")).toBeInTheDocument();
    });
  });

  describe("Component-Specific Tests", () => {
    it("applies correct data attributes", () => {
      render(
        <SocialList debugId="test-id">
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute(
        "data-social-list-id",
        "test-id-social-list"
      );
      expect(list).toHaveAttribute("data-testid", "test-id-social-list");
    });

    it("handles debugId prop correctly", () => {
      render(
        <SocialList debugId="custom-debug-id">
          <li>Social Link</li>
        </SocialList>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute(
        "data-social-list-id",
        "custom-debug-id-social-list"
      );
    });
  });
});
