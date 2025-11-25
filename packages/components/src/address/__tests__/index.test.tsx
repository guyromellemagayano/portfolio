import React from "react";

import { render, screen } from "@testing-library/react";

import { Address } from "..";

// Basic render test
it("renders an address element", () => {
  render(
    <Address data-testid="address-element">
      123 Main Street
      <br />
      City, State 12345
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("123 Main Street");
});

// as prop test
it("renders as a custom element with 'as' prop", () => {
  render(
    <Address as="div" data-testid="custom-div">
      456 Oak Avenue
      <br />
      Town, Province 67890
    </Address>
  );
  const div = screen.getByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("456 Oak Avenue");
});

// isClient and isMemoized props (should use Suspense with lazy components)
it("renders Suspense with lazy client components when isClient is true", async () => {
  render(
    <Address isClient data-testid="address-element">
      789 Pine Road
      <br />
      Village, Country 11111
    </Address>
  );

  // Should render the fallback (the address) immediately
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("789 Pine Road");

  // The lazy component should load and render the same content
  await screen.findByTestId("address-element");
});

it("renders Suspense with memoized lazy client components when isClient and isMemoized are true", async () => {
  render(
    <Address isClient isMemoized data-testid="address-element">
      321 Elm Street
      <br />
      Borough, District 22222
    </Address>
  );

  // Should render the fallback (the address) immediately
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("321 Elm Street");

  // The lazy component should load and render the same content
  await screen.findByTestId("address-element");
});

// ref forwarding test
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<Address ref={ref}>Ref test content</Address>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("ADDRESS");
  }
});

