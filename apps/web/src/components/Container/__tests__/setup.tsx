// Container integration test setup
import React from "react";

import { vi } from "vitest";

// Mock Container sub-components for integration tests
vi.mock("../internal", () => ({
  ContainerInner: React.forwardRef<HTMLDivElement, any>(
    function MockContainerInner(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid="test-id-container-inner-root"
          data-container-inner-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
  ContainerOuter: React.forwardRef<HTMLDivElement, any>(
    function MockContainerOuter(props, ref) {
      const { children, debugId, debugMode, ...rest } = props;
      return (
        <div
          ref={ref}
          data-testid="test-id-container-outer-root"
          data-container-outer-id={debugId}
          data-debug-mode={debugMode ? "true" : undefined}
          {...rest}
        >
          {children}
        </div>
      );
    }
  ),
}));
