/**
 * @file Form.integration.test.tsx
 * @author Guy Romelle Magayano
 * @description Integration tests for the Form component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form, NewsletterForm } from "../Form";

import "@testing-library/jest-dom";

const mockUseComponentId = vi.hoisted(() =>
  vi.fn((options: { internalId?: string; debugMode?: boolean } = {}) => ({
    id: options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
  }))
);

vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

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
}));

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
        <Form aria-label="Default form">
          <input type="text" name="name" />
          <button type="submit">Submit</button>
        </Form>
      );

      const form = screen.getByRole("form", { name: "Default form" });
      expect(form).toBeInTheDocument();
      expect(screen.getByRole("textbox")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });

    it("renders default variant with form semantics", () => {
      render(
        <Form aria-label="Email form">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
          <button type="submit">Submit</button>
        </Form>
      );

      const form = screen.getByRole("form", { name: "Email form" });
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe("FORM");
      expect(form).toHaveAttribute("role", "form");
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Submit" })
      ).toBeInTheDocument();
    });
  });

  // ============================================================================
  // NEWSLETTER FORM INTEGRATION
  // ============================================================================

  describe("Newsletter Form", () => {
    it("renders newsletter form with heading and form controls", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toBeInTheDocument();
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
      expect(heading).toHaveAttribute("id");

      const icon = screen.getByTestId("icon-mail");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");

      // Check description
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();

      // Check form controls
      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute("id");
      expect(emailInput).toHaveAttribute("name", "email");
      expect(emailInput).toHaveAttribute("autocomplete", "email");

      expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();

      // Check form ARIA relationships
      expect(form).toHaveAttribute("aria-labelledby");
      expect(form).toHaveAttribute("aria-describedby");
      expect(form).toHaveAttribute("method", "post");
    });

    it("renders newsletter form with custom action and merged className", () => {
      render(
        <NewsletterForm action="/custom-action" className="custom-class" />
      );

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveAttribute("action", "/custom-action");
      expect(form).toHaveClass("custom-class", "rounded-2xl");
    });

    it("renders complete newsletter form with all sub-components", () => {
      render(<NewsletterForm />);

      // Check main form
      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe("FORM");

      // Check heading with icon
      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Stay up to date");
      expect(heading).toHaveAttribute("id");

      const icon = screen.getByTestId("icon-mail");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");

      // Check description
      const description = screen.getByText(
        "Get notified when I publish something new, and unsubscribe at any time."
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute("id");

      // Check email input
      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("name", "email");
      expect(emailInput).toHaveAttribute("autocomplete", "email");
      expect(emailInput).toHaveAttribute("inputmode", "email");
      expect(emailInput).toHaveAttribute("spellcheck", "false");
      expect(emailInput).toHaveAttribute("placeholder", "Email address");
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
      expect(emailInput).toBeRequired();
      expect(emailInput).toBeRequired();
      expect(emailInput).toHaveAttribute("id");

      // Check label element
      const emailInputId = emailInput.getAttribute("id");
      const label = document.querySelector(`label[for="${emailInputId}"]`);
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("sr-only");
      expect(label?.getAttribute("for")).toBe(emailInputId);
      expect(label).toHaveTextContent("Email address");

      // Check submit button
      const submitButton = screen.getByRole("button", { name: "Join" });
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Join");
    });

    it("renders newsletter form with proper DOM structure", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      const heading = screen.getByRole("heading", { level: 2 });
      const emailInput = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button");

      // Verify nesting
      expect(form).toContainElement(heading);
      expect(form).toContainElement(emailInput);
      expect(form).toContainElement(submitButton);
    });

    it("uses semantic HTML5 form element", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form.tagName).toBe("FORM");
    });

    it("provides accessible names for form elements", () => {
      render(<NewsletterForm />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
      expect(emailInput).toBeRequired();

      // Check for screen reader only label
      const emailInputId = emailInput.getAttribute("id");
      const label = document.querySelector(`label[for="${emailInputId}"]`);
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("sr-only");
      expect(label).toHaveTextContent("Email address");
    });

    it("uses descriptive text for form elements", () => {
      render(<NewsletterForm />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("Stay up to date");

      const submitButton = screen.getByRole("button");
      expect(submitButton).toHaveTextContent("Join");
    });

    it("applies proper form structure", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveAttribute("action", "/thank-you");
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("aria-labelledby");
      expect(form).toHaveAttribute("aria-describedby");
    });

    it("applies correct ARIA relationships between form elements", () => {
      render(<NewsletterForm />);

      const formElement = screen.getByRole("form", {
        name: /stay up to date/i,
      });
      const heading = screen.getByRole("heading", { level: 2 });
      const description = screen.getByText(
        "Get notified when I publish something new, and unsubscribe at any time."
      );

      // Verify ARIA relationships
      const headingId = heading.getAttribute("id");
      const descriptionId = description.getAttribute("id");

      expect(headingId).toBeTruthy();
      expect(descriptionId).toBeTruthy();
      expect(formElement).toHaveAttribute("aria-labelledby", headingId);
      expect(formElement).toHaveAttribute("aria-describedby", descriptionId);
    });

    it("ensures unique IDs for all form elements", () => {
      render(<NewsletterForm />);

      const heading = screen.getByRole("heading", { level: 2 });
      const description = screen.getByText(
        "Get notified when I publish something new, and unsubscribe at any time."
      );
      const emailInput = screen.getByRole("textbox", { name: "Email address" });

      const headingId = heading.getAttribute("id");
      const descriptionId = description.getAttribute("id");
      const emailInputId = emailInput.getAttribute("id");

      // All IDs should be unique
      expect(headingId).toBeTruthy();
      expect(descriptionId).toBeTruthy();
      expect(emailInputId).toBeTruthy();
      expect(headingId).not.toBe(descriptionId);
      expect(headingId).not.toBe(emailInputId);
      expect(descriptionId).not.toBe(emailInputId);
    });
  });

  // ============================================================================
  // COMPOUND COMPONENT INTEGRATION
  // ============================================================================

  describe("Compound Component Integration", () => {
    it("exposes Newsletter as compound component", () => {
      expect(NewsletterForm).toBeDefined();
      expect(typeof NewsletterForm).toBe("function");
    });

    it("renders NewsletterForm independently", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toBeInTheDocument();
    });
  });
});