// address-specific attributes test
it("renders with address-specific attributes", () => {
  render(
    <Address
      data-testid="address-element"
      itemScope
      itemType="https://schema.org/PostalAddress"
    >
      <span itemProp="streetAddress">123 Main Street</span>
      <span itemProp="addressLocality">City</span>
      <span itemProp="addressRegion">State</span>
      <span itemProp="postalCode">12345</span>
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("itemscope");
  expect(address).toHaveAttribute(
    "itemtype",
    "https://schema.org/PostalAddress"
  );
  expect(screen.getByText("123 Main Street")).toHaveAttribute(
    "itemprop",
    "streetAddress"
  );
});

// children rendering test
it("renders children correctly", () => {
  render(
    <Address data-testid="address-element">
      <strong>John Doe</strong>
      <br />
      <em>CEO</em>
      <br />
      123 Business Ave
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("CEO");
  expect(address).toHaveTextContent("123 Business Ave");
  expect(address.querySelector("strong")).toBeInTheDocument();
  expect(address.querySelector("em")).toBeInTheDocument();
});

// empty children test
it("renders with empty children", () => {
  render(<Address data-testid="address-element" />);
  const address = screen.getByTestId("address-element");
  expect(address).toBeEmptyDOMElement();
});

// complex nested children test
it("renders complex nested children", () => {
  render(
    <Address data-testid="address-element">
      <div>
        <h3>Contact Information</h3>
        <p>
          <strong>John Doe</strong>
          <br />
          <em>Chief Executive Officer</em>
        </p>
        <div>
          <span>📧</span> <a href="mailto:john@example.com">john@example.com</a>
          <br />
          <span>📞</span> <a href="tel:+1234567890">+1 (234) 567-890</a>
        </div>
        <address>
          123 Business Avenue
          <br />
          Suite 100
          <br />
          New York, NY 10001
          <br />
          United States
        </address>
      </div>
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("Contact Information");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("Chief Executive Officer");
  expect(address).toHaveTextContent("john@example.com");
  expect(address).toHaveTextContent("+1 (234) 567-890");
  expect(address).toHaveTextContent("123 Business Avenue");
  expect(address).toHaveTextContent("New York, NY 10001");
  expect(address.querySelector("h3")).toBeInTheDocument();
  expect(address.querySelector("p")).toBeInTheDocument();
  expect(address.querySelectorAll("a")).toHaveLength(2);
  expect(address.querySelector("address")).toBeInTheDocument();
});

// different address types test
it("renders with different address types", () => {
  // Business address
  const { rerender } = render(
    <Address data-testid="business-address">
      <strong>Acme Corporation</strong>
      <br />
      123 Business Ave, Suite 100
      <br />
      New York, NY 10001
    </Address>
  );
  expect(screen.getByTestId("business-address")).toHaveTextContent(
    "Acme Corporation"
  );

  // Personal address
  rerender(
    <Address data-testid="personal-address">
      <strong>John Doe</strong>
      <br />
      456 Home Street
      <br />
      Los Angeles, CA 90210
    </Address>
  );
  expect(screen.getByTestId("personal-address")).toHaveTextContent("John Doe");
  expect(screen.getByTestId("personal-address")).toHaveTextContent(
    "456 Home Street"
  );

  // International address
  rerender(
    <Address data-testid="international-address">
      <strong>Jane Smith</strong>
      <br />
      789 International Blvd
      <br />
      London, UK SW1A 1AA
    </Address>
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "Jane Smith"
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "London, UK"
  );
});

// address with contact information test
it("renders address with contact information", () => {
  render(
    <Address data-testid="address-element">
      <div>
        <strong>John Doe</strong>
        <br />
        <em>CEO, Acme Corporation</em>
        <br />
        📧 <a href="mailto:john@acme.com">john@acme.com</a>
        <br />
        📞 <a href="tel:+1234567890">+1 (234) 567-890</a>
        <br />
        🌐 <a href="https://acme.com">acme.com</a>
        <br />
        123 Business Avenue
        <br />
        Suite 100
        <br />
        New York, NY 10001
        <br />
        United States
      </div>
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("CEO, Acme Corporation");
  expect(address).toHaveTextContent("john@acme.com");
  expect(address).toHaveTextContent("+1 (234) 567-890");
  expect(address).toHaveTextContent("acme.com");
  expect(address).toHaveTextContent("123 Business Avenue");
  expect(address).toHaveTextContent("New York, NY 10001");
  expect(address.querySelectorAll("a")).toHaveLength(3);
});

// address with structured data test
it("renders address with structured data", () => {
  render(
    <Address
      data-testid="address-element"
      itemScope
      itemType="https://schema.org/PostalAddress"
    >
      <div itemProp="name">John Doe</div>
      <div itemProp="jobTitle">CEO</div>
      <div itemProp="organization">Acme Corporation</div>
      <div itemProp="streetAddress">123 Business Avenue</div>
      <div itemProp="addressLocality">New York</div>
      <div itemProp="addressRegion">NY</div>
      <div itemProp="postalCode">10001</div>
      <div itemProp="addressCountry">United States</div>
      <div itemProp="email">john@acme.com</div>
      <div itemProp="telephone">+1 (234) 567-890</div>
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("itemscope");
  expect(address).toHaveAttribute(
    "itemtype",
    "https://schema.org/PostalAddress"
  );
  expect(screen.getByText("John Doe")).toHaveAttribute("itemprop", "name");
  expect(screen.getByText("CEO")).toHaveAttribute("itemprop", "jobTitle");
  expect(screen.getByText("Acme Corporation")).toHaveAttribute(
    "itemprop",
    "organization"
  );
  expect(screen.getByText("123 Business Avenue")).toHaveAttribute(
    "itemprop",
    "streetAddress"
  );
  expect(screen.getByText("New York")).toHaveAttribute(
    "itemprop",
    "addressLocality"
  );
  expect(screen.getByText("NY")).toHaveAttribute("itemprop", "addressRegion");
  expect(screen.getByText("10001")).toHaveAttribute("itemprop", "postalCode");
  expect(screen.getByText("United States")).toHaveAttribute(
    "itemprop",
    "addressCountry"
  );
  expect(screen.getByText("john@acme.com")).toHaveAttribute(
    "itemprop",
    "email"
  );
  expect(screen.getByText("+1 (234) 567-890")).toHaveAttribute(
    "itemprop",
    "telephone"
  );
});

// accessibility test
it("renders with accessibility attributes", () => {
  render(
    <Address
      data-testid="address-element"
      aria-label="Contact information for John Doe"
      aria-describedby="address-description"
      role="contentinfo"
      tabIndex={0}
    >
      <div id="address-description">Primary contact address</div>
      John Doe
      <br />
      123 Main Street
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute(
    "aria-label",
    "Contact information for John Doe"
  );
  expect(address).toHaveAttribute("aria-describedby", "address-description");
  expect(address).toHaveAttribute("role", "contentinfo");
  expect(address).toHaveAttribute("tabindex", "0");
  expect(screen.getByText("Primary contact address")).toHaveAttribute(
    "id",
    "address-description"
  );
});

// data attributes test
it("renders with data attributes", () => {
  render(
    <Address
      data-testid="address-element"
      data-type="business"
      data-country="US"
      data-verified="true"
    >
      Business Address
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("data-type", "business");
  expect(address).toHaveAttribute("data-country", "US");
  expect(address).toHaveAttribute("data-verified", "true");
});

// event handlers test
it("renders with event handlers", () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <Address
      data-testid="address-element"
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={0}
    >
      Clickable Address
    </Address>
  );
  const address = screen.getByTestId("address-element");

  address.click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Verify the component renders with event handlers
  expect(address).toHaveAttribute("tabindex", "0");
});

// custom styling test
it("renders with custom styling", () => {
  render(
    <Address
      data-testid="address-element"
      className="custom-address-class"
      style={{
        color: "blue",
        fontStyle: "italic",
        border: "1px solid gray",
        padding: "10px",
      }}
    >
      Styled Address
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveClass("custom-address-class");
  expect(address).toHaveStyle({
    color: "rgb(0, 0, 255)",
    fontStyle: "italic",
    border: "1px solid gray",
    padding: "10px",
  });
});

// address with different formats test
it("renders with different address formats", () => {
  // US format
  const { rerender } = render(
    <Address data-testid="us-address">
      John Doe
      <br />
      123 Main Street
      <br />
      New York, NY 10001
    </Address>
  );
  expect(screen.getByTestId("us-address")).toHaveTextContent(
    "New York, NY 10001"
  );

  // International format
  rerender(
    <Address data-testid="international-address">
      Jane Smith
      <br />
      456 High Street
      <br />
      London, UK SW1A 1AA
    </Address>
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "London, UK SW1A 1AA"
  );

  // PO Box format
  rerender(
    <Address data-testid="po-box-address">
      John Doe
      <br />
      P.O. Box 12345
      <br />
      Los Angeles, CA 90210
    </Address>
  );
  expect(screen.getByTestId("po-box-address")).toHaveTextContent(
    "P.O. Box 12345"
  );
});

// address with multiple people test
it("renders address with multiple people", () => {
  render(
    <Address data-testid="address-element">
      <div>
        <strong>John Doe</strong> & <strong>Jane Smith</strong>
        <br />
        <em>Co-Founders</em>
        <br />
        Acme Corporation
        <br />
        123 Business Avenue
        <br />
        New York, NY 10001
      </div>
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("Jane Smith");
  expect(address).toHaveTextContent("Co-Founders");
  expect(address).toHaveTextContent("Acme Corporation");
  expect(address.querySelectorAll("strong")).toHaveLength(2);
});

// address with social media test
it("renders address with social media links", () => {
  render(
    <Address data-testid="address-element">
      <div>
        <strong>John Doe</strong>
        <br />
        <em>Digital Marketing Specialist</em>
        <br />
        📧 <a href="mailto:john@example.com">john@example.com</a>
        <br />
        📱 <a href="https://twitter.com/johndoe">@johndoe</a>
        <br />
        💼 <a href="https://linkedin.com/in/johndoe">linkedin.com/in/johndoe</a>
        <br />
        🏢 <a href="https://company.com">company.com</a>
        <br />
        123 Business Avenue
        <br />
        New York, NY 10001
      </div>
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("Digital Marketing Specialist");
  expect(address).toHaveTextContent("john@example.com");
  expect(address).toHaveTextContent("@johndoe");
  expect(address).toHaveTextContent("linkedin.com/in/johndoe");
  expect(address).toHaveTextContent("company.com");
  expect(address.querySelectorAll("a")).toHaveLength(4);
});

// address with time information test
it("renders address with time information", () => {
  render(
    <Address data-testid="address-element">
      <div>
        <strong>John Doe</strong>
        <br />
        <em>Available for meetings</em>
        <br />
        📅 <time dateTime="2024-01-15">Monday - Friday</time>
        <br />
        🕐 <time dateTime="09:00">9:00 AM</time> -{" "}
        <time dateTime="17:00">5:00 PM</time>
        <br />
        📍 <time dateTime="P1H">1 hour sessions</time>
        <br />
        123 Business Avenue
        <br />
        New York, NY 10001
      </div>
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("Available for meetings");
  expect(address).toHaveTextContent("Monday - Friday");
  expect(address).toHaveTextContent("9:00 AM");
  expect(address).toHaveTextContent("5:00 PM");
  expect(address).toHaveTextContent("1 hour sessions");
  // There are 4 time elements: Monday-Friday, 9:00 AM, 5:00 PM, and 1 hour sessions
  expect(address.querySelectorAll("time")).toHaveLength(4);
});

// address with custom attributes test
it("renders with custom attributes", () => {
  render(
    <Address
      data-testid="address-element"
      id="contact-address"
      lang="en-US"
      dir="ltr"
      title="Primary business address"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Custom Address
    </Address>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("id", "contact-address");
  expect(address).toHaveAttribute("lang", "en-US");
  expect(address).toHaveAttribute("dir", "ltr");
  expect(address).toHaveAttribute("title", "Primary business address");
  expect(address).not.toHaveAttribute("hidden");
  expect(address).toHaveAttribute("spellcheck", "true");
  expect(address).toHaveAttribute("contenteditable", "false");
});
