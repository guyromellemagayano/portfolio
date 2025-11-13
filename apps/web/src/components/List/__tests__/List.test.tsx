// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+), key paths + edges
// - Risk Tier: Core
// - Component Type: Presentational (polymorphic + variants orchestrator)
// ============================================================================

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { List, MemoizedList } from "../List";

// Mocks
const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: any = {}) => ({
    componentId: options.debugId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@guyromellemagayano/components", () => ({}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, name) => {
    if (component) component.displayName = name;
    return component;
  }),
  createComponentProps: vi.fn(
    (
      id: string,
      componentType: string,
      debugMode: boolean,
      additional: any = {}
    ) => ({
      "data-testid": `${id}-${componentType}-root`,
      "data-debug-mode": debugMode ? "true" : undefined,
      ...additional,
    })
  ),
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

// i18n passthrough (use real values)
vi.mock("../List.i18n", async (orig) => {
  const mod = await orig<typeof import("../List.i18n")>();
  return { ...mod };
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("List", () => {
  describe("Basic Rendering", () => {
    it("renders children", () => {
      render(
        <List>
          <li>Item A</li>
        </List>
      );
      expect(screen.getByText("Item A")).toBeInTheDocument();
    });

    it("returns null when no children", () => {
      const { container } = render((<List />) as any);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Polymorphic as=", () => {
    it('supports as="ol" while preserving default variant semantics', () => {
      render(
        <List as="ol">
          <li>One</li>
        </List>
      );
      const root = screen.getByTestId("test-id-list-default-root");
      expect(root.tagName).toBe("OL");
      expect(root).toHaveAttribute("role", "list");
    });

    it('supports as="ul" with custom role applied', () => {
      render(
        <List as="ul" role="list">
          <li>Item</li>
        </List>
      );
      const root = screen.getByTestId("test-id-list-default-root");
      expect(root.tagName).toBe("UL");
      expect(root).toHaveAttribute("role", "list");
    });
  });

  describe("Variants", () => {
    it("default variant uses data-testid list-default", () => {
      render(
        <List>
          <li>Default</li>
        </List>
      );
      expect(
        screen.getByTestId("test-id-list-default-root")
      ).toBeInTheDocument();
    });

    describe("article variant", () => {
      it("applies correct aria-label and structure", () => {
        render(
          <List variant="article" role="region">
            <article>Article child</article>
          </List>
        );
        const root = screen.getByTestId("test-id-list-article-root");
        expect(root).toBeInTheDocument();
        expect(root).toHaveAttribute("aria-label", "Article list");
        expect(root).toHaveAttribute("role", "region");
      });

      it("renders sr-only heading with aria-hidden", () => {
        render(
          <List variant="article" role="region">
            <article>Article child</article>
          </List>
        );
        const heading = screen.getByText("Article list");
        expect(heading.tagName).toBe("H2");
        expect(heading).toHaveClass("sr-only");
        expect(heading).toHaveAttribute("aria-hidden", "true");
      });

      it("renders nested div with role=list for children", () => {
        render(
          <List variant="article" role="region">
            <article>Article child</article>
          </List>
        );
        // Get the nested list container by aria-label to avoid ambiguity with root
        const listContainer = screen.getByRole("list", { name: "Articles" });
        expect(listContainer).toBeInTheDocument();
        expect(listContainer).toHaveAttribute("aria-label", "Articles");
        expect(listContainer).toHaveClass(
          "flex",
          "w-full",
          "max-w-3xl",
          "flex-col",
          "space-y-16"
        );
      });

      it("defaults to role='region' when not provided", () => {
        render(
          <List variant="article">
            <article>Article child</article>
          </List>
        );
        const root = screen.getByTestId("test-id-list-article-root");
        expect(root).toHaveAttribute("role", "region");
      });

      it("applies default border and padding classes", () => {
        render(
          <List variant="article" role="region">
            <article>Article child</article>
          </List>
        );
        const root = screen.getByTestId("test-id-list-article-root");
        expect(root).toHaveClass(
          "md:border-l",
          "md:border-zinc-100",
          "md:pl-6",
          "md:dark:border-zinc-700/40"
        );
      });

      it("merges custom className with default border classes", () => {
        render(
          <List variant="article" className="custom-class" role="region">
            <article>Article child</article>
          </List>
        );
        const root = screen.getByTestId("test-id-list-article-root");
        expect(root).toHaveClass("custom-class", "md:border-l");
      });

      it("applies className to root component", () => {
        render(
          <List variant="article" className="custom-class" role="region">
            <article>Article child</article>
          </List>
        );
        const root = screen.getByTestId("test-id-list-article-root");
        expect(root).toHaveClass("custom-class");
      });
    });

    it("social variant renders as list element by default", () => {
      render(
        <List variant="social">
          <li>Social child</li>
        </List>
      );
      const root = screen.getByTestId("test-id-social-list-root");
      expect(root.tagName).toBe("UL");
    });

    it("social variant returns null when no children", () => {
      const { container } = render(<List variant="social" />);
      expect(container.firstChild).toBeNull();
    });

    it("social variant respects custom as prop", () => {
      render(
        <List variant="social" as="ol">
          <li>Item</li>
        </List>
      );
      const root = screen.getByTestId("test-id-social-list-root");
      expect(root.tagName).toBe("OL");
    });

    it("tools variant applies default space-y-16 class", () => {
      render(
        <List variant="tools">
          <li>Tool</li>
        </List>
      );
      const root = screen.getByTestId("test-id-tools-list-root");
      expect(root).toHaveClass("space-y-16");
    });

    it("tools variant merges custom className with default spacing", () => {
      render(
        <List variant="tools" className="custom-tools">
          <li>Tool</li>
        </List>
      );
      const root = screen.getByTestId("test-id-tools-list-root");
      expect(root).toHaveClass("custom-tools", "space-y-16");
    });

    it("tools variant returns null when no children", () => {
      const { container } = render(<List variant="tools" />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe("Debug + IDs", () => {
    it("passes debug attributes when enabled", () => {
      render(
        <List debugMode>
          <li>Dbg</li>
        </List>
      );
      const root = screen.getByTestId("test-id-list-default-root");
      expect(root).toHaveAttribute("data-debug-mode", "true");
    });

    it("uses custom debugId for data attributes", () => {
      render(
        <List debugId="custom-id">
          <li>Item</li>
        </List>
      );
      expect(
        screen.getByTestId("custom-id-list-default-root")
      ).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("MemoizedList renders children", () => {
      render(
        <MemoizedList>
          <li>Memo</li>
        </MemoizedList>
      );
      expect(screen.getByText("Memo")).toBeInTheDocument();
    });
  });
});
