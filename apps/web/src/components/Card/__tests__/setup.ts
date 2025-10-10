// Import react-intersection-observer test utilities
import { mockAllIsIntersecting } from "react-intersection-observer/test-utils";

import { beforeEach } from "vitest";

// Setup IntersectionObserver mock using react-intersection-observer
beforeEach(() => {
  mockAllIsIntersecting(true);
});
