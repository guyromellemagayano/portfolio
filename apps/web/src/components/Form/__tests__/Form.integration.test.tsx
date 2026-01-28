/**
 * @file Form.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Form component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form } from "../Form";

import "@testing-library/jest-dom";

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: vi.fn((namespace: string) => {
    const translations: Record<string, any> = {
      "form.newsletterForm": {
        heading: "Stay up to date",
        description:
          "Get notified when I publish something new, and unsubscribe at any time.",
        emailAddressLabel: "Email address",
        joinButtonTextLabel: "Join",
      },
    };

    return (key: string) => {
      const keys = key.split(".");
      let value: any = translations[namespace];

      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }

      return value || key;
    };
  }),
}));

// Mock components
vi.mock("@web/components/button", () => ({
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="grm-button" {...props}>
      {children}
    </button>
  )),
}));

vi.mock("@web/components/icon/Icon", () => ({
  Icon: vi.fn(({ name, ...props }) => (
    <svg data-testid={`icon-${name}`} {...props} />
  )),
}));

vi.mock("@web/utils/helpers", () => ({
  cn: vi.fn((...classes: string[]) => classes.filter(Boolean).join(" ")),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Form Integration Tests", () => {
  // ============================================================================
  // DEFAULT FORM INTEGRATION
  // ============================================================================

  describe("Default Form", () => {
    it("renders default form with form controls end-to-end", () => {
      render(
        <Form>
          <input type="text" name="name" />
          <button type="submit">Submit</button>
        </Form>
      );

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });

    it("renders default variant with form semantics", () => {
      render(
        <Form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <button type="submit">Submit</button>
        </Form>
      );

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe("FORM");
      expect(form).toHaveAttribute("role", "form");
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    });
  });

  // ============================================================================
  // NEWSLETTER FORM INTEGRATION
  // ============================================================================

  describe("Newsletter Form", () => {
    it("renders newsletter form with heading and form controls", () => {
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute("role", "form");
      expect(form).toHaveAttribute("action", "/thank-you");
      expect(form).toHaveClass(
        "rounded-2xl",
        "border",
        "border-zinc-100",
        "p-6",
        "dark:border-zinc-700/40"
      );

      // Check heading
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Stay up to date");
      expect(screen.getByTestId("icon-mail")).toBeInTheDocument();

      // Check description
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();

      // Check form controls
      expect(
        screen.getByRole("textbox", { name: "Email address" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();
    });

    it("renders newsletter form with custom action and merged className", () => {
      render(<Form.Newsletter action="/custom-action" className="custom-class" />);

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("action", "/custom-action");
      expect(form).toHaveClass("custom-class", "rounded-2xl");
    });

    it("renders complete newsletter form with all sub-components", () => {
      render(<Form.Newsletter />);

      // Check main form
      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe("FORM");

      // Check heading with icon
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Stay up to date");
      expect(screen.getByTestId("icon-mail")).toBeInTheDocument();

      // Check description
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();

      // Check email input
      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "Email address");
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
      expect(emailInput).toBeRequired();

      // Check submit button
      const submitButton = screen.getByRole("button", { name: "Join" });
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Join");
    });

    it("renders newsletter form with proper DOM structure", () => {
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      const heading = screen.getByRole("heading", { level: 2 });
      const emailInput = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button");

      // Verify nesting
      expect(form).toContainElement(heading);
      expect(form).toContainElement(emailInput);
      expect(form).toContainElement(submitButton);
    });

    it("uses semantic HTML5 form element", () => {
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      expect(form.tagName).toBe("FORM");
    });

    it("provides accessible names for form elements", () => {
      render(<Form.Newsletter />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
    });

    it("uses descriptive text for form elements", () => {
      render(<Form.Newsletter />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Stay up to date");

      const submitButton = screen.getByRole("button");
      expect(submitButton).toHaveTextContent("Join");
    });

    it("applies proper form structure", () => {
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("role", "form");
      expect(form).toHaveAttribute("action", "/thank-you");
    });
  });

  // ============================================================================
  // COMPOUND COMPONENT INTEGRATION
  // ============================================================================

  describe("Compound Component Integration", () => {
    it("exposes Newsletter as compound component", () => {
      expect(Form.Newsletter).toBeDefined();
      expect(typeof Form.Newsletter).toBe("function");
    });

    it("renders Form.Newsletter independently", () => {
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
    });
  });
});
