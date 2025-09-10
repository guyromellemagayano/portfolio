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
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<ChevronDownIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<ChevronDownIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<ChevronDownIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-chevron-down-root");
        expect(icon).toHaveAttribute(
          "data-icon-chevron-down-id",
          "custom-id-icon-chevron-down"
        );
      });

      it("passes through HTML attributes", () => {
        render(<ChevronDownIcon data-test="test-value" />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).toHaveAttribute("data-test", "test-value");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 8 6");
      });

      it("has aria-hidden attribute", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute("d", "M1.75 1.75 4 4.25l2.25-2.5");
      });
    });

    describe("Debug Mode", () => {
      it("applies data-debug-mode when enabled", () => {
        render(<ChevronDownIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("does not apply data-debug-mode when disabled", () => {
        render(<ChevronDownIcon _debugMode={false} />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).not.toHaveAttribute("data-debug-mode");
      });

      it("does not apply data-debug-mode when undefined", () => {
        render(<ChevronDownIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-down-root");
        expect(icon).not.toHaveAttribute("data-debug-mode");
      });
    });
  });

  describe("ChevronRightIcon", () => {
    describe("Basic Rendering", () => {
      it("renders chevron right icon correctly", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-right-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<ChevronRightIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-chevron-right-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<ChevronRightIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-chevron-right-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<ChevronRightIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-chevron-right-root");
        expect(icon).toHaveAttribute(
          "data-icon-chevron-right-id",
          "custom-id-icon-chevron-right"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-right-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("has aria-hidden attribute", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-right-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<ChevronRightIcon />);
        const icon = screen.getByTestId("test-id-icon-chevron-right-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute("d", "M6.75 5.75 9.25 8l-2.5 2.25");
      });
    });
  });

  describe("ArrowLeftIcon", () => {
    describe("Basic Rendering", () => {
      it("renders arrow left icon correctly", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("test-id-icon-arrow-left-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<ArrowLeftIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-arrow-left-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<ArrowLeftIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-arrow-left-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<ArrowLeftIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-arrow-left-root");
        expect(icon).toHaveAttribute(
          "data-icon-arrow-left-id",
          "custom-id-icon-arrow-left"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("test-id-icon-arrow-left-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 16 16");
      });

      it("has aria-hidden attribute", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("test-id-icon-arrow-left-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<ArrowLeftIcon />);
        const icon = screen.getByTestId("test-id-icon-arrow-left-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
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
        const icon = screen.getByTestId("test-id-icon-x-twitter-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<XIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-x-twitter-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<XIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-x-twitter-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<XIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-x-twitter-root");
        expect(icon).toHaveAttribute(
          "data-icon-x-twitter-id",
          "custom-id-icon-x-twitter"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<XIcon />);
        const icon = screen.getByTestId("test-id-icon-x-twitter-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<XIcon />);
        const icon = screen.getByTestId("test-id-icon-x-twitter-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<XIcon />);
        const icon = screen.getByTestId("test-id-icon-x-twitter-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M13.3174 10.7749L19.1457 4H17.7646L12.7039 9.88256L8.66193 4H4L10.1122 12.8955L4 20H5.38119L10.7254 13.7878L14.994 20H19.656L13.3171 10.7749H13.3174ZM11.4257 12.9738L10.8064 12.0881L5.87886 5.03974H8.00029L11.9769 10.728L12.5962 11.6137L17.7652 19.0075H15.6438L11.4257 12.9742V12.9738Z"
        );
      });
    });
  });

  describe("InstagramIcon", () => {
    describe("Basic Rendering", () => {
      it("renders Instagram icon correctly", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("test-id-icon-instagram-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<InstagramIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-instagram-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<InstagramIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-instagram-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<InstagramIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-instagram-root");
        expect(icon).toHaveAttribute(
          "data-icon-instagram-id",
          "custom-id-icon-instagram"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("test-id-icon-instagram-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("test-id-icon-instagram-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<InstagramIcon />);
        const icon = screen.getByTestId("test-id-icon-instagram-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M12 3c-2.444 0-2.75.01-3.71.054-.959.044-1.613.196-2.185.418A4.412 4.412 0 0 0 4.51 4.511c-.5.5-.809 1.002-1.039 1.594-.222.572-.374 1.226-.418 2.184C3.01 9.25 3 9.556 3 12s.01 2.75.054 3.71c.044.959.196 1.613.418 2.185.23.592.538 1.094 1.039 1.595.5.5 1.002.808 1.594 1.038.572.222 1.226.374 2.184.418C9.25 20.99 9.556 21 12 21s2.75-.01 3.71-.054c.959-.044 1.613-.196 2.185-.419a4.412 4.412 0 0 0 1.595-1.038c.5-.5.808-1.002 1.038-1.594.222-.572.374-1.226.418-2.184.044-.96.054-1.267.054-3.711s-.01-2.75-.054-3.71c-.044-.959-.196-1.613-.419-2.185A4.412 4.412 0 0 0 19.49 4.51c-.5-.5-1.002-.809-1.594-1.039-.572-.222-1.226-.374-2.184-.418C14.75 3.01 14.444 3 12 3Zm0 1.622c2.403 0 2.688.009 3.637.052.877.04 1.354.187 1.67.31.421.163.72.358 1.036.673.315.315.51.615.673 1.035.123.317.27.794.31 1.671.043.95.052 1.234.052 3.637s-.009 2.688-.052 3.637c-.04.877-.187 1.354-.31 1.67-.163.421-.358.72-.673 1.036a2.79 2.79 0 0 1-1.035.673c-.317.123-.794.27-1.671.31-.95.043-1.234.052-3.637.052s-2.688-.009-3.637-.052c-.877-.04-1.354-.187-1.67-.31a2.789 2.789 0 0 1-1.036-.673 2.79 2.79 0 0 1-.673-1.035c-.123-.317-.27-.794-.31-1.671-.043-.95-.052-1.234-.052-3.637s.009-2.688.052-3.637c.04-.877.187-1.354.31-1.67.163-.421.358-.72.673-1.036.315-.315.615-.51 1.035-.673.317-.123.794-.27 1.671-.31.95-.043 1.234-.052 3.637-.052Z"
        );
      });
    });
  });

  describe("LinkedInIcon", () => {
    describe("Basic Rendering", () => {
      it("renders LinkedIn icon correctly", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("test-id-icon-linkedin-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<LinkedInIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-linkedin-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<LinkedInIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-linkedin-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<LinkedInIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-linkedin-root");
        expect(icon).toHaveAttribute(
          "data-icon-linkedin-id",
          "custom-id-icon-linkedin"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("test-id-icon-linkedin-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("test-id-icon-linkedin-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<LinkedInIcon />);
        const icon = screen.getByTestId("test-id-icon-linkedin-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M18.335 18.339H15.67v-4.177c0-.996-.02-2.278-1.39-2.278-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387 2.7 0 3.2 1.778 3.2 4.091v4.715zM7.003 8.575a1.546 1.546 0 01-1.548-1.549 1.548 1.548 0 111.547 1.549zm1.336 9.764H5.666V9.75H8.34v8.589zM19.67 3H4.329C3.593 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.338C20.4 21 21 20.42 21 19.703V4.297C21 3.58 20.4 3 19.666 3h.003z"
        );
      });
    });
  });

  describe("GitHubIcon", () => {
    describe("Basic Rendering", () => {
      it("renders GitHub icon correctly", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("test-id-icon-github-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<GitHubIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-github-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<GitHubIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-github-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<GitHubIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-github-root");
        expect(icon).toHaveAttribute(
          "data-icon-github-id",
          "custom-id-icon-github"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("test-id-icon-github-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("test-id-icon-github-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<GitHubIcon />);
        const icon = screen.getByTestId("test-id-icon-github-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M12 2C6.475 2 2 6.588 2 12.253c0 4.537 2.862 8.369 6.838 9.727.5.09.687-.218.687-.487 0-.243-.013-1.05-.013-1.91C7 20.059 6.35 18.957 6.15 18.38c-.113-.295-.6-1.205-1.025-1.448-.35-.192-.85-.667-.013-.68.788-.012 1.35.744 1.538 1.051.9 1.551 2.338 1.116 2.912.846.088-.666.35-1.115.638-1.371-2.225-.256-4.55-1.14-4.55-5.062 0-1.115.387-2.038 1.025-2.756-.1-.256-.45-1.307.1-2.717 0 0 .837-.269 2.75 1.051.8-.23 1.65-.346 2.5-.346.85 0 1.7.115 2.5.346 1.912-1.333 2.75-1.05 2.75-1.05.55 1.409.2 2.46.1 2.716.637.718 1.025 1.628 1.025 2.756 0 3.934-2.337 4.806-4.562 5.062.362.32.675.936.675 1.897 0 1.371-.013 2.473-.013 2.82 0 .268.188.589.688.486a10.039 10.039 0 0 0 4.932-3.74A10.447 10.447 0 0 0 22 12.253C22 6.588 17.525 2 12 2Z"
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
        const icon = screen.getByTestId("test-id-icon-close-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<CloseIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-close-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<CloseIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-close-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<CloseIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-close-root");
        expect(icon).toHaveAttribute(
          "data-icon-close-id",
          "custom-id-icon-close"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<CloseIcon />);
        const icon = screen.getByTestId("test-id-icon-close-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<CloseIcon />);
        const icon = screen.getByTestId("test-id-icon-close-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<CloseIcon />);
        const icon = screen.getByTestId("test-id-icon-close-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
        );
      });
    });
  });

  describe("SunIcon", () => {
    describe("Basic Rendering", () => {
      it("renders sun icon correctly", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("test-id-icon-sun-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<SunIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-sun-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<SunIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-sun-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<SunIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-sun-root");
        expect(icon).toHaveAttribute("data-icon-sun-id", "custom-id-icon-sun");
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("test-id-icon-sun-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("test-id-icon-sun-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<SunIcon />);
        const icon = screen.getByTestId("test-id-icon-sun-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M8 12.25A4.25 4.25 0 0 1 12.25 8v0a4.25 4.25 0 0 1 4.25 4.25v0a4.25 4.25 0 0 1-4.25 4.25v0A4.25 4.25 0 0 1 8 12.25v0Z"
        );
      });
    });
  });

  describe("MoonIcon", () => {
    describe("Basic Rendering", () => {
      it("renders moon icon correctly", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("test-id-icon-moon-root");
        expect(icon).toBeInTheDocument();
        expect(icon.tagName).toBe("svg");
      });

      it("applies custom className", () => {
        render(<MoonIcon className="custom-class" />);
        const icon = screen.getByTestId("test-id-icon-moon-root");
        expect(icon).toHaveClass("custom-class");
      });

      it("renders with debug mode enabled", () => {
        render(<MoonIcon _debugMode={true} />);
        const icon = screen.getByTestId("test-id-icon-moon-root");
        expect(icon).toHaveAttribute("data-debug-mode", "true");
      });

      it("renders with custom component ID", () => {
        render(<MoonIcon _internalId="custom-id" />);
        const icon = screen.getByTestId("custom-id-icon-moon-root");
        expect(icon).toHaveAttribute(
          "data-icon-moon-id",
          "custom-id-icon-moon"
        );
      });
    });

    describe("SVG Structure", () => {
      it("has correct viewBox", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("test-id-icon-moon-root");
        expect(icon).toHaveAttribute("viewBox", "0 0 24 24");
      });

      it("has aria-hidden attribute", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("test-id-icon-moon-root");
        expect(icon).toHaveAttribute("aria-hidden", "true");
      });

      it("contains path element", () => {
        render(<MoonIcon />);
        const icon = screen.getByTestId("test-id-icon-moon-root");
        const path = icon.querySelector("path");
        expect(path).toBeInTheDocument();
        expect(path).toHaveAttribute(
          "d",
          "M17.25 16.22a6.937 6.937 0 0 1-9.47-9.47 7.451 7.451 0 1 0 9.47 9.47ZM12.75 7C17 7 17 2.75 17 2.75S17 7 21.25 7C17 7 17 11.25 17 11.25S17 7 12.75 7Z"
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
          testId: "test-id-icon-chevron-down-root",
        },
        {
          component: <ChevronRightIcon key="chevron-right" />,
          testId: "test-id-icon-chevron-right-root",
        },
        {
          component: <ArrowLeftIcon key="arrow-left" />,
          testId: "test-id-icon-arrow-left-root",
        },
        { component: <XIcon key="x" />, testId: "test-id-icon-x-twitter-root" },
        {
          component: <InstagramIcon key="instagram" />,
          testId: "test-id-icon-instagram-root",
        },
        {
          component: <LinkedInIcon key="linkedin" />,
          testId: "test-id-icon-linkedin-root",
        },
        {
          component: <GitHubIcon key="github" />,
          testId: "test-id-icon-github-root",
        },
        {
          component: <CloseIcon key="close" />,
          testId: "test-id-icon-close-root",
        },
        { component: <SunIcon key="sun" />, testId: "test-id-icon-sun-root" },
        {
          component: <MoonIcon key="moon" />,
          testId: "test-id-icon-moon-root",
        },
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
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      expect(icon).toHaveAttribute("width", "32");
      expect(icon).toHaveAttribute("height", "32");
      expect(icon).toHaveAttribute("fill", "currentColor");
      expect(icon).toHaveAttribute("stroke", "none");
      expect(icon).toHaveAttribute("style", "color: red;");
    });

    it("handles event handlers", () => {
      const handleClick = vi.fn();
      render(<ChevronDownIcon onClick={handleClick} />);
      const icon = screen.getByTestId("test-id-icon-chevron-down-root");
      fireEvent.click(icon);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("handles ref forwarding", () => {
      const ref = React.createRef<SVGSVGElement>();
      render(<ChevronDownIcon ref={ref} />);
      expect(ref.current).toBeInstanceOf(SVGSVGElement);
      expect(ref.current).toHaveAttribute(
        "data-testid",
        "test-id-icon-chevron-down-root"
      );
    });
  });
});
