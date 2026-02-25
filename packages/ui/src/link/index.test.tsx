/**
 * @file packages/ui/src/link/index.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for index behavior.
 */

import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Link } from ".";

describe("Link", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Basic Rendering", () => {
    it("renders without crashing", () => {
      render(<Link href="https://example.com">Test Link</Link>);
      expect(screen.getByRole("link")).toBeInTheDocument();
    });

    it("renders children correctly", () => {
      render(<Link href="https://example.com">Click me</Link>);
      expect(screen.getByText("Click me")).toBeInTheDocument();
    });

    it("renders with complex children", () => {
      render(
        <Link href="https://example.com">
          <span>Complex</span> <strong>content</strong>
        </Link>
      );

      expect(screen.getByText("Complex")).toBeInTheDocument();
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("renders as anchor element", () => {
      const { container } = render(
        <Link href="https://example.com">Test Link</Link>
      );

      const link = container.querySelector("a");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "https://example.com");
    });
  });

  describe("Href Attribute", () => {
    it("sets href attribute correctly", () => {
      render(<Link href="https://example.com">Test Link</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com");
    });

    it("handles relative URLs", () => {
      render(<Link href="/about">About</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/about");
    });

    it("handles absolute URLs", () => {
      render(<Link href="https://example.com/page">Page</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com/page");
    });

    it("handles URLs with query parameters", () => {
      render(<Link href="https://example.com?param=value">Link</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com?param=value");
    });

    it("handles URLs with hash fragments", () => {
      render(<Link href="https://example.com#section">Link</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com#section");
    });
  });

  describe("NewTab Functionality", () => {
    it("does not set target and rel when newTab is false", () => {
      render(
        <Link href="https://example.com" newTab={false}>
          Link
        </Link>
      );
      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("does not set target and rel when newTab is undefined", () => {
      render(<Link href="https://example.com">Link</Link>);
      const link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("sets target=_blank when newTab is true", () => {
      render(
        <Link href="https://example.com" newTab={true}>
          Link
        </Link>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
    });

    it("sets rel=noreferrer when newTab is true", () => {
      render(
        <Link href="https://example.com" newTab={true}>
          Link
        </Link>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });

    it("sets both target and rel when newTab is true", () => {
      render(
        <Link href="https://example.com" newTab={true}>
          External Link
        </Link>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");
    });
  });

  describe("HTML Attributes", () => {
    it("passes through additional HTML attributes", () => {
      render(
        <Link
          href="https://example.com"
          id="custom-id"
          className="custom-class"
        >
          Link
        </Link>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("id", "custom-id");
      expect(link).toHaveClass("custom-class", { exact: true });
    });

    it("passes through aria attributes", () => {
      render(
        <Link
          href="https://example.com"
          aria-label="Custom label"
          aria-describedby="description"
        >
          Link
        </Link>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("aria-label", "Custom label");
      expect(link).toHaveAttribute("aria-describedby", "description");
    });

    it("passes through data attributes", () => {
      render(
        <Link href="https://example.com" data-testid="custom-link">
          Link
        </Link>
      );
      const link = screen.getByTestId("custom-link");
      expect(link).toBeInTheDocument();
    });

    it("passes through onClick handler", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Link href="https://example.com" onClick={handleClick}>
          Link
        </Link>
      );

      const link = screen.getByRole("link");
      await user.click(link);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Accessibility", () => {
    it("renders as link role by default", () => {
      render(<Link href="https://example.com">Link</Link>);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <Link href="https://example.com" onClick={handleClick}>
          Link
        </Link>
      );

      const link = screen.getByRole("link");
      link.focus();
      expect(link).toHaveFocus();

      await user.keyboard("{Enter}");
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports aria-label for screen readers", () => {
      render(
        <Link href="https://example.com" aria-label="Visit example website">
          Link
        </Link>
      );
      const link = screen.getByRole("link", { name: "Visit example website" });
      expect(link).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles empty children", () => {
      render(<Link href="https://example.com">{null}</Link>);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toBeEmptyDOMElement();
    });

    it("handles empty string children", () => {
      render(<Link href="https://example.com">{""}</Link>);
      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
    });

    it("handles very long href", () => {
      const longHref = "https://example.com/" + "a".repeat(1000);
      render(<Link href={longHref}>Link</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", longHref);
    });

    it("handles special characters in href", () => {
      const href = "https://example.com/path?query=value&other=test#section";
      render(<Link href={href}>Link</Link>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", href);
    });

    it("handles unicode characters in children", () => {
      render(<Link href="https://example.com">首页</Link>);
      expect(screen.getByText("首页")).toBeInTheDocument();
    });
  });

  describe("Component Updates", () => {
    it("updates href when prop changes", () => {
      const { rerender } = render(<Link href="https://example.com">Link</Link>);
      let link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://example.com");

      rerender(<Link href="https://updated.com">Link</Link>);
      link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "https://updated.com");
    });

    it("updates newTab when prop changes", () => {
      const { rerender } = render(<Link href="https://example.com">Link</Link>);
      let link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("target");

      rerender(
        <Link href="https://example.com" newTab={true}>
          Link
        </Link>
      );
      link = screen.getByRole("link");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noreferrer");

      rerender(
        <Link href="https://example.com" newTab={false}>
          Link
        </Link>
      );
      link = screen.getByRole("link");
      expect(link).not.toHaveAttribute("target");
      expect(link).not.toHaveAttribute("rel");
    });

    it("updates children when prop changes", () => {
      const { rerender } = render(
        <Link href="https://example.com">Initial</Link>
      );
      expect(screen.getByText("Initial")).toBeInTheDocument();

      rerender(<Link href="https://example.com">Updated</Link>);
      expect(screen.getByText("Updated")).toBeInTheDocument();
      expect(screen.queryByText("Initial")).not.toBeInTheDocument();
    });
  });
});
