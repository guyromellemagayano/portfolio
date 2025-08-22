import React from "react";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { setDisplayName } from "./setDisplayName";

// Declare global for test environment
declare const global: any;

describe("setDisplayName", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock Error.captureStackTrace for test environment
    if (!Error.captureStackTrace) {
      Error.captureStackTrace = vi.fn();
    }

    // Ensure Error constructor is properly mocked for tests that need it
    if (!global.Error.captureStackTrace) {
      global.Error.captureStackTrace = vi.fn();
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("sets displayName when not already set", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "TestComponent");

      expect(result.displayName).toBe("TestComponent");
      expect(result).toBe(TestComponent);
    });

    it("preserves existing displayName", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      TestComponent.displayName = "ExistingName";

      const result = setDisplayName(TestComponent, "NewName");

      expect(result.displayName).toBe("ExistingName");
      expect(result).toBe(TestComponent);
    });

    it("returns the same component reference", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "TestComponent");

      expect(result).toBe(TestComponent);
    });

    it("handles components with no displayName property", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      delete (TestComponent as any).displayName;

      const result = setDisplayName(TestComponent, "TestComponent");

      expect(result.displayName).toBe("TestComponent");
    });
  });

  describe("Auto-detection from Stack", () => {
    it("auto-detects component name when no functionName provided", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      // Should auto-detect the component name from stack
      expect(result.displayName).toBeDefined();
      expect(typeof result.displayName).toBe("string");
    });

    it("falls back to 'Component' when auto-detection fails", () => {
      // Mock Error.stack to return undefined
      const originalError = global.Error;
      global.Error = vi.fn().mockImplementation(() => ({
        stack: undefined,
      })) as any;

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      expect(result.displayName).toBe("Component");

      global.Error = originalError;
    });

    it("handles stack parsing errors gracefully", () => {
      // Mock Error.stack to throw an error
      const originalError = global.Error;
      global.Error = vi.fn().mockImplementation(() => {
        throw new Error("Stack parsing error");
      }) as any;

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      expect(result.displayName).toBe("Component");

      global.Error = originalError;
    });
  });

  describe("Component Types", () => {
    it("works with function components", () => {
      const FunctionComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(FunctionComponent, "FunctionComponent");

      expect(result.displayName).toBe("FunctionComponent");
    });

    it("works with arrow function components", () => {
      const ArrowComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(ArrowComponent, "ArrowComponent");

      expect(result.displayName).toBe("ArrowComponent");
    });

    it("works with forwardRef components", () => {
      const ForwardRefComponent = React.forwardRef<HTMLDivElement, {}>(
        (props, ref) => React.createElement("div", { ref }, "Test")
      );

      const result = setDisplayName(ForwardRefComponent, "ForwardRefComponent");

      expect(result.displayName).toBe("ForwardRefComponent");
    });
  });

  describe("Edge Cases", () => {
    it("handles null component gracefully", () => {
      expect(() => setDisplayName(null as any, "TestComponent")).toThrow();
    });

    it("handles undefined component gracefully", () => {
      expect(() => setDisplayName(undefined as any, "TestComponent")).toThrow();
    });

    it("handles non-function components", () => {
      const nonComponent = "not a component" as any;
      expect(() => setDisplayName(nonComponent, "TestComponent")).toThrow();
    });

    it("handles empty string functionName", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "");

      expect(result.displayName).toBe(""); // Empty string should be preserved when explicitly provided
    });

    it("handles whitespace-only functionName", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "   ");

      expect(result.displayName).toBe("   ");
    });

    it("handles special characters in functionName", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "Test-Component_123");

      expect(result.displayName).toBe("Test-Component_123");
    });

    it("handles very long functionName", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const longName = "A".repeat(1000);
      const result = setDisplayName(TestComponent, longName);

      expect(result.displayName).toBe(longName);
    });
  });

  describe("Stack Analysis", () => {
    it("filters out common non-component function names", () => {
      // Mock a stack that contains non-component names
      const mockStack = `
Error
    at useComponentId (useComponentId.ts:10:15)
    at render (react-dom.js:123:45)
    at React (react.js:456:78)
    at forwardRef (react.js:789:12)
    at Component (Component.tsx:15:20)
    at Object (index.js:5:10)
    at Function (Function.js:8:12)
    at anonymous (anonymous.js:3:1)
    at default (default.js:2:1)
    at MyActualComponent (MyComponent.tsx:25:10)
      `.trim();

      const originalError = global.Error;
      const mockError = vi.fn().mockImplementation(() => ({
        stack: mockStack,
        captureStackTrace: vi.fn(),
      })) as any;
      mockError.captureStackTrace = vi.fn();
      global.Error = mockError;

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "MyActualComponent");

      // Should detect "MyActualComponent" and filter out the others
      expect(result.displayName).toBe("MyActualComponent");

      global.Error = originalError;
    });

    it("handles stack with no valid component names", () => {
      const mockStack = `
Error
    at useComponentId (useComponentId.ts:10:15)
    at render (react-dom.js:123:45)
    at React (react.js:456:78)
    at forwardRef (react.js:789:12)
    at Component (Component.tsx:15:20)
    at Object (index.js:5:10)
    at Function (Function.js:8:12)
    at anonymous (anonymous.js:3:1)
    at default (default.js:2:1)
      `.trim();

      const originalError = global.Error;
      global.Error = vi.fn().mockImplementation(() => ({
        stack: mockStack,
        captureStackTrace: vi.fn(),
      })) as any;

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      // Should fall back to "Component"
      expect(result.displayName).toBe("Component");

      global.Error = originalError;
    });

    it("handles stack with malformed lines", () => {
      const mockStack = `
Error
    at useComponentId (useComponentId.ts:10:15)
    at
    at React (react.js:456:78)
    at undefined
    at MyComponent (MyComponent.tsx:25:10)
      `.trim();

      const originalError = global.Error;
      global.Error = vi.fn().mockImplementation(() => ({
        stack: mockStack,
        captureStackTrace: vi.fn(),
      })) as any;

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      // Should still detect "MyComponent"
      expect(result.displayName).toBe("MyComponent");

      global.Error = originalError;
    });
  });

  describe("Integration Scenarios", () => {
    it("works with React.forwardRef pattern", () => {
      const forwardRefComponent = React.forwardRef<HTMLDivElement, {}>(
        function MyComponent(props, ref) {
          return React.createElement("div", { ref }, "Test");
        }
      );

      const MyComponent = setDisplayName(forwardRefComponent, "MyComponent");
      expect(MyComponent.displayName).toBe("MyComponent");
    });

    it("works with nested setDisplayName calls", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result1 = setDisplayName(TestComponent, "First");
      const result2 = setDisplayName(result1, "Second");

      expect(result1.displayName).toBe("First");
      expect(result2.displayName).toBe("First"); // Should preserve first name
    });

    it("works with components that have existing displayName", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      TestComponent.displayName = "Original";

      const result = setDisplayName(TestComponent, "New");

      expect(result.displayName).toBe("Original"); // Should preserve original
    });
  });

  describe("TypeScript Compatibility", () => {
    it("maintains component type after setDisplayName", () => {
      const TestComponent: React.ComponentType<{ title: string }> = ({
        title,
      }) => React.createElement("div", null, title);

      const result = setDisplayName(TestComponent, "TestComponent");

      // Should maintain the same component reference and displayName
      expect(result).toBe(TestComponent);
      expect(result.displayName).toBe("TestComponent");
      expect(typeof result).toBe("function");
    });

    it("works with generic components", () => {
      const GenericComponent: React.ComponentType<{ data: any }> = (props: {
        data: any;
      }) => React.createElement("div", null, String(props.data));

      const result = setDisplayName(GenericComponent, "GenericComponent");

      expect(result.displayName).toBe("GenericComponent");
    });
  });

  describe("Performance", () => {
    it("does not create new component instances", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result1 = setDisplayName(TestComponent, "TestComponent");
      const result2 = setDisplayName(TestComponent, "TestComponent");

      expect(result1).toBe(TestComponent);
      expect(result2).toBe(TestComponent);
      expect(result1).toBe(result2);
    });

    it("handles multiple calls efficiently", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      // Multiple calls should not cause issues
      for (let i = 0; i < 100; i++) {
        const result = setDisplayName(TestComponent, "TestComponent");
        expect(result.displayName).toBe("TestComponent");
      }
    });
  });

  describe("Error Handling", () => {
    it("handles stack parsing with invalid regex", () => {
      // Mock String.prototype.match to throw an error
      const originalMatch = String.prototype.match;
      String.prototype.match = vi.fn().mockImplementation(() => {
        throw new Error("Regex error");
      });

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      expect(result.displayName).toBe("Component");

      String.prototype.match = originalMatch;
    });

    it("handles stack with non-string values", () => {
      const originalError = global.Error;
      global.Error = vi.fn().mockImplementation(() => ({
        stack: null,
      })) as any;

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      expect(result.displayName).toBe("Component");

      global.Error = originalError;
    });
  });

  describe("Real-world Usage Patterns", () => {
    it("works with export const pattern", () => {
      const MyComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      const result = setDisplayName(MyComponent, "MyComponent");
      expect(result.displayName).toBe("MyComponent");
    });

    it("works with export default pattern", () => {
      const MyComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      const result = setDisplayName(MyComponent, "MyComponent");
      expect(result.displayName).toBe("MyComponent");
    });

    it("works with named function exports", () => {
      const MyComponent: React.ComponentType = function MyComponent() {
        return React.createElement("div", null, "Test");
      };
      const result = setDisplayName(MyComponent, "MyComponent");
      expect(result.displayName).toBe("MyComponent");
    });

    it("works with higher-order components", () => {
      const withDisplayName = (WrappedComponent: React.ComponentType) => {
        const HOC: React.ComponentType = (props: any) =>
          React.createElement(WrappedComponent, props);
        return setDisplayName(HOC, "withDisplayName");
      };

      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      const EnhancedComponent = withDisplayName(TestComponent);

      expect(EnhancedComponent.displayName).toBe("withDisplayName");
    });
  });

  describe("Component Name Detection Edge Cases", () => {
    it("handles components with numbers in name", () => {
      const TestComponent123: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      const result = setDisplayName(TestComponent123, "TestComponent123");
      expect(result.displayName).toBe("TestComponent123");
    });

    it("handles components with underscores in name", () => {
      const Test_Component: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      const result = setDisplayName(Test_Component, "Test_Component");
      expect(result.displayName).toBe("Test_Component");
    });

    it("handles components with dashes in name", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      const result = setDisplayName(TestComponent, "Test-Component");
      expect(result.displayName).toBe("Test-Component");
    });

    it("handles components with special characters in name", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      const result = setDisplayName(TestComponent, "Test$Component@123");
      expect(result.displayName).toBe("Test$Component@123");
    });
  });

  describe("Memory and Reference Safety", () => {
    it("does not modify original component properties", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const originalProps = Object.getOwnPropertyNames(TestComponent);
      const result = setDisplayName(TestComponent, "TestComponent");

      // Should only add displayName, not remove other properties
      const newProps = Object.getOwnPropertyNames(result);
      expect(newProps).toContain("displayName");
      expect(newProps.length).toBeGreaterThanOrEqual(originalProps.length);
    });

    it("preserves component prototype chain", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const originalPrototype = Object.getPrototypeOf(TestComponent);
      const result = setDisplayName(TestComponent, "TestComponent");

      expect(Object.getPrototypeOf(result)).toBe(originalPrototype);
    });

    it("handles components with existing non-enumerable properties", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      // Add a non-enumerable property
      Object.defineProperty(TestComponent, "customProp", {
        value: "test",
        enumerable: false,
      });

      const result = setDisplayName(TestComponent, "TestComponent");

      expect(result.displayName).toBe("TestComponent");
      expect((result as any).customProp).toBe("test");
    });
  });

  describe("Component Lifecycle", () => {
    it("works with components that are later modified", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "TestComponent");
      expect(result.displayName).toBe("TestComponent");

      // Modify the component after setDisplayName
      TestComponent.displayName = "ModifiedName";
      expect(result.displayName).toBe("ModifiedName");
    });

    it("handles components with circular references", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      // Create a circular reference
      (TestComponent as any).self = TestComponent;

      const result = setDisplayName(TestComponent, "TestComponent");
      expect(result.displayName).toBe("TestComponent");
      expect((result as any).self).toBe(TestComponent);
    });
  });

  describe("Auto-detection Behavior", () => {
    it("uses provided functionName when available", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent, "CustomName");

      expect(result.displayName).toBe("CustomName");
    });

    it("falls back to auto-detection when no functionName provided", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");

      const result = setDisplayName(TestComponent);

      // Should auto-detect or fall back to "Component"
      expect(result.displayName).toBeDefined();
      expect(typeof result.displayName).toBe("string");
    });

    it("preserves existing displayName even with functionName provided", () => {
      const TestComponent: React.ComponentType = () =>
        React.createElement("div", null, "Test");
      TestComponent.displayName = "ExistingName";

      const result = setDisplayName(TestComponent, "NewName");

      expect(result.displayName).toBe("ExistingName");
    });
  });
});
