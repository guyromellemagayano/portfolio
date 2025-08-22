import React from "react";

/**
 * Automatically sets the `displayName` for a React component based on its function name.
 * This eliminates the need to manually set `displayName` when it matches the function name.
 */
export function setDisplayName<T extends React.ComponentType<any>>(
  component: T,
  functionName?: string
): T {
  // Only set displayName if it's not already set
  if (!component.displayName) {
    // If functionName is explicitly provided (including empty string), use it
    // Otherwise, try to get it from the stack
    component.displayName =
      functionName !== undefined ? functionName : getComponentNameFromStack();
  }
  return component;
}

/**
 * Attempts to extract component name from the call stack.
 * Looks for the actual exported component name, not displayName.
 * Falls back to "Component" if unable to detect.
 *
 * This function analyzes the call stack to find the component function name
 * from the export const declaration, filtering out common non-component names.
 */
function getComponentNameFromStack(): string {
  try {
    // Get the call stack
    const stack = new Error().stack;
    if (!stack) return "Component";

    // Split stack into lines and find the component call
    const lines = stack.split("\n");

    // Look for the component function call (usually 3-4 levels up)
    for (let i = 3; i < Math.min(lines.length, 8); i++) {
      const line = lines[i];

      // Skip if line is undefined
      if (!line) continue;

      // Look for the actual component function name (export const ComponentName).
      // This will be the function name from the export const declaration.
      const reactComponentMatch = line.match(/at\s+(\w+)\s+\(/);
      if (reactComponentMatch && reactComponentMatch[1]) {
        const functionName = reactComponentMatch[1];

        // Filter out common non-component function names
        const nonComponentNames = [
          "useComponentId",
          "render",
          "React",
          "forwardRef",
          "Component",
          "Object",
          "Function",
          "anonymous",
          "default",
        ];

        if (!nonComponentNames.includes(functionName)) {
          return functionName;
        }
      }
    }
    // eslint-disable-next-line unused-imports/no-unused-vars
  } catch (error) {
    // Silently fall back to default
  }

  return "Component";
}
