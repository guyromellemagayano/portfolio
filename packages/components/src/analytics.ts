import { logger } from "@portfolio/logger";

import type { AnalyticsEvent } from "./types";

export type AnalyticsTransport = (
  events: AnalyticsEvent[]
) => Promise<void> | void;

export interface AnalyticsBatchOptions {
  transport: AnalyticsTransport;
  bufferSize?: number; // default 20
  flushIntervalMs?: number; // default 2000ms
  flushOnVisibilityChange?: boolean; // default true (browser only)
}

export interface BatchedAnalytics {
  onAnalytics: (event: AnalyticsEvent) => void;
  flush: () => Promise<void>;
  destroy: () => void;
}

export function createBatchedOnAnalytics(
  options: AnalyticsBatchOptions
): BatchedAnalytics {
  const buffer: AnalyticsEvent[] = [];
  const bufferSize = options.bufferSize ?? 20;
  const interval = options.flushIntervalMs ?? 2000;
  const enableVis = options.flushOnVisibilityChange ?? true;

  let timer: ReturnType<typeof setTimeout> | null = null;
  let destroyed = false;

  const flush = async () => {
    if (destroyed) return;
    if (buffer.length === 0) return;
    const batch = buffer.splice(0, buffer.length);
    try {
      await options.transport(batch);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        logger.error("analytics:transport_error", { error: String(err) });
      }
    }
  };

  const schedule = () => {
    if (timer) return;
    timer = setTimeout(async () => {
      timer = null;
      await flush();
    }, interval);
  };

  const onAnalytics = (event: AnalyticsEvent) => {
    if (destroyed) return;
    buffer.push(event);
    if (buffer.length >= bufferSize) {
      void flush();
      return;
    }
    schedule();
  };

  const visHandler = async () => {
    try {
      if (document.visibilityState === "hidden") {
        await flush();
      }
    } catch {
      // noop
    }
  };

  if (typeof document !== "undefined" && enableVis) {
    document.addEventListener("visibilitychange", visHandler);
  }

  const destroy = () => {
    destroyed = true;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    if (typeof document !== "undefined" && enableVis) {
      document.removeEventListener("visibilitychange", visHandler);
    }
  };

  return { onAnalytics, flush, destroy };
}

export interface FetchTransportInit {
  headers?: Record<string, string>;
  method?: string; // default POST
  useBeacon?: boolean; // try navigator.sendBeacon when available
}

export function createFetchTransport(
  url: string,
  init: FetchTransportInit = {}
): AnalyticsTransport {
  const headers = init.headers ?? { "content-type": "application/json" };
  const method = init.method ?? "POST";
  const useBeacon = init.useBeacon ?? false;
  return (events: AnalyticsEvent[]) => {
    const body = JSON.stringify({ events });
    if (
      useBeacon &&
      typeof navigator !== "undefined" &&
      typeof navigator.sendBeacon === "function"
    ) {
      try {
        const blob = new Blob([body], {
          type: headers["content-type"] || "application/json",
        });
        navigator.sendBeacon(url, blob);
        return;
      } catch {
        // fallback to fetch
      }
    }
    if (typeof fetch === "function") {
      return fetch(url, { method, headers, body }).then(() => {});
    }
  };
}

export function createConsoleTransport(): AnalyticsTransport {
  return (events: AnalyticsEvent[]) => {
    logger.info("analytics:events", { count: events.length, events });
  };
}
