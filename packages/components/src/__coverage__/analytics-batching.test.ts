import { describe, expect, it, vi } from "vitest";

import {
  createBatchedOnAnalytics,
  createConsoleTransport,
  createFetchTransport,
} from "../analytics";

describe("analytics batching helpers", () => {
  it("buffers and flushes by bufferSize", async () => {
    const transport = vi.fn();
    const { onAnalytics, flush, destroy } = createBatchedOnAnalytics({
      transport,
      bufferSize: 3,
      flushIntervalMs: 60_000,
      flushOnVisibilityChange: false,
    });
    onAnalytics({
      type: "click",
      component: "Button",
      as: "button",
      timestamp: Date.now(),
    });
    onAnalytics({
      type: "focus",
      component: "Input",
      as: "input",
      timestamp: Date.now(),
    });
    expect(transport).not.toHaveBeenCalled();
    onAnalytics({
      type: "submit",
      component: "Form",
      as: "form",
      timestamp: Date.now(),
    });
    // bufferSize reached triggers flush
    // allow microtask
    await Promise.resolve();
    expect(transport).toHaveBeenCalledTimes(1);
    const batch = transport.mock.calls[0][0];
    expect(batch.length).toBe(3);
    destroy();
    await flush();
  });

  it("periodically flushes by interval", async () => {
    vi.useFakeTimers();
    const transport = vi.fn();
    const { onAnalytics, flush, destroy } = createBatchedOnAnalytics({
      transport,
      bufferSize: 100,
      flushIntervalMs: 1000,
      flushOnVisibilityChange: false,
    });
    onAnalytics({
      type: "click",
      component: "A",
      as: "a",
      timestamp: Date.now(),
    });
    vi.advanceTimersByTime(1000);
    // allow any queued tasks
    await Promise.resolve();
    expect(transport).toHaveBeenCalledTimes(1);
    destroy();
    await flush();
    vi.useRealTimers();
  });

  it("exposes fetch and console transports", () => {
    const consoleTransport = createConsoleTransport();
    expect(typeof consoleTransport).toBe("function");
    const fetchTransport = createFetchTransport("/analytics");
    expect(typeof fetchTransport).toBe("function");
  });
});
