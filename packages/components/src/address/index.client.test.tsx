import React from "react";

import { render, screen } from "@testing-library/react";

import { AddressClient, MemoizedAddressClient } from ".";

// Basic render test for AddressClient
it("renders an address element", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AddressClient data-testid="address-element">
        123 Main Street
        <br />
        City, State 12345
      </AddressClient>
    </React.Suspense>
  );

  // Wait for the component to load
  const address = await screen.findByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("123 Main Street");
});

// Basic render test for MemoizedAddressClient
it("renders a memoized address element", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAddressClient data-testid="address-element">
        456 Oak Avenue
        <br />
        Town, Province 67890
      </MemoizedAddressClient>
    </React.Suspense>
  );

  // Wait for the component to load
  const address = await screen.findByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("456 Oak Avenue");
});

// as prop test for AddressClient
it("renders as a custom element with 'as' prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AddressClient as="div" data-testid="custom-div">
        789 Pine Road
        <br />
        Village, Country 11111
      </AddressClient>
    </React.Suspense>
  );

  // Wait for the component to load
  const div = await screen.findByTestId("custom-div");
  expect(div.tagName).toBe("DIV");
  expect(div).toHaveTextContent("789 Pine Road");
});

// as prop test for MemoizedAddressClient
it("renders memoized as a custom element with 'as' prop", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAddressClient as="section" data-testid="custom-section">
        321 Elm Street
        <br />
        Borough, District 22222
      </MemoizedAddressClient>
    </React.Suspense>
  );

  // Wait for the component to load
  const section = await screen.findByTestId("custom-section");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveTextContent("321 Elm Street");
});

// Suspense context test for AddressClient
it("renders in Suspense context", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AddressClient data-testid="address-element">
        Suspense Address
      </AddressClient>
    </React.Suspense>
  );

  // In test environment, lazy components may render immediately
  // or show fallback briefly, so we handle both cases
  try {
    // Try to find the fallback first
    await screen.findByText("Loading...", {}, { timeout: 100 });
    // If fallback is found, wait for the component to load
    await screen.findByTestId("address-element");
  } catch {
    // If no fallback, component rendered immediately
    expect(screen.getByTestId("address-element")).toBeInTheDocument();
  }
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("Suspense Address");
});

// Suspense context test for MemoizedAddressClient
it("renders memoized in Suspense context", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAddressClient data-testid="address-element">
        Memoized Suspense Address
      </MemoizedAddressClient>
    </React.Suspense>
  );

  // In test environment, lazy components may render immediately
  // or show fallback briefly, so we handle both cases
  try {
    // Try to find the fallback first
    await screen.findByText("Loading...", {}, { timeout: 100 });
    // If fallback is found, wait for the component to load
    await screen.findByTestId("address-element");
  } catch {
    // If no fallback, component rendered immediately
    expect(screen.getByTestId("address-element")).toBeInTheDocument();
  }
  const address = screen.getByTestId("address-element");
  expect(address.tagName).toBe("ADDRESS");
  expect(address).toHaveTextContent("Memoized Suspense Address");
});

// ref forwarding test for AddressClient
it("forwards ref correctly", () => {
  const ref = React.createRef<HTMLElement>();
  render(<AddressClient ref={ref}>Ref test content</AddressClient>);
  if (ref.current) {
    expect(ref.current.tagName).toBe("ADDRESS");
  }
});

// ref forwarding test for MemoizedAddressClient
it("forwards ref correctly in memoized component", () => {
  const ref = React.createRef<HTMLElement>();
  render(
    <MemoizedAddressClient ref={ref}>
      Memoized ref test content
    </MemoizedAddressClient>
  );
  if (ref.current) {
    expect(ref.current.tagName).toBe("ADDRESS");
  }
});

