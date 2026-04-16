import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

import "@testing-library/jest-dom";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock navigation to prevent JSDOM errors
Object.defineProperty(window, "location", {
  writable: true,
  value: {
    assign: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    href: "http://localhost:3000",
    origin: "http://localhost:3000",
    protocol: "http:",
    host: "localhost:3000",
    hostname: "localhost",
    port: "3000",
    pathname: "/",
    search: "",
    hash: "",
  },
});

// Mock HTML element navigation methods to prevent JSDOM navigation errors
HTMLAnchorElement.prototype.click = vi.fn();
HTMLAreaElement.prototype.click = vi.fn();

// Enhanced Canvas API mocking for testing
const createMockCanvasContext2D = () => ({
  scale: vi.fn(),
  clearRect: vi.fn(),
  fillRect: vi.fn(),
  strokeRect: vi.fn(),
  beginPath: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  stroke: vi.fn(),
  fill: vi.fn(),
  arc: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  transform: vi.fn(),
  setTransform: vi.fn(),
  createLinearGradient: vi.fn(),
  createRadialGradient: vi.fn(),
  createPattern: vi.fn(),
  drawImage: vi.fn(),
  getImageData: vi.fn(),
  putImageData: vi.fn(),
  createImageData: vi.fn(),
  measureText: vi.fn(() => ({ width: 100 })),
  isPointInPath: vi.fn(),
  isPointInStroke: vi.fn(),
  clip: vi.fn(),
  quadraticCurveTo: vi.fn(),
  bezierCurveTo: vi.fn(),
  closePath: vi.fn(),
  font: "10px sans-serif",
  fillStyle: "#000",
  strokeStyle: "#000",
  lineWidth: 1,
  lineCap: "butt",
  lineJoin: "miter",
  globalAlpha: 1,
  globalCompositeOperation: "source-over",
  canvas: null as any,
});

const createMockWebGLContext = () => ({
  clear: vi.fn(),
  clearColor: vi.fn(),
  clearDepth: vi.fn(),
  clearStencil: vi.fn(),
  viewport: vi.fn(),
  enable: vi.fn(),
  disable: vi.fn(),
  createShader: vi.fn(),
  createProgram: vi.fn(),
  shaderSource: vi.fn(),
  compileShader: vi.fn(),
  linkProgram: vi.fn(),
  useProgram: vi.fn(),
  createBuffer: vi.fn(),
  bindBuffer: vi.fn(),
  bufferData: vi.fn(),
  createTexture: vi.fn(),
  bindTexture: vi.fn(),
  texImage2D: vi.fn(),
  texParameteri: vi.fn(),
  drawArrays: vi.fn(),
  drawElements: vi.fn(),
  getAttribLocation: vi.fn(),
  getUniformLocation: vi.fn(),
  vertexAttribPointer: vi.fn(),
  enableVertexAttribArray: vi.fn(),
  uniform1f: vi.fn(),
  uniform2f: vi.fn(),
  uniform3f: vi.fn(),
  uniform4f: vi.fn(),
  uniformMatrix4fv: vi.fn(),
  canvas: null as any,
});

// Store original methods to avoid infinite recursion
const originalCreateElement = document.createElement;
const originalAppendChild = HTMLElement.prototype.appendChild;

// Enhanced mock context creation with better tracking
let mockGetContext = vi.fn((contextType: string, options?: any) => {
  switch (contextType) {
    case "2d":
      return createMockCanvasContext2D();
    case "webgl":
    case "experimental-webgl":
      return createMockWebGLContext();
    case "webgl2":
      return {
        ...createMockWebGLContext(),
        // WebGL2 specific methods
        texImage3D: vi.fn(),
        texSubImage3D: vi.fn(),
      };
    case "bitmaprenderer":
      return {
        transferFromImageBitmap: vi.fn(),
        canvas: null as any,
      };
    default:
      return createMockCanvasContext2D();
  }
});

// Function to apply comprehensive canvas mocking
function applyCanvasMocking(canvasElement: HTMLCanvasElement) {
  // Check if canvas already has a custom getContext (from test files)
  if (
    canvasElement.getContext &&
    typeof canvasElement.getContext === "function" &&
    canvasElement.getContext.length > 0
  ) {
    // Don't override if it's already been set by a test
    return;
  }

  // Apply our default mock
  canvasElement.getContext = mockGetContext as any;

  // Mock width and height properties with proper getters/setters
  let _width = 300;
  let _height = 150;

  Object.defineProperty(canvasElement, "width", {
    get: () => _width,
    set: (value: number) => {
      _width = value;
    },
    configurable: true,
    enumerable: true,
  });

  Object.defineProperty(canvasElement, "height", {
    get: () => _height,
    set: (value: number) => {
      _height = value;
    },
    configurable: true,
    enumerable: true,
  });

  // Mock style property with proper CSS-like object
  const mockStyle = {
    width: "300px",
    height: "150px",
    position: "",
    display: "",
    touchAction: "auto",
    pointerEvents: "auto",
  };

  Object.defineProperty(canvasElement, "style", {
    get: () => mockStyle,
    set: (value: any) => {
      Object.assign(mockStyle, value);
    },
    configurable: true,
    enumerable: true,
  });

  // Mock getBoundingClientRect
  canvasElement.getBoundingClientRect = vi.fn(() => ({
    width: 300,
    height: 150,
    left: 0,
    top: 0,
    right: 300,
    bottom: 150,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }));

  // Mock other canvas methods
  canvasElement.toDataURL = vi.fn(() => "data:image/png;base64,mock");
  canvasElement.toBlob = vi.fn((callback) => {
    if (callback) callback(new Blob());
  });

  // Mark as mocked for tracking
  (canvasElement as any).__mocked = true;
}

