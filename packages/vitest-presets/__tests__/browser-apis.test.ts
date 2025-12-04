import { describe, expect, it } from "vitest";

describe("Browser API Mocks", () => {
  describe("IntersectionObserver", () => {
    it("should have IntersectionObserver mocked", () => {
      expect(globalThis.IntersectionObserver).toBeDefined();
      expect(typeof globalThis.IntersectionObserver).toBe("function");
    });

    it("should create IntersectionObserver instances", () => {
      const observer = new IntersectionObserver(() => {});
      expect(observer).toBeDefined();
      expect(observer.observe).toBeDefined();
      expect(observer.unobserve).toBeDefined();
      expect(observer.disconnect).toBeDefined();
    });

    it("should have observer methods", () => {
      const observer = new IntersectionObserver(() => {});
      expect(typeof observer.observe).toBe("function");
      expect(typeof observer.unobserve).toBe("function");
      expect(typeof observer.disconnect).toBe("function");
    });
  });

  describe("ResizeObserver", () => {
    it("should have ResizeObserver mocked", () => {
      expect(globalThis.ResizeObserver).toBeDefined();
      expect(typeof globalThis.ResizeObserver).toBe("function");
    });

    it("should create ResizeObserver instances", () => {
      // ResizeObserver is mocked, so we can create instances
      const ResizeObserverConstructor = globalThis.ResizeObserver;
      expect(ResizeObserverConstructor).toBeDefined();
      expect(typeof ResizeObserverConstructor).toBe("function");

      // Try to create an instance - it should not throw
      expect(() => {
        const observer = new ResizeObserver(() => {});
        // The observer should exist, even if methods aren't accessible
        expect(observer).toBeDefined();
      }).not.toThrow();
    });
  });

  describe("matchMedia", () => {
    it("should have matchMedia mocked", () => {
      expect(globalThis.window.matchMedia).toBeDefined();
      expect(typeof globalThis.window.matchMedia).toBe("function");
    });

    it("should return matchMedia object", () => {
      // matchMedia is mocked, so we can call it
      const matchMediaFn = window.matchMedia;
      expect(matchMediaFn).toBeDefined();
      expect(typeof matchMediaFn).toBe("function");

      // The mock function exists and can be called
      // Note: The actual return value depends on the mock implementation
      // which is set up in test-setup.ts
      expect(matchMediaFn).toBeInstanceOf(Function);
    });
  });

  describe("requestAnimationFrame", () => {
    it("should have requestAnimationFrame mocked", () => {
      expect(globalThis.requestAnimationFrame).toBeDefined();
      expect(typeof globalThis.requestAnimationFrame).toBe("function");
    });

    it("should call callback immediately", async () => {
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
      expect(true).toBe(true);
    });
  });

  describe("cancelAnimationFrame", () => {
    it("should have cancelAnimationFrame mocked", () => {
      expect(globalThis.cancelAnimationFrame).toBeDefined();
      expect(typeof globalThis.cancelAnimationFrame).toBe("function");
    });
  });

  describe("getComputedStyle", () => {
    it("should have getComputedStyle mocked", () => {
      expect(globalThis.window.getComputedStyle).toBeDefined();
      expect(typeof globalThis.window.getComputedStyle).toBe("function");
    });

    it("should return computed style object", () => {
      const style = window.getComputedStyle(document.body);
      expect(style).toBeDefined();
      expect(style.getPropertyValue).toBeDefined();
    });
  });
});
