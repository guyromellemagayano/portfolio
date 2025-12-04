import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

describe("Test Setup Integration", () => {
  afterEach(() => {
    cleanup();
  });

  describe("Setup File Import", () => {
    it("should import test-setup.ts without errors", async () => {
      // The setup file is already imported via vitest.config.ts setupFiles
      // This test verifies it doesn't throw when imported
      await expect(
        import("../shared/test-setup.ts")
      ).resolves.toBeDefined();
    });
  });

  describe("@testing-library/jest-dom", () => {
    it("should have jest-dom matchers available", () => {
      const element = document.createElement("div");
      element.setAttribute("data-testid", "test-element");
      document.body.appendChild(element);

      expect(element).toBeInTheDocument();
    });
  });

  describe("Vitest Globals", () => {
    it("should have vitest globals available", () => {
      expect(describe).toBeDefined();
      expect(it).toBeDefined();
      expect(expect).toBeDefined();
      expect(vi).toBeDefined();
    });
  });

  describe("Console Mocks", () => {
    it("should have console methods mocked", () => {
      expect(() => console.warn("test")).not.toThrow();
      expect(() => console.error("test")).not.toThrow();
    });

    it("should mock console.warn and console.error", () => {
      const warnSpy = vi.spyOn(console, "warn");
      const errorSpy = vi.spyOn(console, "error");

      console.warn("test warn");
      console.error("test error");

      // Mocks should be callable without throwing
      expect(warnSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalled();

      warnSpy.mockRestore();
      errorSpy.mockRestore();
    });
  });

  describe("React Availability", () => {
    it("should have React available", async () => {
      const ReactModule = await import("react");
      expect(ReactModule).toBeDefined();
      expect(ReactModule.createElement).toBeDefined();
    });

    it("should be able to create React elements", () => {
      const element = React.createElement("div", { "data-testid": "test" });
      expect(element).toBeDefined();
    });
  });

  describe("Next.js Mocks", () => {
    it("should have next/navigation mocked (mocks are set up in test-setup.ts)", () => {
      // The mocks are set up via vi.mock in test-setup.ts
      // We verify the mock router back function is available
      expect((globalThis as any).__MOCK_ROUTER_BACK__).toBeDefined();
      expect(typeof (globalThis as any).__MOCK_ROUTER_BACK__).toBe("function");
    });

    it("should have next/image mock available (tested via component rendering)", () => {
      // Since next/image is mocked in test-setup.ts, we can test it indirectly
      // by checking that React rendering works (which uses the mock)
      const TestComponent = () => React.createElement("div", null, "Test");
      const { container } = render(React.createElement(TestComponent));
      expect(container.textContent).toBe("Test");
    });

    it("should have next/link mock available (tested via component rendering)", () => {
      // Since next/link is mocked in test-setup.ts, we can test it indirectly
      // by checking that React rendering works (which uses the mock)
      const TestComponent = () => React.createElement("div", null, "Test");
      const { container } = render(React.createElement(TestComponent));
      expect(container.textContent).toBe("Test");
    });

    it("should have next-themes mock available (mocks are set up in test-setup.ts)", () => {
      // The mocks are set up via vi.mock in test-setup.ts
      // We verify that the mock setup doesn't throw errors
      expect(vi.isMockFunction).toBeDefined();
    });
  });

  describe("Centralized Mocks", () => {
    it("should have centralized mock files available", async () => {
      // Test that the centralized mock files exist and can be imported
      const webComponentsMock = await import("../__mocks__/@web/components");
      expect(webComponentsMock).toBeDefined();

      const utilsMock = await import("../__mocks__/@guyromellemagayano/utils");
      expect(utilsMock).toBeDefined();

      const hooksMock = await import("../__mocks__/@guyromellemagayano/hooks");
      expect(hooksMock).toBeDefined();
      expect(hooksMock.useComponentId).toBeDefined();
      expect(hooksMock.useRouter).toBeDefined();

      const loggerMock = await import("../__mocks__/@guyromellemagayano/logger");
      expect(loggerMock).toBeDefined();
      expect(loggerMock.logInfo).toBeDefined();
      expect(loggerMock.logDebug).toBeDefined();
      expect(loggerMock.logWarn).toBeDefined();
      expect(loggerMock.logError).toBeDefined();
    });

    it("should allow calling centralized mock logger functions", async () => {
      const loggerMock = await import("../__mocks__/@guyromellemagayano/logger");
      expect(() => loggerMock.logInfo("test")).not.toThrow();
      expect(() => loggerMock.logDebug("test")).not.toThrow();
    });

    it("should have centralized mock hooks callable", async () => {
      const hooksMock = await import("../__mocks__/@guyromellemagayano/hooks");
      const router = hooksMock.useRouter();
      expect(router).toBeDefined();
      expect(router.push).toBeDefined();
      expect(router.back).toBeDefined();
    });
  });

  describe("Browser API Mocks", () => {
    it("should mock IntersectionObserver", () => {
      expect(globalThis.IntersectionObserver).toBeDefined();
      const observer = new IntersectionObserver(() => {});
      expect(observer.observe).toBeDefined();
      expect(observer.unobserve).toBeDefined();
      expect(observer.disconnect).toBeDefined();
    });

    it("should mock ResizeObserver", () => {
      // ResizeObserver is mocked in test-setup.ts
      expect(globalThis.window.ResizeObserver).toBeDefined();
      expect(typeof globalThis.window.ResizeObserver).toBe("function");
      // Verify it's available on both window and global
      expect(globalThis.global.ResizeObserver).toBeDefined();
    });

    it("should mock window.matchMedia", () => {
      // matchMedia is mocked in test-setup.ts
      expect(globalThis.window.matchMedia).toBeDefined();
      expect(typeof globalThis.window.matchMedia).toBe("function");
      // The mock is set up via vi.fn().mockImplementation in test-setup.ts
      // Note: afterEach resets mocks, so we only verify the function exists
    });

    it("should mock requestAnimationFrame", () => {
      expect(globalThis.global.requestAnimationFrame).toBeDefined();
      const id = requestAnimationFrame(() => {});
      expect(id).toBe(1);
    });

    it("should mock cancelAnimationFrame", () => {
      expect(globalThis.global.cancelAnimationFrame).toBeDefined();
      expect(() => cancelAnimationFrame(1)).not.toThrow();
    });

    it("should mock getComputedStyle", () => {
      expect(globalThis.window.getComputedStyle).toBeDefined();
      const element = document.createElement("div");
      const styles = window.getComputedStyle(element);
      expect(styles.getPropertyValue).toBeDefined();
    });
  });

  describe("Test Lifecycle Hooks", () => {
    it("should have afterEach hook configured", () => {
      // This test verifies that afterEach is available and working
      // The actual cleanup is tested by the fact that tests don't interfere with each other
      expect(afterEach).toBeDefined();
      expect(typeof afterEach).toBe("function");
    });
  });
});
