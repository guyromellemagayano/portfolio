import {
  getSentryBaseRuntimeOptions as getLoggerSentryBaseRuntimeOptions,
  getSentryReplayRuntimeOptions as getLoggerSentryReplayRuntimeOptions,
} from "@portfolio/logger";

export const SENTRY_APP_TAGS = {
  "app.framework": "astro",
  "app.name": "portfolio-web",
  "hosting.platform": "vercel",
};

export function getSentryBaseRuntimeOptions() {
  return getLoggerSentryBaseRuntimeOptions({
    dsn: import.meta.env.PUBLIC_SENTRY_DSN,
    environment: import.meta.env.PUBLIC_VERCEL_ENV,
    release: import.meta.env.PUBLIC_SENTRY_RELEASE,
    tags: SENTRY_APP_TAGS,
    tracesSampleRate: import.meta.env.PUBLIC_SENTRY_TRACES_SAMPLE_RATE,
  });
}

export function getSentryReplayRuntimeOptions() {
  return getLoggerSentryReplayRuntimeOptions({
    replaysOnErrorSampleRate: import.meta.env
      .PUBLIC_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE,
    replaysSessionSampleRate: import.meta.env
      .PUBLIC_SENTRY_REPLAYS_SESSION_SAMPLE_RATE,
  });
}
