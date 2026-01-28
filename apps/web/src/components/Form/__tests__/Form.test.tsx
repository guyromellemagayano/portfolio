/**
 * @file Form.test.tsx
 * @author Guy Romelle Magayano
 * @description Unit tests for the Form component.
 */

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Form, MemoizedForm } from "../Form";

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

    it("returns null when no children", () => {
      const { container } = render(<Form />);
      expect(container).toBeEmptyDOMElement();
    });

    it("renders with role form", () => {
      render(
        <Form>
          <input type="text" />
        </Form>
      );
      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
      expect(form.tagName).toBe("FORM");
    });
  });

  // ============================================================================
  // POLYMORPHIC AS PROP TESTS
  // ============================================================================

  describe("Polymorphic as=", () => {
    it('renders as form element by default', () => {
      render(
        <Form>
          <input type="text" />
        </Form>
      );
      const form = screen.getByRole("form");
      expect(form.tagName).toBe("FORM");
    });

    it("applies role form attribute", () => {
      render(
        <Form>
          <input type="text" />
        </Form>
      );
      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("role", "form");
    });
  });

  // ============================================================================
  // FORM ATTRIBUTES TESTS
  // ============================================================================

  describe("Form Attributes", () => {
    it("forwards HTML form attributes", () => {
      render(
        <Form method="post" action="/submit" encType="multipart/form-data">
          <input type="text" />
        </Form>
      );

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("action", "/submit");
      expect(form).toHaveAttribute("encType", "multipart/form-data");
    });

    it("passes through custom data attributes", () => {
      render(
        <Form data-custom="value" data-test="test">
          <input type="text" />
        </Form>
      );

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("data-custom", "value");
      expect(form).toHaveAttribute("data-test", "test");
    });

    it("forwards event handlers", () => {
      const onSubmit = vi.fn();
      render(
        <Form onSubmit={onSubmit}>
          <input type="text" />
          <button type="submit">Submit</button>
        </Form>
      );

      const form = screen.getByRole("form");
      expect(form).toBeInTheDocument();
    });
  });

  // ============================================================================
  // MEMOIZATION TESTS
  // ============================================================================

  describe("Memoization", () => {
    it("MemoizedForm renders children", () => {
      render(
        <MemoizedForm>
          <input type="text" />
        </MemoizedForm>
      );
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });
});

describe("Form.Newsletter", () => {
  // ============================================================================
  // BASIC RENDERING TESTS
  // ============================================================================

  describe("Basic Rendering", () => {
    it("renders newsletter form correctly", () => {
      render(<Form.Newsletter />);

      expect(screen.getByRole("form")).toBeInTheDocument();
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
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      expect(form.tagName).toBe("FORM");
    });

    it("renders heading with icon", () => {
      render(<Form.Newsletter />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Stay up to date");
      expect(screen.getByTestId("icon-mail")).toBeInTheDocument();
    });

    it("renders description text", () => {
      render(<Form.Newsletter />);

      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
    });

    it("renders email input with correct attributes", () => {
      render(<Form.Newsletter />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "Email address");
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
      expect(emailInput).toBeRequired();
    });

    it("renders submit button with correct text", () => {
      render(<Form.Newsletter />);

      const submitButton = screen.getByRole("button", { name: "Join" });
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Join");
    });
  });

  // ============================================================================
  // FORM ATTRIBUTES TESTS
  // ============================================================================

  describe("Form Attributes", () => {
    it("sets default action attribute", () => {
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("action", "/thank-you");
    });

    it("allows custom action attribute", () => {
      render(<Form.Newsletter action="/custom-action" />);

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("action", "/custom-action");
    });

    it("forwards all HTML form attributes", () => {
      render(
        <Form.Newsletter
          method="post"
          encType="multipart/form-data"
          data-custom="value"
        />
      );

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("encType", "multipart/form-data");
      expect(form).toHaveAttribute("data-custom", "value");
    });

    it("passes through HTML attributes", () => {
      render(
        <Form.Newsletter
          aria-label="Newsletter subscription form"
          data-custom="value"
        />
      );

      const form = screen.getByRole("form");
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
      render(<Form.Newsletter />);

      const form = screen.getByRole("form");
      expect(form).toHaveClass("rounded-2xl");
      expect(form).toHaveClass("border");
      expect(form).toHaveClass("border-zinc-100");
      expect(form).toHaveClass("p-6");
    });

    it("merges custom className with base classes", () => {
      render(<Form.Newsletter className="custom-form-class" />);

      const form = screen.getByRole("form");
      expect(form).toHaveClass("custom-form-class");
      expect(form).toHaveClass("rounded-2xl");
    });

    it("handles multiple custom classes", () => {
      render(<Form.Newsletter className="class1 class2 class3" />);

      const form = screen.getByRole("form");
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
      render(<Form.Newsletter />);

      const formElement = screen.getByRole("form");
      expect(formElement).toBeInTheDocument();

      const headingElement = screen.getByRole("heading", { level: 2 });
      expect(headingElement).toBeInTheDocument();

      const textboxElement = screen.getByRole("textbox");
      expect(textboxElement).toBeInTheDocument();

      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to form elements", () => {
      render(<Form.Newsletter />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
    });

    it("ensures proper form landmark structure", () => {
      render(<Form.Newsletter />);

      const formElement = screen.getByRole("form");
      expect(formElement).toBeInTheDocument();

      const heading = screen.getByRole("heading", { level: 2 });
      const textbox = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      expect(formElement).toContainElement(heading);
      expect(formElement).toContainElement(textbox);
      expect(formElement).toContainElement(button);
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(<Form.Newsletter aria-label="Custom form label" />);

      const formElement = screen.getByRole("form");
      expect(formElement).toHaveAttribute("aria-label", "Custom form label");
    });
  });

  // ============================================================================
  // EDGE CASES TESTS
  // ============================================================================

  describe("Edge Cases", () => {
    it("handles special characters in attributes", () => {
      render(
        <Form.Newsletter
          action="/path?param=value&other=test"
          data-special="special chars: <>&"
        />
      );

      const form = screen.getByRole("form");
      expect(form).toHaveAttribute("action", "/path?param=value&other=test");
      expect(form).toHaveAttribute("data-special", "special chars: <>&");
    });
  });
});
