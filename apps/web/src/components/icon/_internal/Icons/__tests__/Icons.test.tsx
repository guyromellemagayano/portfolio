import React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MoonIcon,
  SunIcon,
  XIcon,
} from "../Icons";

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn(({ internalId, debugMode }) => ({
    id: internalId || "test-id",
    isDebugMode: debugMode || false,
  })),
}));

vi.mock("@guyromellemagayano/utils", () => ({
  setDisplayName: vi.fn((component, displayName) => {
    if (component) component.displayName = displayName;
    return component;
  }),
}));

describe("Icon Components", () => {
  afterEach(() => {
    cleanup();
  });

  // ============================================================================
  // NAVIGATION ICON COMPONENTS
  // ============================================================================

  describe("ChevronDownIcon", () => {
    describe("Basic Rendering", () => {
      it("renders chevron down icon correctly", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<ChevronDownIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<ChevronDownIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<ChevronDownIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });

      it("passes through HTML attributes", () => {
        render(<ChevronDownIcon data-test="test-value" />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toHaveAttribute("data-test", "test-value");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("icon-chevron-down");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
        );
      });
    });

    describe("Debug Mode", () => {
      it("applies data-debug-mode when enabled", () => {
        render(<ChevronDownIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("does not apply data-debug-mode when disabled", () => {
        render(<ChevronDownIcon _debugMode={false} />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).not.toHaveAttribute("data-debug-mode");
      });

      it("does not apply data-debug-mode when undefined", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("icon-chevron-down");
        expect(icon).not.toHaveAttribute("data-debug-mode");
      });
    });
  });

  describe("ChevronRightIcon", () => {
    describe("Basic Rendering", () => {
      it("renders chevron right icon correctly", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("icon-chevron-right");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<ChevronRightIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-chevron-right");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<ChevronRightIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-chevron-right");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<ChevronRightIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-chevron-right");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("icon-chevron-right");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("icon-chevron-right");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("icon-chevron-right");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
        );
      });
    });
  });

  describe("ArrowLeftIcon", () => {
    describe("Basic Rendering", () => {
      it("renders arrow left icon correctly", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("icon-arrow-left");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<ArrowLeftIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-arrow-left");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<ArrowLeftIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-arrow-left");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<ArrowLeftIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-arrow-left");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("icon-arrow-left");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("icon-arrow-left");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("icon-arrow-left");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        );
      });
    });
  });

  // ============================================================================
  // SOCIAL ICON COMPONENTS
  // ============================================================================

  describe("XIcon", () => {
    describe("Basic Rendering", () => {
      it("renders X (Twitter) icon correctly", () => {
        render(<XIcon />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<XIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<XIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<XIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<XIcon />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<XIcon />);
        const icon = screen.getByTestId("icon-x-twitter");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<XIcon />);
        const icon = screen.getByTestId("icon-x-twitter");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        );
      });
    });
  });

  describe("InstagramIcon", () => {
    describe("Basic Rendering", () => {
      it("renders Instagram icon correctly", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<InstagramIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<InstagramIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<InstagramIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("icon-instagram");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("icon-instagram");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
        );
      });
    });
  });

  describe("LinkedInIcon", () => {
    describe("Basic Rendering", () => {
      it("renders LinkedIn icon correctly", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("icon-linkedin");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<LinkedInIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-linkedin");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<LinkedInIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-linkedin");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<LinkedInIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-linkedin");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("icon-linkedin");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("icon-linkedin");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("icon-linkedin");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
        );
      });
    });
  });

  describe("GitHubIcon", () => {
    describe("Basic Rendering", () => {
      it("renders GitHub icon correctly", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("icon-github");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<GitHubIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-github");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<GitHubIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-github");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<GitHubIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-github");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("icon-github");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("icon-github");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("icon-github");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.59 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        );
      });
    });
  });

  // ============================================================================
  // UI ICON COMPONENTS
  // ============================================================================

  describe("CloseIcon", () => {
    describe("Basic Rendering", () => {
      it("renders close icon correctly", () => {
        render(<CloseIcon />);
        const icon = screen.getByTestId("icon-close");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<CloseIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-close");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<CloseIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-close");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<CloseIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-close");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<CloseIcon />);
        const icon = screen.getByTestId("icon-close");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<CloseIcon />);
        const icon = screen.getByTestId("icon-close");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<CloseIcon />);
        const icon = screen.getByTestId("icon-close");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
        );
      });
    });
  });

  describe("SunIcon", () => {
    describe("Basic Rendering", () => {
      it("renders sun icon correctly", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("icon-sun");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<SunIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-sun");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<SunIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-sun");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<SunIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-sun");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("icon-sun");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("icon-sun");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("icon-sun");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"
        );
      });
    });
  });

  describe("MoonIcon", () => {
    describe("Basic Rendering", () => {
      it("renders moon icon correctly", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("icon-moon");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<MoonIcon className="custom-class" />);
        const icon = screen.getByTestId("icon-moon");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<MoonIcon _debugMode={true} />);
        const icon = screen.getByTestId("icon-moon");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<MoonIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("icon-moon");
        expect(icon).toHaveAttribute("data-icon-id", "custom-id");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("icon-moon");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("icon-moon");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("icon-moon");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-3.03 0-5.5-2.47-5.5-5.5 0-1.82.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"
        );
      });
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe("Accessibility", () => {
    it("all icons have aria-hidden attribute", () => {
      const icons = [
        <ChevronDownIcon key="chevron-down" />,
        <ChevronRightIcon key="chevron-right" />,
        <ArrowLeftIcon key="arrow-left" />,
        <XIcon key="x" />,
        <InstagramIcon key="instagram" />,
        <LinkedInIcon key="linkedin" />,
        <GitHubIcon key="github" />,
        <CloseIcon key="close" />,
        <SunIcon key="sun" />,
        <MoonIcon key="moon" />,
      ];

      icons.forEach((icon) => {
        const { container } = render(icon);
        const svg = container.querySelector("svg");
        expect(svg).toHaveAttribute("aria-hidden", "true");
      });
    });

    it("all icons have proper data attributes for debugging", () => {
      const icons = [
        {
          component: <ChevronDownIcon key="chevron-down" />,
          testId: "icon-chevron-down",
        },
        {
          component: <ChevronRightIcon key="chevron-right" />,
          testId: "icon-chevron-right",
        },
        {
          component: <ArrowLeftIcon key="arrow-left" />,
          testId: "icon-arrow-left",
        },
        { component: <XIcon key="x" />, testId: "icon-x-twitter" },
        {
          component: <InstagramIcon key="instagram" />,
          testId: "icon-instagram",
        },
        { component: <LinkedInIcon key="linkedin" />, testId: "icon-linkedin" },
        { component: <GitHubIcon key="github" />, testId: "icon-github" },
        { component: <CloseIcon key="close" />, testId: "icon-close" },
        { component: <SunIcon key="sun" />, testId: "icon-sun" },
        { component: <MoonIcon key="moon" />, testId: "icon-moon" },
      ];

      icons.forEach(({ component, testId }) => {
        const element = render(component).getByTestId(testId);
        expect(element).toHaveAttribute("data-testid", testId);
      });
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("handles all SVG attributes correctly", () => {
      render(
        <ChevronDownIcon
          width="32"
          height="32"
          fill="currentColor"
          stroke="none"
          style={{ color: "red" }}
        />
      );
      const icon = screen.getByTestId("icon-chevron-down");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("stroke", "none");
      expect(icon).toHaveAttribute("style", "color: red;");
    });

    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<ChevronDownIcon onClick={handleClick} />);
      const icon = screen.getByTestId("icon-chevron-down");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles ref forwarding", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<ChevronDownIcon ref={ref} />);
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
      expect(ref.current).toHaveAttribute("data-testid", "icon-chevron-down");
    });
  });
});
