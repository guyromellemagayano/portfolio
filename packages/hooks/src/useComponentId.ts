import { useId } from "react";

import logger from "@portfolio/logger";

/** Options for the useComponentId hook */
export interface UseComponentIdOptions {
  /** Custom component debug ID for tracking */
  debugId?: string;
  /** Enable debug mode */
  debugMode?: boolean;
}

/** Return values from the useComponentId hook */
export interface UseComponentIdReturn {
  /** Generated or custom component debug ID */
  componentId: string;
  /** Processed debug mode */
  isDebugMode: boolean;
}

/** Extracts component name from call stack */
function getComponentNameFromStack(): string {
  try {
    // Get the call stack
    const stack = new Error().stack;
    if (!stack) return "Component";

    // Split stack into lines and find the component call
    const lines = stack.split("\n");

    // Split stack into lines and find the component call
    for (let i = 3; i < Math.min(lines.length, 8); i++) {
      const line = lines[i];

      // Skip if line is undefined
      if (!line) continue;

      // Look for the actual component function name (`export const ComponentName`). This will be the function name from the exported component.
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

/** Generates component IDs and provides debug logging */
export function useComponentId({
  debugId,
  debugMode = false,
}: UseComponentIdOptions = {}): UseComponentIdReturn {
  // Always call hooks at the top level
  const generatedId = useId();

  // Sanitize the generated ID to be compatible with data attributes
  // React's useId() generates IDs like ":r1:", ":r2:" which contain colons
  // We need to remove colons and other invalid characters for data attributes
  const sanitizedGeneratedId = generatedId.replace(/[^a-zA-Z0-9_-]/g, "");

  const componentId = debugId || sanitizedGeneratedId;

  // Auto-detect component name from export const declaration
  const detectedComponentName = getComponentNameFromStack();

  // Debug mode should work in all environments when explicitly set
  const isDebugMode = debugMode;

  // Internal debug logging (only in development)
  if (isDebugMode && globalThis?.process?.env?.NODE_ENV === "development") {
    logger.info(`${detectedComponentName} rendered with ID: ${componentId}`);
  }

  return {
    componentId,
    isDebugMode,
  };
}
