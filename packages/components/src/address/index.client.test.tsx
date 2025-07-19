import React from "react";

import { render, screen } from "@testing-library/react";

import { AddressClient, MemoizedAddressClient } from ".";

describe("AddressClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(AddressClient).toBeDefined();
    expect(AddressClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <AddressClient data-testid="address-element">
          123 Main Street
          <br />
          City, State 12345
        </AddressClient>
      </React.Suspense>
    );

    // Should show fallback initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy component to load
    await screen.findByTestId("address-element");
    const address = screen.getByTestId("address-element");
    expect(address.tagName).toBe("ADDRESS");
    expect(address).toHaveTextContent("123 Main Street");
  });
});

describe("MemoizedAddressClient (Lazy Component)", () => {
  it("is a lazy component", () => {
    expect(MemoizedAddressClient).toBeDefined();
    expect(MemoizedAddressClient.$$typeof).toBe(Symbol.for("react.lazy"));
  });

  it("can be rendered with Suspense", async () => {
    render(
      <React.Suspense fallback={<div>Loading...</div>}>
        <MemoizedAddressClient data-testid="address-element">
          456 Oak Avenue
          <br />
          Town, Province 67890
        </MemoizedAddressClient>
      </React.Suspense>
    );

    // Should show fallback initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the lazy component to load
    await screen.findByTestId("address-element");
    const address = screen.getByTestId("address-element");
    expect(address.tagName).toBe("ADDRESS");
    expect(address).toHaveTextContent("456 Oak Avenue");
  });
});
