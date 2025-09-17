import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { List } from "../List";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode = false } = {}) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  hasAnyRenderableContent: vi.fn((...args) =>
    args.some((arg) => arg != null && arg !== "")
  ),
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

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

// Mock CSS module
vi.mock("../List.module.css", () => ({
  default: {
    list: "list",
  },
}));

describe("List", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders as ul by default", () => {
      render(
        <List>
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("UL");
    });

    it("renders as ol when as='ol'", () => {
      render(
        <List as="ol">
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("OL");
    });

    it("renders as ul when as='ul'", () => {
      render(
        <List as="ul">
          <li>Item 1</li>
          <li>Item 2</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list.tagName).toBe("UL");
    });

    it("applies custom className", () => {
      render(
        <List className="custom-class">
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveClass("custom-class");
    });

    it("passes through HTML attributes", () => {
      render(
        <List aria-label="Test list">
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByRole("list");
      expect(list).toHaveAttribute("aria-label", "Test list");
    });
  });

  describe("Content Validation", () => {
    it("does not render when no content", () => {
      const { container } = render(<List />);
      expect(container.firstChild).toBeNull();
    });

    it("renders when children have content", () => {
      render(
        <List>
          <li>Valid content</li>
        </List>
      );

      expect(screen.getByText("Valid content")).toBeInTheDocument();
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(
        <List debugMode={true}>
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByTestId("test-id-list-root");
      expect(list).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply when disabled", () => {
      render(
        <List debugMode={false}>
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByTestId("test-id-list-root");
      expect(list).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Memoization", () => {
    it("renders non-memoized component by default", () => {
      render(
        <List>
          <li>Content</li>
        </List>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("renders memoized component when isMemoized is true", () => {
      render(
        <List isMemoized={true}>
          <li>Content</li>
        </List>
      );

      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Component Structure", () => {
    it("applies correct CSS classes", () => {
      render(
        <List>
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByTestId("test-id-list-root");
      expect(list).toHaveClass("list");
    });

    it("combines CSS module + custom classes", () => {
      render(
        <List className="custom-class">
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByTestId("test-id-list-root");
      expect(list).toHaveClass("list", "custom-class");
    });
  });

  describe("Component ID", () => {
    it("renders with generated component ID", () => {
      render(
        <List>
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByTestId("test-id-list-root");
      expect(list).toHaveAttribute("data-list-id", "test-id-list");
    });

    it("renders with custom internal ID when provided", () => {
      render(
        <List internalId="custom-id">
          <li>Item 1</li>
        </List>
      );

      const list = screen.getByTestId("custom-id-list-root");
      expect(list).toHaveAttribute("data-list-id", "custom-id-list");
    });
  });

  describe("Integration", () => {
    it("works with ListItem components", () => {
      render(
        <List>
          <li>First item</li>
          <li>Second item</li>
        </List>
      );

      const list = screen.getByRole("list");
      const items = screen.getAllByRole("listitem");

      expect(list).toBeInTheDocument();
      expect(items).toHaveLength(2);
      expect(items[0]).toHaveTextContent("First item");
      expect(items[1]).toHaveTextContent("Second item");
    });

    it("maintains proper DOM structure", () => {
      render(
        <List>
          <li>Item content</li>
        </List>
      );

      const list = screen.getByRole("list");
      const item = screen.getByRole("listitem");

      expect(list).toContainElement(item);
    });
  });

  describe("Type Safety", () => {
    it("accepts standard ul/ol element props", () => {
      render(
        <List
          id="test-id"
          role="list"
          tabIndex={0}
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          <li>Type safe content</li>
        </List>
      );

      const list = screen.getByTestId("test-id-list-root");
      expect(list).toHaveAttribute("id", "test-id");
      expect(list).toHaveAttribute("role", "list");
      expect(list).toHaveAttribute("tabIndex", "0");
    });
  });
});