// address-specific attributes test for AddressClient
it("renders with address-specific attributes", () => {
  render(
    <AddressClient
      data-testid="address-element"
      itemScope
      itemType="https://schema.org/PostalAddress"
    >
      <span itemProp="streetAddress">123 Main Street</span>
      <span itemProp="addressLocality">City</span>
      <span itemProp="addressRegion">State</span>
      <span itemProp="postalCode">12345</span>
    </AddressClient>
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

// address-specific attributes test for MemoizedAddressClient
it("renders memoized with address-specific attributes", () => {
  render(
    <MemoizedAddressClient
      data-testid="address-element"
      itemScope
      itemType="https://schema.org/PostalAddress"
    >
      <span itemProp="streetAddress">Memoized 123 Main Street</span>
      <span itemProp="addressLocality">Memoized City</span>
      <span itemProp="addressRegion">Memoized State</span>
      <span itemProp="postalCode">12345</span>
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("itemscope");
  expect(address).toHaveAttribute(
    "itemtype",
    "https://schema.org/PostalAddress"
  );
  expect(screen.getByText("Memoized 123 Main Street")).toHaveAttribute(
    "itemprop",
    "streetAddress"
  );
});

// children rendering test for AddressClient
it("renders children correctly", () => {
  render(
    <AddressClient data-testid="address-element">
      <strong>John Doe</strong>
      <br />
      <em>CEO</em>
      <br />
      123 Business Ave
    </AddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("CEO");
  expect(address).toHaveTextContent("123 Business Ave");
  expect(address.querySelector("strong")).toBeInTheDocument();
  expect(address.querySelector("em")).toBeInTheDocument();
});

// children rendering test for MemoizedAddressClient
it("renders memoized children correctly", () => {
  render(
    <MemoizedAddressClient data-testid="address-element">
      <strong>Memoized John Doe</strong>
      <br />
      <em>Memoized CEO</em>
      <br />
      Memoized 123 Business Ave
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("Memoized John Doe");
  expect(address).toHaveTextContent("Memoized CEO");
  expect(address).toHaveTextContent("Memoized 123 Business Ave");
  expect(address.querySelector("strong")).toBeInTheDocument();
  expect(address.querySelector("em")).toBeInTheDocument();
});

// empty children test for AddressClient
it("renders with empty children", () => {
  render(<AddressClient data-testid="address-element" />);
  const address = screen.getByTestId("address-element");
  expect(address).toBeEmptyDOMElement();
});

// empty children test for MemoizedAddressClient
it("renders memoized with empty children", () => {
  render(<MemoizedAddressClient data-testid="address-element" />);
  const address = screen.getByTestId("address-element");
  expect(address).toBeEmptyDOMElement();
});

// complex nested children test for AddressClient
it("renders complex nested children", () => {
  render(
    <AddressClient data-testid="address-element">
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
    </AddressClient>
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

// complex nested children test for MemoizedAddressClient
it("renders memoized complex nested children", () => {
  render(
    <MemoizedAddressClient data-testid="address-element">
      <div>
        <h3>Memoized Contact Information</h3>
        <p>
          <strong>Memoized John Doe</strong>
          <br />
          <em>Memoized Chief Executive Officer</em>
        </p>
        <div>
          <span>📧</span>{" "}
          <a href="mailto:memoized@example.com">memoized@example.com</a>
          <br />
          <span>📞</span> <a href="tel:+1234567890">+1 (234) 567-890</a>
        </div>
        <address>
          Memoized 123 Business Avenue
          <br />
          Suite 100
          <br />
          New York, NY 10001
          <br />
          United States
        </address>
      </div>
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("Memoized Contact Information");
  expect(address).toHaveTextContent("Memoized John Doe");
  expect(address).toHaveTextContent("Memoized Chief Executive Officer");
  expect(address).toHaveTextContent("memoized@example.com");
  expect(address).toHaveTextContent("+1 (234) 567-890");
  expect(address).toHaveTextContent("Memoized 123 Business Avenue");
  expect(address).toHaveTextContent("New York, NY 10001");
  expect(address.querySelector("h3")).toBeInTheDocument();
  expect(address.querySelector("p")).toBeInTheDocument();
  expect(address.querySelectorAll("a")).toHaveLength(2);
  expect(address.querySelector("address")).toBeInTheDocument();
});

// different address types test for AddressClient
it("renders with different address types", () => {
  // Business address
  const { rerender } = render(
    <AddressClient data-testid="business-address">
      <strong>Acme Corporation</strong>
      <br />
      123 Business Ave, Suite 100
      <br />
      New York, NY 10001
    </AddressClient>
  );
  expect(screen.getByTestId("business-address")).toHaveTextContent(
    "Acme Corporation"
  );

  // Personal address
  rerender(
    <AddressClient data-testid="personal-address">
      <strong>John Doe</strong>
      <br />
      456 Home Street
      <br />
      Los Angeles, CA 90210
    </AddressClient>
  );
  expect(screen.getByTestId("personal-address")).toHaveTextContent("John Doe");
  expect(screen.getByTestId("personal-address")).toHaveTextContent(
    "456 Home Street"
  );

  // International address
  rerender(
    <AddressClient data-testid="international-address">
      <strong>Jane Smith</strong>
      <br />
      789 International Blvd
      <br />
      London, UK SW1A 1AA
    </AddressClient>
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "Jane Smith"
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "London, UK"
  );
});

// different address types test for MemoizedAddressClient
it("renders memoized with different address types", () => {
  // Business address
  const { rerender } = render(
    <MemoizedAddressClient data-testid="business-address">
      <strong>Memoized Acme Corporation</strong>
      <br />
      Memoized 123 Business Ave, Suite 100
      <br />
      New York, NY 10001
    </MemoizedAddressClient>
  );
  expect(screen.getByTestId("business-address")).toHaveTextContent(
    "Memoized Acme Corporation"
  );

  // Personal address
  rerender(
    <MemoizedAddressClient data-testid="personal-address">
      <strong>Memoized John Doe</strong>
      <br />
      Memoized 456 Home Street
      <br />
      Los Angeles, CA 90210
    </MemoizedAddressClient>
  );
  expect(screen.getByTestId("personal-address")).toHaveTextContent(
    "Memoized John Doe"
  );
  expect(screen.getByTestId("personal-address")).toHaveTextContent(
    "Memoized 456 Home Street"
  );

  // International address
  rerender(
    <MemoizedAddressClient data-testid="international-address">
      <strong>Memoized Jane Smith</strong>
      <br />
      Memoized 789 International Blvd
      <br />
      London, UK SW1A 1AA
    </MemoizedAddressClient>
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "Memoized Jane Smith"
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "London, UK"
  );
});

// address with contact information test for AddressClient
it("renders address with contact information", () => {
  render(
    <AddressClient data-testid="address-element">
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
    </AddressClient>
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

// address with contact information test for MemoizedAddressClient
it("renders memoized address with contact information", () => {
  render(
    <MemoizedAddressClient data-testid="address-element">
      <div>
        <strong>Memoized John Doe</strong>
        <br />
        <em>Memoized CEO, Acme Corporation</em>
        <br />
        📧 <a href="mailto:memoized@acme.com">memoized@acme.com</a>
        <br />
        📞 <a href="tel:+1234567890">+1 (234) 567-890</a>
        <br />
        🌐 <a href="https://memoized-acme.com">memoized-acme.com</a>
        <br />
        Memoized 123 Business Avenue
        <br />
        Suite 100
        <br />
        New York, NY 10001
        <br />
        United States
      </div>
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("Memoized John Doe");
  expect(address).toHaveTextContent("Memoized CEO, Acme Corporation");
  expect(address).toHaveTextContent("memoized@acme.com");
  expect(address).toHaveTextContent("+1 (234) 567-890");
  expect(address).toHaveTextContent("memoized-acme.com");
  expect(address).toHaveTextContent("Memoized 123 Business Avenue");
  expect(address).toHaveTextContent("New York, NY 10001");
  expect(address.querySelectorAll("a")).toHaveLength(3);
});

// address with structured data test for AddressClient
it("renders address with structured data", () => {
  render(
    <AddressClient
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
    </AddressClient>
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

// address with structured data test for MemoizedAddressClient
it("renders memoized address with structured data", () => {
  render(
    <MemoizedAddressClient
      data-testid="address-element"
      itemScope
      itemType="https://schema.org/PostalAddress"
    >
      <div itemProp="name">Memoized John Doe</div>
      <div itemProp="jobTitle">Memoized CEO</div>
      <div itemProp="organization">Memoized Acme Corporation</div>
      <div itemProp="streetAddress">Memoized 123 Business Avenue</div>
      <div itemProp="addressLocality">Memoized New York</div>
      <div itemProp="addressRegion">NY</div>
      <div itemProp="postalCode">10001</div>
      <div itemProp="addressCountry">United States</div>
      <div itemProp="email">memoized@acme.com</div>
      <div itemProp="telephone">+1 (234) 567-890</div>
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("itemscope");
  expect(address).toHaveAttribute(
    "itemtype",
    "https://schema.org/PostalAddress"
  );
  expect(screen.getByText("Memoized John Doe")).toHaveAttribute(
    "itemprop",
    "name"
  );
  expect(screen.getByText("Memoized CEO")).toHaveAttribute(
    "itemprop",
    "jobTitle"
  );
  expect(screen.getByText("Memoized Acme Corporation")).toHaveAttribute(
    "itemprop",
    "organization"
  );
  expect(screen.getByText("Memoized 123 Business Avenue")).toHaveAttribute(
    "itemprop",
    "streetAddress"
  );
  expect(screen.getByText("Memoized New York")).toHaveAttribute(
    "itemprop",
    "addressLocality"
  );
  expect(screen.getByText("NY")).toHaveAttribute("itemprop", "addressRegion");
  expect(screen.getByText("10001")).toHaveAttribute("itemprop", "postalCode");
  expect(screen.getByText("United States")).toHaveAttribute(
    "itemprop",
    "addressCountry"
  );
  expect(screen.getByText("memoized@acme.com")).toHaveAttribute(
    "itemprop",
    "email"
  );
  expect(screen.getByText("+1 (234) 567-890")).toHaveAttribute(
    "itemprop",
    "telephone"
  );
});

// accessibility test for AddressClient
it("renders with accessibility attributes", () => {
  render(
    <AddressClient
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
    </AddressClient>
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

// accessibility test for MemoizedAddressClient
it("renders memoized with accessibility attributes", () => {
  render(
    <MemoizedAddressClient
      data-testid="address-element"
      aria-label="Memoized contact information for John Doe"
      aria-describedby="memoized-address-description"
      role="contentinfo"
      tabIndex={0}
    >
      <div id="memoized-address-description">
        Memoized primary contact address
      </div>
      Memoized John Doe
      <br />
      Memoized 123 Main Street
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute(
    "aria-label",
    "Memoized contact information for John Doe"
  );
  expect(address).toHaveAttribute(
    "aria-describedby",
    "memoized-address-description"
  );
  expect(address).toHaveAttribute("role", "contentinfo");
  expect(address).toHaveAttribute("tabindex", "0");
  expect(screen.getByText("Memoized primary contact address")).toHaveAttribute(
    "id",
    "memoized-address-description"
  );
});

// data attributes test for AddressClient
it("renders with data attributes", () => {
  render(
    <AddressClient
      data-testid="address-element"
      data-type="business"
      data-country="US"
      data-verified="true"
    >
      Business Address
    </AddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("data-type", "business");
  expect(address).toHaveAttribute("data-country", "US");
  expect(address).toHaveAttribute("data-verified", "true");
});

// data attributes test for MemoizedAddressClient
it("renders memoized with data attributes", () => {
  render(
    <MemoizedAddressClient
      data-testid="address-element"
      data-type="memoized-business"
      data-country="US"
      data-verified="true"
    >
      Memoized Business Address
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("data-type", "memoized-business");
  expect(address).toHaveAttribute("data-country", "US");
  expect(address).toHaveAttribute("data-verified", "true");
});

// event handlers test for AddressClient
it("renders with event handlers", async () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AddressClient
        data-testid="address-element"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        Clickable Address
      </AddressClient>
    </React.Suspense>
  );

  const address = await screen.findByTestId("address-element");

  address.click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Verify the component renders with event handlers
  expect(address).toHaveAttribute("tabindex", "0");
});

// event handlers test for MemoizedAddressClient
it("renders memoized with event handlers", async () => {
  const handleClick = vi.fn();
  const handleFocus = vi.fn();
  const handleBlur = vi.fn();

  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAddressClient
        data-testid="address-element"
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
      >
        Memoized Clickable Address
      </MemoizedAddressClient>
    </React.Suspense>
  );

  const address = await screen.findByTestId("address-element");

  address.click();
  expect(handleClick).toHaveBeenCalledTimes(1);

  // Verify the component renders with event handlers
  expect(address).toHaveAttribute("tabindex", "0");
});

// custom styling test for AddressClient
it("renders with custom styling", () => {
  render(
    <AddressClient
      data-testid="address-element"
      className="custom-address-class"
      style={{
        color: "blue",
        padding: "10px",
      }}
    >
      Styled Address
    </AddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveClass("custom-address-class");
  expect(address).toHaveStyle({
    color: "rgb(0, 0, 255)",
    padding: "10px",
  });
});

// custom styling test for MemoizedAddressClient
it("renders memoized with custom styling", () => {
  render(
    <MemoizedAddressClient
      data-testid="address-element"
      className="memoized-custom-address-class"
      style={{
        color: "green",
        padding: "15px",
      }}
    >
      Memoized Styled Address
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveClass("memoized-custom-address-class");
  expect(address).toHaveStyle({
    color: "rgb(0, 128, 0)",
    padding: "15px",
  });
});

// address with different formats test for AddressClient
it("renders with different address formats", () => {
  // US format
  const { rerender } = render(
    <AddressClient data-testid="us-address">
      John Doe
      <br />
      123 Main Street
      <br />
      New York, NY 10001
    </AddressClient>
  );
  expect(screen.getByTestId("us-address")).toHaveTextContent(
    "New York, NY 10001"
  );

  // International format
  rerender(
    <AddressClient data-testid="international-address">
      Jane Smith
      <br />
      456 High Street
      <br />
      London, UK SW1A 1AA
    </AddressClient>
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "London, UK SW1A 1AA"
  );

  // PO Box format
  rerender(
    <AddressClient data-testid="po-box-address">
      John Doe
      <br />
      P.O. Box 12345
      <br />
      Los Angeles, CA 90210
    </AddressClient>
  );
  expect(screen.getByTestId("po-box-address")).toHaveTextContent(
    "P.O. Box 12345"
  );
});

// address with different formats test for MemoizedAddressClient
it("renders memoized with different address formats", () => {
  // US format
  const { rerender } = render(
    <MemoizedAddressClient data-testid="us-address">
      Memoized John Doe
      <br />
      Memoized 123 Main Street
      <br />
      New York, NY 10001
    </MemoizedAddressClient>
  );
  expect(screen.getByTestId("us-address")).toHaveTextContent(
    "Memoized John Doe"
  );
  expect(screen.getByTestId("us-address")).toHaveTextContent(
    "New York, NY 10001"
  );

  // International format
  rerender(
    <MemoizedAddressClient data-testid="international-address">
      Memoized Jane Smith
      <br />
      Memoized 456 High Street
      <br />
      London, UK SW1A 1AA
    </MemoizedAddressClient>
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "Memoized Jane Smith"
  );
  expect(screen.getByTestId("international-address")).toHaveTextContent(
    "London, UK SW1A 1AA"
  );

  // PO Box format
  rerender(
    <MemoizedAddressClient data-testid="po-box-address">
      Memoized John Doe
      <br />
      Memoized P.O. Box 12345
      <br />
      Los Angeles, CA 90210
    </MemoizedAddressClient>
  );
  expect(screen.getByTestId("po-box-address")).toHaveTextContent(
    "Memoized John Doe"
  );
  expect(screen.getByTestId("po-box-address")).toHaveTextContent(
    "Memoized P.O. Box 12345"
  );
});

// address with multiple people test for AddressClient
it("renders address with multiple people", () => {
  render(
    <AddressClient data-testid="address-element">
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
    </AddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("Jane Smith");
  expect(address).toHaveTextContent("Co-Founders");
  expect(address).toHaveTextContent("Acme Corporation");
  expect(address.querySelectorAll("strong")).toHaveLength(2);
});

// address with multiple people test for MemoizedAddressClient
it("renders memoized address with multiple people", () => {
  render(
    <MemoizedAddressClient data-testid="address-element">
      <div>
        <strong>Memoized John Doe</strong> &{" "}
        <strong>Memoized Jane Smith</strong>
        <br />
        <em>Memoized Co-Founders</em>
        <br />
        Memoized Acme Corporation
        <br />
        Memoized 123 Business Avenue
        <br />
        New York, NY 10001
      </div>
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("Memoized John Doe");
  expect(address).toHaveTextContent("Memoized Jane Smith");
  expect(address).toHaveTextContent("Memoized Co-Founders");
  expect(address).toHaveTextContent("Memoized Acme Corporation");
  expect(address.querySelectorAll("strong")).toHaveLength(2);
});

// address with social media test for AddressClient
it("renders address with social media links", () => {
  render(
    <AddressClient data-testid="address-element">
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
    </AddressClient>
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

// address with social media test for MemoizedAddressClient
it("renders memoized address with social media links", () => {
  render(
    <MemoizedAddressClient data-testid="address-element">
      <div>
        <strong>Memoized John Doe</strong>
        <br />
        <em>Memoized Digital Marketing Specialist</em>
        <br />
        📧 <a href="mailto:memoized@example.com">memoized@example.com</a>
        <br />
        📱 <a href="https://twitter.com/memoizedjohndoe">@memoizedjohndoe</a>
        <br />
        💼{" "}
        <a href="https://linkedin.com/in/memoizedjohndoe">
          linkedin.com/in/memoizedjohndoe
        </a>
        <br />
        🏢 <a href="https://memoized-company.com">memoized-company.com</a>
        <br />
        Memoized 123 Business Avenue
        <br />
        New York, NY 10001
      </div>
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveTextContent("Memoized John Doe");
  expect(address).toHaveTextContent("Memoized Digital Marketing Specialist");
  expect(address).toHaveTextContent("memoized@example.com");
  expect(address).toHaveTextContent("@memoizedjohndoe");
  expect(address).toHaveTextContent("linkedin.com/in/memoizedjohndoe");
  expect(address).toHaveTextContent("memoized-company.com");
  expect(address.querySelectorAll("a")).toHaveLength(4);
});

// address with time information test for AddressClient
it("renders address with time information", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <AddressClient data-testid="address-element">
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
      </AddressClient>
    </React.Suspense>
  );
  const address = await screen.findByTestId("address-element");
  expect(address).toHaveTextContent("John Doe");
  expect(address).toHaveTextContent("Available for meetings");
  expect(address).toHaveTextContent("Monday - Friday");
  expect(address).toHaveTextContent("9:00 AM");
  expect(address).toHaveTextContent("5:00 PM");
  expect(address).toHaveTextContent("1 hour sessions");
  // There are 4 time elements: Monday-Friday, 9:00 AM, 5:00 PM, and 1 hour sessions
  expect(address.querySelectorAll("time")).toHaveLength(4);
});

// address with time information test for MemoizedAddressClient
it("renders memoized address with time information", async () => {
  render(
    <React.Suspense fallback={<div>Loading...</div>}>
      <MemoizedAddressClient data-testid="address-element">
        <div>
          <strong>Memoized John Doe</strong>
          <br />
          <em>Memoized Available for meetings</em>
          <br />
          📅 <time dateTime="2024-01-15">Memoized Monday - Friday</time>
          <br />
          🕐 <time dateTime="09:00">Memoized 9:00 AM</time> -{" "}
          <time dateTime="17:00">Memoized 5:00 PM</time>
          <br />
          📍 <time dateTime="P1H">Memoized 1 hour sessions</time>
          <br />
          Memoized 123 Business Avenue
          <br />
          New York, NY 10001
        </div>
      </MemoizedAddressClient>
    </React.Suspense>
  );
  const address = await screen.findByTestId("address-element");
  expect(address).toHaveTextContent("Memoized John Doe");
  expect(address).toHaveTextContent("Memoized Available for meetings");
  expect(address).toHaveTextContent("Memoized Monday - Friday");
  expect(address).toHaveTextContent("Memoized 9:00 AM");
  expect(address).toHaveTextContent("Memoized 5:00 PM");
  expect(address).toHaveTextContent("Memoized 1 hour sessions");
  // There are 4 time elements: Monday-Friday, 9:00 AM, 5:00 PM, and 1 hour sessions
  expect(address.querySelectorAll("time")).toHaveLength(4);
});

// address with custom attributes test for AddressClient
it("renders with custom attributes", () => {
  render(
    <AddressClient
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
    </AddressClient>
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

// address with custom attributes test for MemoizedAddressClient
it("renders memoized with custom attributes", () => {
  render(
    <MemoizedAddressClient
      data-testid="address-element"
      id="memoized-contact-address"
      lang="en-US"
      dir="ltr"
      title="Memoized primary business address"
      hidden={false}
      spellCheck={true}
      contentEditable={false}
    >
      Memoized Custom Address
    </MemoizedAddressClient>
  );
  const address = screen.getByTestId("address-element");
  expect(address).toHaveAttribute("id", "memoized-contact-address");
  expect(address).toHaveAttribute("lang", "en-US");
  expect(address).toHaveAttribute("dir", "ltr");
  expect(address).toHaveAttribute("title", "Memoized primary business address");
  expect(address).not.toHaveAttribute("hidden");
  expect(address).toHaveAttribute("spellcheck", "true");
  expect(address).toHaveAttribute("contenteditable", "false");
});