// Only override HTMLCanvasElement prototype if not already overridden
if (
  !HTMLCanvasElement.prototype.getContext ||
  HTMLCanvasElement.prototype.getContext.toString().includes("[native code]")
) {
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    value: mockGetContext as any,
    writable: true,
    configurable: true,
  });
}

if (
  !HTMLCanvasElement.prototype.getBoundingClientRect ||
  HTMLCanvasElement.prototype.getBoundingClientRect
    .toString()
    .includes("[native code]")
) {
  Object.defineProperty(HTMLCanvasElement.prototype, "getBoundingClientRect", {
    value: vi.fn(() => ({
      width: 300,
      height: 150,
      left: 0,
      top: 0,
      right: 300,
      bottom: 150,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    })),
    writable: true,
    configurable: true,
  });
}

// Enhanced document.createElement override with immediate mocking
document.createElement = vi.fn(
  (tagName: string, options?: ElementCreationOptions) => {
    const element = originalCreateElement.call(document, tagName, options);

    if (tagName.toLowerCase() === "canvas") {
      const canvasElement = element as HTMLCanvasElement;
      applyCanvasMocking(canvasElement);
    }

    return element;
  }
);

// Enhanced appendChild to catch any canvas elements and ensure they're mocked
HTMLElement.prototype.appendChild = function <T extends Node>(node: T): T {
  const result = originalAppendChild.call(this, node) as T;

  if (node instanceof HTMLCanvasElement && !(node as any).__mocked) {
    applyCanvasMocking(node);
  }

  return result;
};

// Override insertBefore as well to catch all DOM insertion methods
const originalInsertBefore = HTMLElement.prototype.insertBefore;
HTMLElement.prototype.insertBefore = function <T extends Node>(
  newNode: T,
  referenceNode: Node | null
): T {
  const result = originalInsertBefore.call(this, newNode, referenceNode) as T;

  if (newNode instanceof HTMLCanvasElement && !(newNode as any).__mocked) {
    applyCanvasMocking(newNode);
  }

  return result;
};

// Mock device pixel ratio
Object.defineProperty(window, "devicePixelRatio", {
  value: 2,
  writable: true,
  configurable: true,
});

// Mock CanvasRenderingContext2D constructor for instanceof checks
global.CanvasRenderingContext2D = function MockCanvasRenderingContext2D() {
  return createMockCanvasContext2D();
} as any;

// Mock WebGLRenderingContext for instanceof checks
global.WebGLRenderingContext = function MockWebGLRenderingContext() {
  return createMockWebGLContext();
} as any;

// Mock WebGL2RenderingContext for instanceof checks
global.WebGL2RenderingContext = function MockWebGL2RenderingContext() {
  return {
    ...createMockWebGLContext(),
    texImage3D: vi.fn(),
    texSubImage3D: vi.fn(),
  };
} as any;

// Enhanced MutationObserver mock with proper methods
global.MutationObserver = class MockMutationObserver {
  private callback: MutationCallback;

  constructor(callback: MutationCallback) {
    this.callback = callback;
  }

  observe = vi.fn((target: Node, options?: MutationObserverInit) => {
    // Mock observe behavior
  });

  disconnect = vi.fn(() => {
    // Mock disconnect behavior
  });

  takeRecords = vi.fn(() => [] as MutationRecord[]);
};

// Mock console methods to reduce test noise
global.console = {
  ...console,
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock window.gtag for analytics
Object.defineProperty(window, "gtag", {
  value: vi.fn(),
  writable: true,
  configurable: true,
});

// Enhanced ResizeObserver mock
global.ResizeObserver = class MockResizeObserver {
  observe = vi.fn((target: Element, options?: ResizeObserverOptions) => {
    // Mock observe behavior
  });

  unobserve = vi.fn((target: Element) => {
    // Mock unobserve behavior
  });

  disconnect = vi.fn(() => {
    // Mock disconnect behavior
  });
};

// Additional safety: Watch for canvas elements via MutationObserver
const canvasObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node instanceof HTMLCanvasElement && !(node as any).__mocked) {
        applyCanvasMocking(node);
      }
    });
  });
});

// Start observing immediately
if (typeof document !== "undefined") {
  canvasObserver.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
}

// Enhanced IntersectionObserver mock
global.IntersectionObserver = class MockIntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    // Store options if needed
  }

  observe = vi.fn((target: Element) => {
    // Mock observe behavior
  });

  unobserve = vi.fn((target: Element) => {
    // Mock unobserve behavior
  });

  disconnect = vi.fn(() => {
    // Mock disconnect behavior
  });

  takeRecords = vi.fn(() => [] as IntersectionObserverEntry[]);
} as any;

// Mock requestAnimationFrame and cancelAnimationFrame
global.requestAnimationFrame = vi.fn((cb) => {
  setTimeout(cb, 16);
  return 1;
});
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id as any));

// Enhanced cleanup function to run after each test to prevent memory leaks
afterEach(() => {
  // Clean up React components first (most important for test isolation)
  cleanup();

  // Clear all timers
  vi.clearAllTimers();

  // Clear all mocks
  vi.clearAllMocks();

  // Clear DOM to prevent test pollution (backup cleanup)
  document.body.innerHTML = "";
  document.head.innerHTML = "";

  // Reset location to prevent navigation state pollution
  if (window.location) {
    Object.assign(window.location, {
      href: "http://localhost:3000",
      pathname: "/",
      search: "",
      hash: "",
    });
  }

  // Reset document.title
  document.title = "";

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }
});
