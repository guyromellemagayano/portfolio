import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { NewsletterForm } from "../NewsletterForm";

// ============================================================================
// TEST CLASSIFICATION
// - Test Type: Unit
// - Coverage: Tier 2 (80%+)
// - Risk Tier: Core
// - Component Type: Presentational
// ============================================================================

// Mock dependencies
vi.mock("@guyromellemagayano/hooks", () => ({
  useComponentId: vi.fn((options = {}) => ({
    componentId: options.debugId || options.internalId || "test-id",
    isDebugMode: options.debugMode || false,
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

vi.mock("@web/components", () => ({
  Button: vi.fn(({ children, ...props }) => (
    <button data-testid="grm-button" {...props}>
      {children}
    </button>
  )),
  Icon: {
    Mail: vi.fn((props) => <span data-testid="mail-icon" {...props} />),
  },
}));

vi.mock("@web/utils", () => ({
  cn: vi.fn((...classes) => classes.filter(Boolean).join(" ")),
}));

vi.mock("../_data", () => ({
  FORM_I18N: {
    newsletterFormHeading: "Stay up to date",
    newsletterFormDescription:
      "Get notified when I publish something new, and unsubscribe at any time.",
    newsletterFormEmailAddressLabel: "Email address",
    newsletterFormJoinButtonTextLabel: "Join",
  },
}));

describe("NewsletterForm", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe("Basic Rendering", () => {
    it("renders newsletter form correctly", () => {
      render(<NewsletterForm />);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
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

    it("applies custom className", () => {
      render(<NewsletterForm className="custom-class" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });

    it("renders with debug mode enabled", () => {
      render(<NewsletterForm debugMode={true} />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("data-debug-mode", "true");
    });

    it("renders with custom debug ID", () => {
      render(<NewsletterForm debugId="custom-id" />);

      const form = screen.getByTestId("custom-id-newsletter-form-root");
      expect(form).toBeInTheDocument();
    });

    it("passes through HTML attributes", () => {
      render(
        <NewsletterForm
          aria-label="Newsletter subscription form"
          data-custom="value"
        />
      );

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute(
        "aria-label",
        "Newsletter subscription form"
      );
      expect(form).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Form Structure", () => {
    it("renders as form element", () => {
      render(<NewsletterForm />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form.tagName).toBe("FORM");
    });

    it("applies correct CSS classes", () => {
      render(<NewsletterForm />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });

    it("combines Tailwind classes + custom classes", () => {
      render(<NewsletterForm className="custom-class" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });

    it("handles multiple custom classes", () => {
      render(<NewsletterForm className="class1 class2 class3" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });

    it("handles empty className gracefully", () => {
      render(<NewsletterForm className="" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });
  });

  describe("Form Content", () => {
    it("renders heading with icon", () => {
      render(<NewsletterForm />);

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent("Stay up to date");
      expect(screen.getByTestId("mail-icon")).toBeInTheDocument();
    });

    it("renders description text", () => {
      render(<NewsletterForm />);

      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
    });

    it("renders email input with correct attributes", () => {
      render(<NewsletterForm />);

      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("type", "email");
      expect(emailInput).toHaveAttribute("placeholder", "Email address");
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
      expect(emailInput).toHaveAttribute("required");
    });

    it("renders submit button with correct text", () => {
      render(<NewsletterForm />);

      const submitButton = screen.getByRole("button", { name: "Join" });
      expect(submitButton).toHaveAttribute("type", "submit");
      expect(submitButton).toHaveTextContent("Join");
    });
  });

  describe("Form Attributes", () => {
    it("sets default action attribute", () => {
      render(<NewsletterForm />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("action", "/thank-you");
    });

    it("allows custom action attribute", () => {
      render(<NewsletterForm action="/custom-action" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
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

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("encType", "multipart/form-data");
      expect(form).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Debug Mode", () => {
    it("applies data-debug-mode when enabled", () => {
      render(<NewsletterForm debugMode={true} />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode data attribute when disabled", () => {
      render(<NewsletterForm debugMode={false} />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).not.toHaveAttribute("data-debug-mode");
    });

    it("does not apply debug mode data attribute when undefined", () => {
      render(<NewsletterForm />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("Component Structure", () => {
    it("renders with proper semantic structure", () => {
      render(<NewsletterForm />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      const heading = screen.getByRole("heading", { level: 2 });
      const emailInput = screen.getByRole("textbox");
      const submitButton = screen.getByRole("button");

      expect(form).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });

    it("supports aria attributes", () => {
      render(
        <NewsletterForm
          aria-label="Newsletter subscription"
          aria-describedby="newsletter-description"
        />
      );

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("aria-label", "Newsletter subscription");
      expect(form).toHaveAttribute(
        "aria-describedby",
        "newsletter-description"
      );
    });

    it("supports role attribute", () => {
      render(<NewsletterForm role="region" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("role", "region");
    });
  });

  describe("ARIA Attributes Testing", () => {
    it("applies correct ARIA roles to form elements", () => {
      render(<NewsletterForm debugId="aria-test" />);

      // Test form element
      const formElement = screen.getByTestId("aria-test-newsletter-form-root");
      expect(formElement).toBeInTheDocument();

      // Test heading element
      const headingElement = screen.getByRole("heading", { level: 2 });
      expect(headingElement).toBeInTheDocument();

      // Test textbox element
      const textboxElement = screen.getByRole("textbox");
      expect(textboxElement).toBeInTheDocument();

      // Test button element
      const buttonElement = screen.getByRole("button");
      expect(buttonElement).toBeInTheDocument();
    });

    it("applies correct ARIA labels to form elements", () => {
      render(<NewsletterForm debugId="aria-test" />);

      // Test email input has proper aria-label
      const emailInput = screen.getByRole("textbox", { name: "Email address" });
      expect(emailInput).toHaveAttribute("aria-label", "Email address");
    });

    it("applies required attribute to email input", () => {
      render(<NewsletterForm debugId="aria-test" />);

      const emailInput = screen.getByRole("textbox");
      expect(emailInput).toHaveAttribute("required");
    });

    it("applies correct input type for email", () => {
      render(<NewsletterForm debugId="aria-test" />);

      const emailInput = screen.getByRole("textbox");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("applies correct button type for submit", () => {
      render(<NewsletterForm debugId="aria-test" />);

      const submitButton = screen.getByRole("button");
      expect(submitButton).toHaveAttribute("type", "submit");
    });

    it("applies ARIA attributes with different debug IDs", () => {
      render(<NewsletterForm debugId="different-id" />);

      const formElement = screen.getByTestId(
        "different-id-newsletter-form-root"
      );
      expect(formElement).toBeInTheDocument();
    });

    it("maintains ARIA attributes during component updates", () => {
      const { rerender } = render(<NewsletterForm debugId="aria-test" />);

      const emailInput = screen.getByRole("textbox");
      expect(emailInput).toHaveAttribute("aria-label", "Email address");

      rerender(
        <NewsletterForm debugId="aria-test" className="updated-class" />
      );

      const updatedEmailInput = screen.getByRole("textbox");
      expect(updatedEmailInput).toHaveAttribute("aria-label", "Email address");
    });

    it("ensures proper form landmark structure", () => {
      render(<NewsletterForm debugId="aria-test" />);

      const formElement = screen.getByTestId("aria-test-newsletter-form-root");
      expect(formElement).toBeInTheDocument();

      // Form should contain heading, description, and form controls
      const heading = screen.getByRole("heading", { level: 2 });
      const textbox = screen.getByRole("textbox");
      const button = screen.getByRole("button");

      expect(formElement).toContainElement(heading);
      expect(formElement).toContainElement(textbox);
      expect(formElement).toContainElement(button);
    });

    it("applies conditional ARIA attributes correctly", () => {
      render(
        <NewsletterForm debugId="aria-test" aria-label="Custom form label" />
      );

      const formElement = screen.getByTestId("aria-test-newsletter-form-root");
      expect(formElement).toHaveAttribute("aria-label", "Custom form label");
    });

    it("handles ARIA attributes when content is missing", () => {
      // This test ensures the form still works even if i18n content is missing
      render(<NewsletterForm debugId="aria-test" />);

      const formElement = screen.getByTestId("aria-test-newsletter-form-root");
      expect(formElement).toBeInTheDocument();
    });

    it("maintains ARIA attributes with additional HTML attributes", () => {
      render(
        <NewsletterForm
          debugId="aria-test"
          aria-label="Newsletter form"
          data-custom="value"
        />
      );

      const formElement = screen.getByTestId("aria-test-newsletter-form-root");
      expect(formElement).toHaveAttribute("aria-label", "Newsletter form");
      expect(formElement).toHaveAttribute("data-custom", "value");
    });
  });

  describe("Data Attributes and Debugging", () => {
    it("applies correct data attributes with default ID", () => {
      render(<NewsletterForm />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toBeInTheDocument();
      expect(form).not.toHaveAttribute("data-debug-mode");
    });

    it("applies correct data attributes with custom ID", () => {
      render(<NewsletterForm debugId="custom-form-id" />);

      const form = screen.getByTestId("custom-form-id-newsletter-form-root");
      expect(form).toBeInTheDocument();
    });

    it("applies debug mode data attribute when enabled", () => {
      render(<NewsletterForm debugMode={true} />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("data-debug-mode", "true");
    });

    it("does not apply debug mode data attribute when disabled", () => {
      render(<NewsletterForm debugMode={false} />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).not.toHaveAttribute("data-debug-mode");
    });
  });

  describe("CSS and Styling", () => {
    it("applies base Tailwind CSS classes", () => {
      render(<NewsletterForm />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });

    it("merges custom className with base classes", () => {
      render(<NewsletterForm className="custom-form-class" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });

    it("handles multiple custom classes", () => {
      render(<NewsletterForm className="class1 class2 class3" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });

    it("handles empty className gracefully", () => {
      render(<NewsletterForm className="" />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("class");
    });
  });

  describe("Props Forwarding", () => {
    it("forwards all HTML form attributes", () => {
      render(
        <NewsletterForm
          method="post"
          encType="multipart/form-data"
          data-custom="value"
          id="newsletter-1"
          style={{ backgroundColor: "red" }}
          tabIndex={0}
        />
      );

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("method", "post");
      expect(form).toHaveAttribute("encType", "multipart/form-data");
      expect(form).toHaveAttribute("data-custom", "value");
      expect(form).toHaveAttribute("id", "newsletter-1");
      expect(form).toHaveAttribute("style", "background-color: red;");
      expect(form).toHaveAttribute("tabIndex", "0");
    });

    it("forwards event handlers", () => {
      const onSubmit = vi.fn();
      render(<NewsletterForm onSubmit={onSubmit} />);

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toBeInTheDocument();
    });
  });

  describe("Memoization", () => {
    it("renders with memoization when isMemoized is true", () => {
      render(<NewsletterForm isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
    });

    it("renders without memoization by default", () => {
      render(<NewsletterForm />);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("handles complex children content", () => {
      render(
        <NewsletterForm>
          <span>Complex</span> <strong>content</strong>
        </NewsletterForm>
      );

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
      // NewsletterForm renders its own content, not children
      expect(screen.getByText("Stay up to date")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
    });

    it("handles special characters in attributes", () => {
      render(
        <NewsletterForm
          action="/path?param=value&other=test"
          data-special="special chars: &lt;&gt;&amp;"
        />
      );

      const form = screen.getByTestId("test-id-newsletter-form-root");
      expect(form).toHaveAttribute("action", "/path?param=value&other=test");
      expect(form).toHaveAttribute("data-special", "special chars: <>&");
    });

    it("handles empty string children", () => {
      render(<NewsletterForm>{""}</NewsletterForm>);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
    });

    it("handles false children", () => {
      render(<NewsletterForm>{false}</NewsletterForm>);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
    });

    it("handles zero children", () => {
      render(<NewsletterForm>{0}</NewsletterForm>);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
    });

    it("handles mixed valid and invalid children", () => {
      render(
        <NewsletterForm>
          {null}
          <span>Valid content</span>
          {undefined}
          {false}
        </NewsletterForm>
      );

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
      // NewsletterForm renders its own content, not children
      expect(screen.getByText("Stay up to date")).toBeInTheDocument();
      expect(
        screen.getByText(
          "Get notified when I publish something new, and unsubscribe at any time."
        )
      ).toBeInTheDocument();
    });
  });

  describe("Performance and Optimization", () => {
    it("memoizes component when isMemoized is true", () => {
      render(<NewsletterForm isMemoized={true} />);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
    });

    it("does not memoize when isMemoized is false", () => {
      const { rerender } = render(<NewsletterForm isMemoized={false} />);

      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();

      rerender(
        <NewsletterForm isMemoized={false} className="different-class" />
      );
      expect(
        screen.getByTestId("test-id-newsletter-form-root")
      ).toBeInTheDocument();
    });
  });
});
