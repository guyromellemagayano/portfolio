/**
 * @file Form.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Form component.
 */

import React from "react";

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

vi.mock("@portfolio/hooks", () => ({
  useComponentId: mockUseComponentId,
}));

vi.mock("@portfolio/utils", () => ({
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

describe("Form", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders children", () => {
      render(
        <Form>
          <input type="text" />
        </Form>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders with role form", () => {
      render(
        <Form aria-label="Default form">
          <input type="text" />
        </Form>
      );
      const form = screen.getByRole("form", { name: "Default form" });
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe("FORM");
      expect(form).toHaveAttribute("role", "form");
    });
  });

  // ============================================================================
  // CONTENT VALIDATION TESTS
  // ============================================================================

  describe("Content Validation", () => {
    it("returns null when no children", () => {
      const { container } = render(<Form />);
      expect(container).toBeEmptyDOMElement();
    });
  });

  // ============================================================================
  // POLYMORPHIC AS PROP TESTS
  // ============================================================================

  describe("Polymorphic as=", () => {
    it("renders as form element by default", () => {
      render(
        <Form aria-label="Polymorphic form">
          <input type="text" />
        </Form>
      );
      const form = screen.getByRole("form", { name: "Polymorphic form" });
      expect(form.tagName).toBe("FORM");
    });

    it("applies role form attribute", () => {
      render(
        <Form aria-label="Role form">
          <input type="text" />
        </Form>
      );
      const form = screen.getByRole("form", { name: "Role form" });
      expect(form).toHaveAttribute("role", "form");
    });
  });

  // ============================================================================
  // DEBUG MODE TESTS
  // ============================================================================

  describe("Debug Mode", () => {
    it("forwards debug data attributes", () => {
      render(
        <Form
          aria-label="Debug form"
          data-debug-mode="true"
          data-form-id="form-debug"
        >
          <input type="text" />
        </Form>
      );

      const form = screen.getByRole("form", { name: "Debug form" });
      expect(form).toHaveAttribute("data-debug-mode", "true");
      expect(form).toHaveAttribute("data-form-id", "form-debug");
    });
  });

  // ============================================================================
  // FORM ATTRIBUTES TESTS
  // ============================================================================

  describe("Form Attributes", () => {
    it("forwards HTML form attributes", () => {
      render(
        <Form
          aria-label="Submit form"
          method="post"
          action="/submit"
          encType="multipart/form-data"
        >
          <input type="text" />
        </Form>
      );

      const form = screen.getByRole("form", { name: "Submit form" });
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("action", "/submit");
      expect(form).toHaveAttribute("enctype", "multipart/form-data");
    });

    it("passes through custom data attributes", () => {
      render(
        <Form aria-label="Data form" data-custom="value" data-test="test">
          <input type="text" />
        </Form>
      );

      const form = screen.getByRole("form", { name: "Data form" });
      expect(form).toHaveAttribute("data-custom", "value");
      expect(form).toHaveAttribute("data-test", "test");
    });

    it("forwards event handlers", () => {
      const onSubmit = vi.fn();
      render(
        <Form aria-label="Submit handler form" onSubmit={onSubmit}>
          <input type="text" />
          <button type="submit">Submit</button>
        </Form>
      );

      const form = screen.getByRole("form", { name: "Submit handler form" });
      expect(form).toBeInTheDocument();
    });
  });

  // ============================================================================
  // REF FORWARDING TESTS
  // ============================================================================

  describe("Ref Forwarding Tests", () => {
    it("forwards ref to the form element", () => {
      const ref = React.createRef<HTMLFormElement>();
      render(
        <Form aria-label="Ref form" ref={ref}>
          <input type="text" />
        </Form>
      );

      expect(ref.current).toBeInstanceOf(HTMLFormElement);
      expect(ref.current?.tagName).toBe("FORM");
    });
  });

  // ============================================================================
  // ACCESSIBILITY TESTS
  // ============================================================================

  describe("Accessibility Tests", () => {
    it("supports accessible form landmark labels", () => {
      render(
        <Form aria-label="Accessible form">
          <input type="text" />
        </Form>
      );

      const form = screen.getByRole("form", { name: "Accessible form" });
      expect(form).toBeInTheDocument();
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES TESTS
  // ============================================================================

  describe("ARIA Attributes Testing", () => {
    it("forwards ARIA relationships to the form element", () => {
      render(
        <>
          <span id="form-title">Form title</span>
          <Form aria-labelledby="form-title">
            <input type="text" />
          </Form>
        </>
      );

      const form = screen.getByRole("form", { name: "Form title" });
      expect(form).toHaveAttribute("aria-labelledby", "form-title");
    });
  });
});

describe("NewsletterForm", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders newsletter form correctly", () => {
      render(<NewsletterForm />);

      expect(
        screen.getByRole("form", { name: /stay up to date/i })
      ).toBeInTheDocument();
      expect(screen.getByText("Stay up to date")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
      expect(
        screen.getByRole("textbox", { name: "Email address" })
      ).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Join" })).toBeInTheDocument();
    });

    it("renders as form element", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form.tagName).toBe("FORM");
    });

    it("renders heading with icon", () => {
      render(<NewsletterForm />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Stay up to date");
      expect(heading).toHaveAttribute("id");

      const icon = screen.getByTestId("icon-mail");
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });

    it("renders description text", () => {
      render(<NewsletterForm />);

      const description = screen.getByText(
        "Get notified when I publish something new, and unsubscribe at any time."
      );
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute("id");
    });

    it("renders email input with correct attributes", () => {
      render(<NewsletterForm />);

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
    });

    it("renders submit button with correct text", () => {
      render(<NewsletterForm />);

      const submitButton = screen.getByRole("button", { name: "Join" });
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Join");
    });
  });

  // ============================================================================
  // FORM ATTRIBUTES TESTS
  // ============================================================================

  describe("Form Attributes", () => {
    it("sets default action and method attributes", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveAttribute("action", "/thank-you");
      expect(form).toHaveAttribute("method", "post");
    });

    it("allows custom action attribute", () => {
      render(<NewsletterForm action="/custom-action" />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveAttribute("action", "/custom-action");
    });

    it("forwards all HTML form attributes", () => {
      render(
        <NewsletterForm
          method="post"
          encType="multipart/form-data"
          data-custom="value"
        />
      );

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("enctype", "multipart/form-data");
      expect(form).toHaveAttribute("data-custom", "value");
    });

    it("passes through HTML attributes", () => {
      render(
        <NewsletterForm
          aria-label="Newsletter subscription form"
          data-custom="value"
        />
      );

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveAttribute(
        "aria-label",
        "Newsletter subscription form"
      );
      expect(form).toHaveAttribute("data-custom", "value");
    });
  });

  // ============================================================================
  // CSS AND STYLING TESTS
  // ============================================================================

  describe("CSS and Styling", () => {
    it("applies base Tailwind CSS classes", () => {
      render(<NewsletterForm />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveClass("rounded-2xl");
      expect(form).toHaveClass("border");
      expect(form).toHaveClass("border-zinc-100");
      expect(form).toHaveClass("p-6");
    });

    it("merges custom className with base classes", () => {
      render(<NewsletterForm className="custom-form-class" />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveClass("custom-form-class");
      expect(form).toHaveClass("rounded-2xl");
    });

    it("handles multiple custom classes", () => {
      render(<NewsletterForm className="class1 class2 class3" />);

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveClass("class1");
      expect(form).toHaveClass("class2");
      expect(form).toHaveClass("class3");
    });
  });

  // ============================================================================
  // ARIA ATTRIBUTES TESTS
  // ============================================================================

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to form elements", () => {
      render(<NewsletterForm />);

      const formElement = screen.getByRole("form", {
        name: /stay up to date/i,
      });
      expect(formElement).toBeInTheDocument();

      const headingElement = screen.getByRole("heading", { level: 2 });
      expect(headingElement).toBeInTheDocument();

      const textboxElement = screen.getByRole("textbox");
      expect(textboxElement).toBeInTheDocument();

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to form elements", () => {
      render(<NewsletterForm />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
      expect(emailInput).toBeRequired();
    });

    it("renders screen reader only label for email input", () => {
      render(<NewsletterForm />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      const emailInputId = emailInput.getAttribute("id");

      // Find label by htmlFor attribute
      const label = document.querySelector(`label[for="${emailInputId}"]`);
      expect(label).toBeInTheDocument();
      expect(label).toHaveClass("sr-only");
      expect(label).toHaveTextContent("Email address");
    });

    it("ensures proper form landmark structure", () => {
      render(<NewsletterForm />);

      const formElement = screen.getByRole("form", {
        name: /stay up to date/i,
      });
      expect(formElement).toBeInTheDocument();

      const heading = screen.getByRole("heading", { level: 2 });
      const textbox = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      expect(formElement).toContainElement(heading);
      expect(formElement).toContainElement(textbox);
      expect(formElement).toContainElement(button);
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

      // Form should be labelled by heading
      expect(formElement).toHaveAttribute("aria-labelledby");
      expect(formElement).toHaveAttribute("aria-describedby");

      // Verify IDs match ARIA relationships
      const headingId = heading.getAttribute("id");
      const descriptionId = description.getAttribute("id");

      expect(headingId).toBeTruthy();
      expect(descriptionId).toBeTruthy();
      expect(formElement).toHaveAttribute("aria-labelledby", headingId);
      expect(formElement).toHaveAttribute("aria-describedby", descriptionId);
    });

    it("applies unique IDs for ARIA relationships", () => {
      render(<NewsletterForm />);

      const heading = screen.getByRole("heading", { level: 2 });
      const description = screen.getByText(
        "Get notified when I publish something new, and unsubscribe at any time."
      );
      const emailInput = screen.getByRole("textbox", { name: "Email address" });

      // All elements should have unique IDs
      const headingId = heading.getAttribute("id");
      const descriptionId = description.getAttribute("id");
      const emailInputId = emailInput.getAttribute("id");

      expect(headingId).toBeTruthy();
      expect(descriptionId).toBeTruthy();
      expect(emailInputId).toBeTruthy();

      // IDs should be unique
      expect(headingId).not.toBe(descriptionId);
      expect(headingId).not.toBe(emailInputId);
      expect(descriptionId).not.toBe(emailInputId);

      // Label should reference input ID
      const label = document.querySelector(`label[for="${emailInputId}"]`);
      expect(label).toBeInTheDocument();
      expect(label?.getAttribute("for")).toBe(emailInputId);
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(<NewsletterForm aria-label="Custom form label" />);

      const formElement = screen.getByRole("form", {
        name: /stay up to date/i,
      });
      expect(formElement).toHaveAttribute("aria-label", "Custom form label");
      // aria-labelledby should still be present (from heading)
      expect(formElement).toHaveAttribute("aria-labelledby");
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("handles special characters in attributes", () => {
      render(
        <NewsletterForm
          action="/path?param=value&other=test"
          data-special="special chars: <>&"
        />
      );

      const form = screen.getByRole("form", { name: /stay up to date/i });
      expect(form).toHaveAttribute("action", "/path?param=value&other=test");
      expect(form).toHaveAttribute("data-special", "special chars: <>&");
    });
  });
});
