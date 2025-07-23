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
    expect(address).toHaveTextContent("456 Oak Avenue");
  });
});
